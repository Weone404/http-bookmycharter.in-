# Area data sources

`npm run areas` (scripts/build-areas.mjs) rebuilds `src/data/areas/*.json` and
`public/area-search/**` from two files that are not committed because of their size:

1. `india-post-pincodes.csv`: India Post, All India Pincode Directory, from
   data.gov.in (Government Open Data Licence - India). Columns used: OfficeName,
   Pincode, District, StateName, Latitude, Longitude. A mirror of the same file:
   https://raw.githubusercontent.com/dropdevrahul/pincodes-india/main/pincode.csv
2. `pincode-list-legacy.txt`: the older "All India Pin Code List" PDF converted with
   `pdftotext -layout`. Adds locality names only to pincodes the directory already has.

Without the CSV the script exits and the committed JSON is kept.
