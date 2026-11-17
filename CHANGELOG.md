# Changelog

Notable changes to BetterCatarman.org. The site is updated continuously rather than released in versions, so changes are grouped by date, newest first. Corrections to individual facts aren't all listed here; see the [commit history](https://github.com/jpdevdotcom/better-catarman-northsamar/commits/main) for every change.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

### Added

- A full set of site icons: PNG and ICO favicons that Google Search can show in results, a home-screen icon for iPhone, and a web app manifest so the site can be added to a phone's home screen with its own name and icon.

## 16 November 2026

### Added

- A security policy ([SECURITY.md](SECURITY.md)) and a [`security.txt`](https://bettercatarman.org/.well-known/security.txt) file, with private reporting by email or through GitHub.
- A pull request template with a checklist based on the contributing guide.
- Issue forms for corrections, translations, bug reports and suggestions. Blank issues are turned off, and the issue page links to the site's correction form, the security policy and the official municipal website.

### Changed

- Correction reports from the site now go to `report@bettercatarman.org`.

## 15 November 2026

The site went live at [bettercatarman.org](https://bettercatarman.org).

### Added

- Clearer page titles and descriptions, canonical links, link previews and structured data for search engines.
- `sitemap.xml`, built from the pages the site actually generates, and `robots.txt`.
- Google Analytics, which loads only after a visitor taps **Accept**. The privacy notice explains it, and visitors can change their choice at any time.
- A README, the MIT License, contributing guidelines and a code of conduct.

### Fixed

- The sitemap step failing on Cloudflare Pages, which puts the built site in a different folder.

## 14 November 2026

### Added

- Filipino and Waray translations, with a language menu. The Waray text is a first draft awaiting review by a native speaker.
- An **Advisories** page with the weather forecast, PAGASA wind signals, typhoon guidance and notices.
- A page for reporting corrections.
- Official NAMRIA and PSA barangay boundaries on the maps.
- A directory of schools and health facilities, from OpenStreetMap.
- Site-wide search.
- Charts of income, expenses, assets and liabilities on the **Transparency** page.
- A privacy notice and terms of use.
- Share buttons and printable QR posters for services and barangays.

### Changed

- The name now shows "Northern Samar" under BetterCatarman.org.
- The home page title and description.

### Fixed

- The hotline bar and language menu now fit on phones.
- The QR poster, search and report pages now work on a static host.
- An empty grey cell in the Advisories checklist.

## 11 November 2026

The first version of the site.

### Added

- Service pages with official requirement checklists from catarman.gov.ph, and general guidance where no checklist is published.
- Profiles of all 55 barangays, with population, maps and barangay officials from the DILG directory.
- A government directory with the Mayor, Vice Mayor, Sangguniang Bayan members and department heads.
- Verified emergency hotlines for police, fire, hospital, MDRRMO and PDRRMO, also shown in the top bar.
- A **Transparency** page with municipal finances for 2011 to 2025 from Commission on Audit reports, and the 2025 audit observations with the municipal government's responses.
- A link to the Northern Samar 2027 budget projects portal.
- An **About the Data** page listing every source and how information is chosen.
