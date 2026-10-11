"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

type GitHubStats = {
  lastPush: string;
  publicRepos: number;
  topLanguage: string;
};

type GitHubUser = { public_repos?: number };
type GitHubRepo = { language: string | null; pushed_at: string | null };
type GitHubEvent = { type: string; created_at: string };

const CACHE_TTL_MS = 10 * 60 * 1000;

/** Dispatched by the console to force a telemetry refresh. */
export const GITHUB_REFRESH_EVENT = "jf:refresh-github";

function relativeTime(date: Date, locale: Locale): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const diffMs = date.getTime() - Date.now();
  const minutes = Math.round(diffMs / 60_000);
  const hours = Math.round(diffMs / 3_600_000);
  const days = Math.round(diffMs / 86_400_000);

  if (Math.abs(days) >= 7) {
    const weeks = Math.round(days / 7);
    if (Math.abs(weeks) >= 5) return rtf.format(Math.round(days / 30), "month");
    return rtf.format(weeks, "week");
  }
  if (Math.abs(days) >= 1) return rtf.format(days, "day");
  if (Math.abs(hours) >= 1) return rtf.format(hours, "hour");
  if (Math.abs(minutes) >= 1) return rtf.format(minutes, "minute");
  return rtf.format(Math.round(diffMs / 1000), "second");
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}`);
  return response.json() as Promise<T>;
}

/**
 * Real GitHub telemetry (last push, public repos, top language).
 * Cached in localStorage for 10 minutes to stay well inside the
 * unauthenticated rate limit; callers show a graceful fallback on failure.
 * Listening for GITHUB_REFRESH_EVENT clears the cache and refetches.
 */
export function useGitHubStats(username: string, locale: Locale) {
  const cacheKey = `jf.github-stats:${locale}`;
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [failed, setFailed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // console command: drop the cache and refetch
  useEffect(() => {
    const onRefresh = () => {
      try {
        window.localStorage.removeItem(cacheKey);
      } catch {
        // ignore storage errors
      }
      setFailed(false);
      setRefreshKey((key) => key + 1);
    };
    window.addEventListener(GITHUB_REFRESH_EVENT, onRefresh);
    return () => window.removeEventListener(GITHUB_REFRESH_EVENT, onRefresh);
  }, [cacheKey]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // serve a fresh cache instantly (kept inside the async task so no
      // synchronous setState happens in the effect body)
      try {
        const cached = JSON.parse(
          window.localStorage.getItem(cacheKey) ?? "null",
        ) as { at: number; stats: GitHubStats } | null;
        if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
          if (!cancelled) setStats(cached.stats);
          return;
        }
      } catch {
        // ignore malformed cache
      }

      try {
        const [user, repos, events] = await Promise.all([
          fetchJson<GitHubUser>(`https://api.github.com/users/${username}`),
          fetchJson<GitHubRepo[]>(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
          ),
          fetchJson<GitHubEvent[]>(
            `https://api.github.com/users/${username}/events/public?per_page=30`,
          ),
        ]);
        if (cancelled) return;

        const lastPushEvent = events.find((event) => event.type === "PushEvent");
        const lastPushDate = lastPushEvent
          ? new Date(lastPushEvent.created_at)
          : new Date(
              Math.max(
                ...repos.map((repo) =>
                  repo.pushed_at ? +new Date(repo.pushed_at) : 0,
                ),
              ),
            );

        const languageCounts: Record<string, number> = {};
        for (const repo of repos) {
          if (repo.language) {
            languageCounts[repo.language] =
              (languageCounts[repo.language] ?? 0) + 1;
          }
        }
        const topLanguage =
          Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
          "TypeScript";

        const nextStats: GitHubStats = {
          lastPush: relativeTime(lastPushDate, locale),
          publicRepos: user.public_repos ?? repos.length,
          topLanguage,
        };

        setStats(nextStats);
        window.localStorage.setItem(
          cacheKey,
          JSON.stringify({ at: Date.now(), stats: nextStats }),
        );
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [username, locale, cacheKey, refreshKey]);

  return { stats, failed };
}
