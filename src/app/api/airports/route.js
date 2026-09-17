import { readFile } from 'node:fs/promises';
import path from 'node:path';
import * as XLSX from 'xlsx';

function parseAirportWorkbook(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' }).slice(1);
  return rows
    .filter((row) => row[1] && row[2])
    .map(([state, city, name, code, icao, type], index) => ({
      id: `${code || icao || name}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      city,
      name,
      code,
      icao,
      type,
    }));
}

export async function GET() {
  const sourcePath = path.join(process.cwd(), 'public', 'list of airport', 'India_Airports_List.xlsx');
  const workbook = XLSX.read(await readFile(sourcePath), { type: 'buffer' });
  return Response.json(parseAirportWorkbook(workbook), {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}
