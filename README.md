# Jan Fiala — Portfolio

Osobní portfolio v **A24 filmovém editorial stylu** — bílé plátno bez karet,
gigantická typografie (Archivo s expanded labely), editorial stack projektů
s titulky pod obrazy, cyklující hero a case study sheet s morphing přechodem.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack) + **React 19**
- **Tailwind CSS v4** — design tokeny v `src/app/globals.css` (`@theme`)
- **Archivo** (variable, `wdth` osa) přes `next/font` — display i text;
  verzálkové labely přes `[font-stretch:115%]`
- **Motion** (Framer Motion) — sdílené layoutId morphy, crossfady
- **cmdk** — command palette (`⌘K` / `Ctrl+K` / `~`)
- **lucide-react**, **clsx** + **tailwind-merge**

## Spuštění

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkční build (staticky prerotovaný)
npm run lint
```

## Struktura

```
src/
├─ app/
│  ├─ [lang]/                 # i18n root: /cs a /en (statické mutace)
│  │  ├─ layout.tsx           # <html lang> + metadata + providery
│  │  └─ page.tsx             # skládanka sekcí
│  ├─ globals.css             # tokeny, ix-* hover systém, keyframes
│  └─ icon.svg
├─ components/
│  ├─ Container.tsx           # editorial kontejner (max-w + gutters)
│  ├─ Eyebrow.tsx             # verzálkový expanded label (A24 eyebrow)
│  ├─ Header.tsx              # fixed overlay lišta (transparent → bílá) + CS/EN + ⌘K
│  ├─ Hero.tsx                # full-screen cover (h-svh) + bílé cyklující titulky
│  ├─ TelemetryStrip.tsx      # dev telemetry (GitHub API + Prague clock)
│  ├─ WorksStack.tsx          # editorial stack: featured 16:9 + 3× 4:3
│  ├─ ServicesList.tsx        # číslovaný editorial index služeb
│  ├─ TechStack.tsx           # tech stack jako A24 poster typografie
│  ├─ Background.tsx          # vzdělání (VŠE) + praxe, dvousloupcově
│  ├─ Contact.tsx             # obří display statement + footer
│  ├─ CommandDrawer.tsx       # konzole: akce, navigace, odkazy
│  └─ ProjectSheet.tsx        # case study sheet: morph, chain, history
└─ lib/
   ├─ content/                # i18n: types.ts, cs.ts, en.ts, index.ts
   ├─ data.ts                 # locale-agnostické konstanty (e-mail, GitHub, covery, odkazy)
   ├─ hooks/useGitHubStats.ts # GitHub API + cache per locale + refresh event
   └─ fonts.ts, utils.ts, clipboard.ts, sound.ts
```

## Unified interakční systém

Veškeré hover efekty jdou přes centrální sadu utilit v `globals.css`
(definované přes `@utility`, aby správně žily v utilities vrstvě):

| Utility | Kde | Efekt |
|---|---|---|
| `ix-text` | texty, titulky, odkazy | zešednutí na `#6E6E73`, 300 ms |
| `ix-text-light` | bílé texty nad coverem (hero) | ztlumení na white/70, 300 ms |
| `ix-invert` | tlumené utility (Konzole, X) | ztmavnutí na ink, 300 ms |
| `ix-invert-light` | tlumené bílé utility nad coverem | zbělení na `#fff`, 300 ms |
| `ix-dim` | plné černé buttony | opacity 0.85, 250 ms |
| `ix-image` | všechny cover arty | `scale(1.02)`, 300 ms (`scale` property — nekoliduje s Motion transformem) |
| `ix-zoom` | hover zóna (hero, dlaždice) | ztlumí text (šedý/zbělý) + zoomne obrázek při hoveru kamkoliv v zóně |

## Motion (A24 hodnoty)

- Hero: full-screen (`h-svh`) — cover pod tmavým veilem (10 %), progresivním
  blurem (6 px pod navem, 10 px pod titulkem, maskované stripy) a gradienty;
  bílý titulek; cyklus 4 s, crossfade `opacity 200 ms ease-in-out`, pauza na
  hover, zastaví se při otevřeném sheetu; reduced motion → staticky
- Header: fixed overlay — přes hero průhledný s bílým textem, za hero bílá
  lišta s ink textem (A24 hodnoty: bg 150 ms linear, transform 200 ms
  ease-in-out); skrol dolů schová, skrol nahoru vrátí; schovaný je `inert`
- Case study sheet: sdílený `layoutId` morph (z hero coveru i dlaždice),
  řetězení „Další“, Esc/X/back zavírá, body scroll lock
- Lightbox galerie: klik na obrázek v case study → zvětšení; ←/→ listuje,
  Esc/klik mimo zavírá (Esc nejdřív lightbox, pak sheet), fokus na tlačítko
  zavřít, reduced motion → bez animace
- Žádné scroll reveal animace — klidný editorial

## Kde co upravit

- **Obsah & case studies** — `src/lib/data.ts` (`works[]`, `education`,
  `experience`, `services`, `socials`, `stackFocus`).
- **CV** — hoď soubor do `public/cv.pdf`; tlačítko i command palette už na něj
  odkazují (`cvHref` v `data.ts`).
- **Fotky projektů** — soubory v `public/works/<id>/` (`cover.webp` + `01.webp`…);
  cesty se registrují v `worksMeta.image` a `workGalleries` (`src/lib/data.ts`).
  Gradienty zůstávají jako fallback při načítání; servíruje `next/image`
  (q85 — allowlist kvalit v `next.config.ts`). Klik na galerijní obrázek
  v case study otevře lightbox.
- **GitHub telemetry** — handle v `site.github`; cache 10 min v localStorage,
  při výpadku API se zobrazí „—“ + fallback text.
- **Jazyk** — veškeré texty v `src/lib/content/cs.ts` a `en.ts` (stejný typ `Content`).
- **Konzole** — nový příkaz = nový `ConsoleItem` v `CommandDrawer.tsx` + texty v obou slovnících.

## Jazyky & konzole

- `/` → 307 redirect na `/cs`; plné mutace na `/cs` a `/en` (statické, `hreflang`)
- Konzole (⌘K / `~`): **Akce** (kopírovat e-mail, stáhnout CV, přepnout jazyk,
  obnovit GitHub telemetrii, zvuk), **Navigace** (projekty, stack, background,
  kontakt) a **Odkazy** (GitHub, LinkedIn) — vše lokalizované.

## Performance poznámky

- Hover jen `transform`/`opacity`; jediný scroll listener (header) — passive,
  rAF-throttled, jen čte.
- `backdrop-blur`: sticky sheet lišta, palette overlay a progresivní blur
  v hero (maskované stripy nad/pod textem).
- Hodiny s milisekundami píšou přímo do DOM (žádné re-rendery).
