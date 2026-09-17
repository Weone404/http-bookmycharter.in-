'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';

const MAX_RESULTS = 8;

function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    let diagonal = previous[0];
    previous[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      const above = previous[column];
      previous[column] = left[row - 1] === right[column - 1]
        ? diagonal
        : Math.min(diagonal, above, previous[column - 1]) + 1;
      diagonal = above;
    }
  }
  return previous[right.length];
}

function matchesLocation(location, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const searchable = normalize(`${location.name} ${location.city} ${location.code} ${location.icao}`);
  return terms.every((term) => searchable.includes(term)
    || searchable.split(/\s+/).some((word) => term.length > 2 && editDistance(term, word) <= 1));
}

function HighlightedText({ value, query }) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return value;
  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
  return value.split(pattern).map((part, index) => (
    terms.includes(normalize(part))
      ? <mark key={`${part}-${index}`} className="bg-[#c8102e]/30 text-white">{part}</mark>
      : part
  ));
}

export default function AirportAutocomplete({ value, onChange, onSelect }) {
  const [airports, setAirports] = useState([]);
  const [query, setQuery] = useState(value || '');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [expandedCity, setExpandedCity] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetch('/api/airports')
      .then((response) => {
        if (!response.ok) throw new Error(`Airport search failed with ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (active) setAirports(data);
      })
      .catch((error) => {
        console.error('Unable to load airport search data.', error);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 180);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const results = useMemo(
    () => airports.filter((airport) => matchesLocation(airport, debouncedQuery)).slice(0, MAX_RESULTS),
    [airports, debouncedQuery],
  );
  const cityResults = useMemo(() => {
    if (!expandedCity) return [];
    return airports.filter((airport) => normalize(airport.city) === normalize(expandedCity));
  }, [airports, expandedCity]);

  const selectAirport = (airport) => {
    const label = `${airport.city} — ${airport.name}${airport.code ? ` (${airport.code})` : ''}`;
    setQuery(label);
    setOpen(false);
    setExpandedCity('');
    onChange(label);
    onSelect(airport);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setExpandedCity('');
            setOpen(true);
            onChange(event.target.value);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
          placeholder="Search for an airport or city..."
          className="w-full bg-[#181818] border border-white/15 py-3 pl-10 pr-9 text-xs text-white focus:border-[#c8102e] focus:outline-none"
          aria-label="Departure Base / Helipad"
          autoComplete="off"
        />
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      </div>

      {open && debouncedQuery && (
        <div className="absolute z-30 mt-1 max-h-80 w-full overflow-y-auto border border-white/15 bg-[#181818] shadow-2xl" role="listbox">
          {results.length > 0 ? results.map((airport) => (
            <div key={airport.id} className="border-b border-white/10 last:border-0">
              <button type="button" onClick={() => selectAirport(airport)} className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-white/10">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8102e]" />
                <span className="min-w-0 text-xs text-white">
                  <strong className="block font-semibold"><HighlightedText value={airport.name} query={debouncedQuery} /></strong>
                  <span className="text-neutral-400"><HighlightedText value={airport.city} query={debouncedQuery} />{airport.code && ` • ${airport.code}`}</span>
                </span>
              </button>
              {normalize(airport.city).includes(normalize(debouncedQuery)) && (
                <button type="button" onClick={() => setExpandedCity(airport.city)} className="ml-10 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#c8102e] hover:text-white">
                  Show all {airport.city} airports
                </button>
              )}
            </div>
          )) : (
            <div className="px-3 py-4 text-xs text-neutral-400">
              <p>No results found.</p>
              <button type="button" onClick={() => { setOpen(false); onSelect(null); }} className="mt-2 font-bold uppercase tracking-wider text-[#c8102e] hover:text-white">
                Use this custom location
              </button>
            </div>
          )}
          {expandedCity && cityResults.length > 0 && (
            <div className="border-t border-[#c8102e]/40 bg-[#121212] p-2">
              <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c8102e]">{expandedCity} locations</p>
              {cityResults.map((airport) => (
                <button key={airport.id} type="button" onClick={() => selectAirport(airport)} className="block w-full px-2 py-2 text-left text-xs text-white hover:bg-white/10">
                  {airport.name} {airport.code && <span className="text-neutral-400">({airport.code})</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
