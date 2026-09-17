import fs from 'node:fs';
import path from 'node:path';
import { AIRCRAFT, FLEET_DETAILS } from '../data/fleet';

export const FLEET_IMAGE_CATEGORIES = [
  { id: 'helicopters', label: 'Helicopters', folder: 'Helicopters' },
  { id: 'turboprop', label: 'Turboprop', folder: 'Turboprop' },
  { id: 'business-jets', label: 'Business Jets', folder: 'Business Jets' },
  { id: 'airliner', label: 'Airliner', folder: 'Airliner' },
];

function titleCaseFilename(filename) {
  return filename
    .replace(/\.webp$/i, '')
    .replace(/_converted$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function readSpecificationSheet() {
  const sheetPath = path.join(process.cwd(), 'fleet-details.md');
  const markdown = fs.readFileSync(sheetPath, 'utf8');
  const entries = new Map();
  let current = null;

  markdown.split(/\r?\n/).forEach((line) => {
    const heading = line.match(/^###\s+\d+\.\s+(.+)$/);
    if (heading) {
      current = { name: heading[1].trim() };
      return;
    }

    const field = line.match(/^\*\*(Description|Seats|Luggage|Range|Speed|Pilots|Flight Attendant)\*\*:\s*(.+?)\s*$/);
    if (field && current) {
      const [, label, value] = field;
      const key = {
        Description: 'description',
        Seats: 'seats',
        Luggage: 'baggage',
        Range: 'range',
        Speed: 'cruiseSpeed',
        Pilots: 'pilots',
        'Flight Attendant': 'flightAttendant',
      }[label];
      current[key] = value;
      if (label === 'Description') current.tagline = value;
      return;
    }

    if (line.trim() === '' && current?.description) {
      entries.set(normalizeName(current.name), { ...current, name: undefined });
      current = null;
    }
  });

  if (current?.description) {
    entries.set(normalizeName(current.name), { ...current, name: undefined });
  }

  return entries;
}

function findSpecification(specificationSheet, name) {
  const key = normalizeName(name);
  const exact = specificationSheet.get(key);
  if (exact) return exact;

  if (key === 'hs135') {
    return specificationSheet.get('hs135airbush135');
  }

  for (const [specificationName, details] of specificationSheet) {
    if (specificationName.includes(key) || key.includes(specificationName)) {
      return details;
    }
  }

  return null;
}

function detailsToFields(details) {
  const fields = {};
  details?.specifications?.forEach(([label, value]) => {
    const key = label.toLowerCase();
    if (key.includes('passenger')) fields.seats = value;
    if (key.includes('cruise')) fields.cruiseSpeed = value;
    if (key === 'range') fields.range = value;
    if (key.includes('engine')) fields.engines = value;
    if (key.includes('cabin height') || key.includes('cabin length')) {
      fields.cabinDimensions = fields.cabinDimensions
        ? `${fields.cabinDimensions}; ${label}: ${value}`
        : `${label}: ${value}`;
    }
    if (key.includes('baggage')) fields.baggage = value;
    if (key.includes('altitude')) fields.ceiling = value;
  });
  return fields;
}

export function getFleetImageCategories() {
  const dataRoot = path.join(process.cwd(), 'public', 'icons', 'fleet');
  const specificationSheet = readSpecificationSheet();
  const unmatchedNames = [];

  const categories = FLEET_IMAGE_CATEGORIES.map((category) => {
    const folderPath = path.join(dataRoot, category.folder);
    const filenames = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.webp$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));

    const aircraft = filenames.map((filename) => {
      const name = titleCaseFilename(filename);
      const match = AIRCRAFT.find((item) => normalizeName(item.name) === normalizeName(name));
      const details = match ? FLEET_DETAILS[match.slug] : null;
      const sheetDetails = findSpecification(specificationSheet, name);

      if (!match && !sheetDetails) unmatchedNames.push(name);

      return {
        ...(match || {}),
        ...detailsToFields(details),
        ...sheetDetails,
        name,
        category: category.label,
        image: `/icons/fleet/${encodeURIComponent(category.folder)}/${encodeURIComponent(filename)}`,
        matched: Boolean(match || sheetDetails),
      };
    });

    return { ...category, aircraft };
  });

  if (process.env.NODE_ENV === 'development' && unmatchedNames.length > 0) {
    console.warn('[fleet] Images without fleetData entries:', unmatchedNames);
  }

  return categories;
}
