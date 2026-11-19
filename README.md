# BetterCatarman.org

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fbettercatarman.org&label=bettercatarman.org&up_message=online&up_color=1d4ed8&down_message=offline)](https://bettercatarman.org)
[![Latest release](https://img.shields.io/github/v/release/jpdevdotcom/better-catarman-northsamar?label=release&color=1d4ed8)](https://github.com/jpdevdotcom/better-catarman-northsamar/releases/latest)
[![Deploy status](https://img.shields.io/github/check-runs/jpdevdotcom/better-catarman-northsamar/main?nameFilter=Cloudflare%20Pages&label=deploy)](https://github.com/jpdevdotcom/better-catarman-northsamar/commits/main)
[![Last commit](https://img.shields.io/github/last-commit/jpdevdotcom/better-catarman-northsamar?color=1d4ed8)](https://github.com/jpdevdotcom/better-catarman-northsamar/commits/main)
[![License: MIT](https://img.shields.io/github/license/jpdevdotcom/better-catarman-northsamar?color=1d4ed8)](LICENSE)

[![Nuxt](https://img.shields.io/github/package-json/dependency-version/jpdevdotcom/better-catarman-northsamar/nuxt?logo=nuxt&logoColor=white&color=1d4ed8)](https://nuxt.com)
[![Vue](https://img.shields.io/github/package-json/dependency-version/jpdevdotcom/better-catarman-northsamar/vue?logo=vuedotjs&logoColor=white&color=1d4ed8)](https://vuejs.org)
[![TypeScript](https://img.shields.io/github/package-json/dependency-version/jpdevdotcom/better-catarman-northsamar/dev/typescript?logo=typescript&logoColor=white&color=1d4ed8)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/github/package-json/dependency-version/jpdevdotcom/better-catarman-northsamar/dev/tailwindcss?logo=tailwindcss&logoColor=white&color=1d4ed8)](https://tailwindcss.com)
[![shadcn-vue](https://img.shields.io/badge/ui-shadcn--vue-1d4ed8?logo=shadcnui&logoColor=white)](https://www.shadcn-vue.com)
[![Node.js 22+](https://img.shields.io/badge/node-%E2%89%A522-1d4ed8?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/package%20manager-pnpm-1d4ed8?logo=pnpm&logoColor=white)](https://pnpm.io)
[![Hosted on Cloudflare Pages](https://img.shields.io/badge/hosted%20on-Cloudflare%20Pages-1d4ed8?logo=cloudflarepages&logoColor=white)](https://pages.cloudflare.com)

[![A contribution to BetterGov.ph](https://img.shields.io/badge/contribution%20to-BetterGov.ph-1d4ed8)](https://bettergov.ph)
[![Languages: English, Filipino, Waray](https://img.shields.io/badge/languages-English%20%7C%20Filipino%20%7C%20Waray-1d4ed8)](#whats-on-the-site)
[![Open issues](https://img.shields.io/github/issues/jpdevdotcom/better-catarman-northsamar?color=1d4ed8)](https://github.com/jpdevdotcom/better-catarman-northsamar/issues)
[![Open pull requests](https://img.shields.io/github/issues-pr/jpdevdotcom/better-catarman-northsamar?color=1d4ed8)](https://github.com/jpdevdotcom/better-catarman-northsamar/pulls)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-1d4ed8)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-read-1d4ed8)](CODE_OF_CONDUCT.md)
[![Security policy](https://img.shields.io/badge/security-policy-1d4ed8)](SECURITY.md)

**Catarman, Northern Samar's public information in one place, with sources cited.**

[bettercatarman.org](https://bettercatarman.org) is a volunteer contribution to the BetterGov.ph initiative for better governance. It collects what residents of Catarman most often need to know: what to bring to the municipal hall, who their barangay officials are, who to call in an emergency, and how the town's money is spent. Each fact is linked to where it came from.

> BetterCatarman is run by volunteers. It is **not** an official website and is not affiliated with, or endorsed by, the Municipal Government of Catarman. For official transactions, see [catarman.gov.ph](https://catarman.gov.ph).

## What's on the site

| Page | What it shows |
| --- | --- |
| **Services** | Requirements, fees and steps for certificates, business permits, taxes, social services, IDs and more. Each service is labelled by where its requirements came from. |
| **Barangays** | All 55 barangays, with population, area, officials and a map of the official boundary. |
| **Government** | The Mayor, Vice Mayor, Sangguniang Bayan and the heads of municipal offices, with contact details. |
| **Advisories** | Emergency hotlines, PAGASA wind signals and a weather forecast. |
| **Statistics** | Population, households and census history. |
| **Transparency** | Income, expenses, assets and liabilities from Commission on Audit reports, plus audit observations and the municipality's replies, quoted word for word. |
| **Facilities** | Schools and public health facilities, from OpenStreetMap. |
| **About the Data** | Every source the site uses and what each was used for. |

The site is available in English, Filipino and Waray. The Filipino and Waray translations are partial, and official requirements stay in English, as published. Each page also has a printable QR poster, and a **Report a correction** link.

## How the data is kept honest

- Every figure is linked to a source. The full list is on the [About the Data](https://bettercatarman.org/about) page and in [`app/data/sources.ts`](app/data/sources.ts).
- Anything unverified, or based only on general guidance, is labelled as such.
- Generated data (barangays, boundaries, facilities, officials) is rebuilt from the raw files in [`data-sources/`](data-sources/README.md) by the scripts in [`scripts/`](scripts/), so every number can be traced back.

Found a mistake? Use **Report a correction** on the page, or open an issue. Say what's wrong and where you saw the correct information.

## Built with

- [Nuxt 4](https://nuxt.com) and TypeScript, generated as a static site
- [Tailwind CSS 4](https://tailwindcss.com) and [shadcn-vue](https://www.shadcn-vue.com)
- Hosted on Cloudflare Pages

## Running it locally

You need Node.js 22 or later and [pnpm](https://pnpm.io).

```bash
pnpm install
```

```bash
cp .env.example .env
```

Fill in `.env` (both values are optional):

| Variable | What it's for |
| --- | --- |
| `NUXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps key for the maps on barangay and contact pages |
| `NUXT_PUBLIC_REPORT_EMAIL` | Where **Report a correction** sends reports |
| `NUXT_PUBLIC_REPORT_FORM_URL` | A form (for example a Google Form) to use for reports instead of, or as well as, email |
| `NUXT_PUBLIC_SITE_URL` | The site's public address, used in share links and QR codes |
| `NUXT_PUBLIC_GOOGLE_TAG_ID` | Overrides the Google tag ID. Set it to an empty value to switch analytics off |

Then start the dev server at http://localhost:3000:

```bash
pnpm dev
```

### Building the static site

```bash
pnpm generate
```

This writes the site to `dist/` and creates `sitemap.xml` from the pages that were built.

### Rebuilding the data

The Python scripts regenerate files in `app/data/` from `data-sources/`. Run `build-boundaries.py` first:

```bash
python3 -I scripts/build-boundaries.py
```

```bash
python3 -I scripts/build-barangays.py
```

```bash
python3 -I scripts/build-facilities.py
```

## Privacy

The site has no accounts and no ads. Google Analytics loads only after a visitor taps **Accept**, and they can change that choice any time on the [Privacy](https://bettercatarman.org/privacy#analytics) page.

## Contributing

Corrections, translations (especially a native Waray speaker's review), and new sources are all welcome. Open an issue or a pull request, and include the source for any fact you add or change. See [CONTRIBUTING.md](CONTRIBUTING.md) for the content rules and how to set up the code. New to pull requests? [Your first pull request](FIRST-PULL-REQUEST.md) shows how to clone the project and send a change.

## Credits

Data from the Municipality of Catarman, the Commission on Audit, the Philippine Statistics Authority, DILG, PAGASA, NAMRIA and PSA (via OCHA COD-AB, CC BY-IGO), © OpenStreetMap contributors (ODbL), and Open-Meteo (CC BY 4.0). See the About the Data page for the full list.

## License

The code is released under the [MIT License](LICENSE). The data keeps the licence of its source, listed above and on the About the Data page.
