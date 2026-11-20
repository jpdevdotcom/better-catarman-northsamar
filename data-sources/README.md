# Source data

Raw files the `scripts/` folder turns into `app/data/*.ts`. Kept here so every generated
number can be traced back and rebuilt.

| File | Source | Retrieved | Licence |
| --- | --- | --- | --- |
| `namria-psa-barangays-catarman.json` | Barangay boundaries of Catarman (PSGC 0804805000), medium resolution, from [faeldon/philippines-json-maps](https://github.com/faeldon/philippines-json-maps) (`latest/geojson/municities/medres/bgysubmuns-municity-804805000.0.01.json`), PSGC 3Q 2026 | 14 Nov 2026 | Boundaries by NAMRIA and PSA via OCHA COD-AB, CC BY-IGO |
| `namria-psa-municipalities-northern-samar.json` | Municipal boundaries of Northern Samar, same source (`latest/geojson/provdists/medres/municities-provdist-804800000.0.01.json`) | 14 Nov 2026 | NAMRIA and PSA via OCHA COD-AB, CC BY-IGO |
| `osm-schools-health-catarman.json` | Schools, colleges, hospitals, clinics and health stations inside Catarman, from the OpenStreetMap Overpass API | 14 Nov 2026 | © OpenStreetMap contributors, ODbL |
| `bettergov-budget-2027-catarman.json` | FY2027 projects matching “catarman” in the DPWH, farm-to-market road, health facility and NIA datasets of the [PH Budget Data API](https://budget.bettergov.ph/docs) (`/api/v1/hgab/2027/datasets/{key}/projects?q=catarman`) | 20 Nov 2026 | BetterGov.PH, CC BY 4.0 |
| `dpwh-nep-2027-ns1-deo.json` | DPWH’s 2027 proposed projects for the Northern Samar 1st District Engineering Office, all 83 rows, from the [DPWH Transparency Portal](https://transparency.dpwh.gov.ph/nep) API (`api.transparency.dpwh.gov.ph/nep/projects?page=1&limit=100&region=Region+VIII&office=Northern+Samar+1st+District+Engineering+Office&fiscalYear=2027`). The API only answers browsers, so this is saved by hand from one; amounts are in thousands of pesos | 20 Nov 2026 | Department of Public Works and Highways |
| `bettergov-gaa-2020-2026-catarman.json` | Program lines matching “catarman” in every department of the General Appropriations Acts 2020 to 2026, from the same API (`/api/v1/gaa/departments/{id}/programs?q=catarman`), with the department names | 20 Nov 2026 | BetterGov.PH, CC BY 4.0 |
