# Aircraft photos — incoming

One real photo per aircraft variant, from Wikimedia Commons, under a licence that
allows commercial use. Originals live here and are **not committed** (they are often
5–15 MB each); `npm run photos` turns them into the files the site serves.

## For each row in `credits.csv`

1. Open the `commons_file_url`. Check the photo really is that exact variant
   (XLS vs XLS+, CJ1 vs CJ1+ — the file name alone is not proof).
2. Under **Licensing** on that page, confirm it is one of:
   `CC0`, `Public domain`, `CC BY 2.0/2.5/3.0/4.0`, `CC BY-SA 2.0/2.5/3.0/4.0`,
   or a country port of those such as `CC BY-SA 3.0 AU`.
   Anything marked **NC** (non-commercial), **ND** (no derivatives) or **GFDL only**
   cannot be used — pick another file. Files ending in `AN#######` (Airliners.net)
   are often GFDL only.
   The `notes` column says what to double-check for that row.
3. Click **Download** → **Original file**, and save it in this folder named exactly
   `<slug>.jpg` (or `.png`), e.g. `cessna-citation-xls-plus.jpg`.
4. Fill `author` exactly as Commons credits it (the "Use this file" button shows it)
   and `licence` exactly as written above, then set `status` to `confirmed`.

If the suggested file is wrong or unusable, replace the URL with a better one from the
same Commons category. If no usable photo of that exact variant exists, leave the row
as `todo` — the site shows no photo rather than a sibling variant's.

## Then

    npm run photos

It refuses to write anything if a confirmed row has no file, no author, a licence
outside the list above, or a source under 1000 px wide, and prints exactly which.
