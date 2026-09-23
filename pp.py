import re

# ============================================================ AirportField
p = 'src/components/booking/AirportField.tsx'
s = open(p).read()

s = s.replace(
    "import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';",
    "import { useCallback, useId, useMemo, useRef, useState } from 'react';")
s = s.replace(
    "import { AIRPORT_COUNT, searchAirports, type AirportOption } from '@/lib/airport-search';",
    "import { AIRPORT_COUNT, searchAirports, type AirportOption } from '@/lib/airport-search';\n"
    "import { popoverSide, usePopover } from '@/lib/use-popover';")

# Constants now live in the shared hook.
s = re.sub(
    r"/\*\* Height of the list when there is room for it: about six suggestions\. \*/\n"
    r"const PREFERRED_HEIGHT = 288;\n.*?const EDGE_GAP = 16;\n\n",
    "/** Height of the list when there is room for it: about six suggestions. */\n"
    "const PREFERRED_HEIGHT = 288;\n\n",
    s, count=1, flags=re.S)

# Replace the hand-rolled placement state + layout effect with the hook.
start = s.index("  const [placement, setPlacement] = useState")
end_marker = "  }, [open]);"
end = s.index(end_marker, start) + len(end_marker)
s = s[:start] + """  const close = useCallback(() => setOpen(false), []);
  // Flip-when-cramped and close-on-outside-pointer, shared with the date and
  // time pickers so all three behave identically.
  const placement = usePopover({
    open,
    onClose: close,
    anchor: input,
    container: wrapper,
    preferredHeight: PREFERRED_HEIGHT,
  });""" + s[end:]

# The separate outside-click effect is now inside the hook.
s = re.sub(
    r"\n  // Close on a click anywhere else\..*?\n  \}, \[open\]\);\n",
    "\n", s, count=1, flags=re.S)

s = s.replace("placement.up ? 'bottom-full mb-2' : 'top-full mt-2'", "popoverSide(placement)")
open(p, 'w').write(s)
assert 'useLayoutEffect' not in s and 'setPlacement' not in s and 'usePopover(' in s
print('airport ok')

# ======================================================== QuickCharterForm
p = 'src/components/booking/QuickCharterForm.tsx'
s = open(p).read()
s = s.replace("import { ArrowRight, CalendarDays, Clock } from 'lucide-react';",
              "import { ArrowRight } from 'lucide-react';")
s = s.replace("import { PassengerField } from './PassengerField';",
              "import { PassengerField } from './PassengerField';\n"
              "import { DateField } from './DateField';\n"
              "import { TimeField } from './TimeField';")
s = s.replace("""  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);""",
"""  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState<string | undefined>(undefined);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // The date is a button plus a hidden input now, and hidden inputs take no
    // part in native validation — so the one required check the browser used
    // to do is done here, with a message next to the field instead of a
    // browser bubble.
    if (!date) {
      setDateError('Choose a departure date.');
      document.getElementById('date')?.focus();
      return;
    }
    setSubmitting(true);""")

old_date_time = re.search(
    r"      <div>\n        <label htmlFor=\"date\" className=\{LABEL\}>.*?"
    r"<input id=\"time\" name=\"time\" type=\"time\" className=\{`\$\{FIELD\} numeric`\} />\n"
    r"        </div>\n      </div>\n", s, flags=re.S)
assert old_date_time, 'quick date/time block not found'
s = s.replace(old_date_time.group(0), """      <DateField
        id="date"
        name="date"
        label="Departure"
        error={dateError}
        onChange={(next) => {
          setDate(next);
          if (next) setDateError(undefined);
        }}
      />
      <TimeField id="time" name="time" date={date} />
""")
# LABEL and FIELD constants are no longer used in this file.
s = re.sub(r"const LABEL = .*?;\nconst FIELD =\n  '.*?';\n\n", "", s, count=1, flags=re.S)
open(p, 'w').write(s)
assert 'type="date"' not in s and 'type="time"' not in s
print('quick ok')

# ====================================================== CharterRequestForm
p = 'src/components/booking/CharterRequestForm.tsx'
s = open(p).read()
s = s.replace("import { PassengerField } from './PassengerField';",
              "import { PassengerField } from './PassengerField';\n"
              "import { DateField } from './DateField';\n"
              "import { TimeField } from './TimeField';")

# Prefill: date and time are controlled components now, so they go through
# the same prop-and-key path as the airports.
old = """    // Plain inputs can be written to directly.
    for (const [param, field] of [
      ['date', 'date'],
      ['time', 'time'],
    ] as const) {
      const value = query.get(param);
      if (!value) continue;
      const input = form.elements.namedItem(field);
      if (input instanceof HTMLInputElement) input.value = value;
    }

"""
assert old in s
s = s.replace(old, "")
s = s.replace("""      passengers: Number.parseInt(query.get('passengers') ?? '', 10) || 2,
    });""", """      passengers: Number.parseInt(query.get('passengers') ?? '', 10) || 2,
      date: query.get('date') ?? '',
      time: query.get('time') ?? '',
    });
    setDeparture(query.get('date') ?? '');""")
s = s.replace(
    "useState<{ from: string; to: string; passengers: number } | null>(null);",
    "useState<{\n    from: string;\n    to: string;\n    passengers: number;\n    date: string;\n    time: string;\n  } | null>(null);\n"
    "  // Tracked so the time list can disable slots already gone today, and so\n"
    "  // the return date cannot be set before the departure.\n"
    "  const [departure, setDeparture] = useState('');")

# Departure date field.
m = re.search(r"          <div>\n            <label htmlFor=\"date\" className=\{LABEL\}>.*?"
              r"<FieldError id=\"err-date\" message=\{errors\.departureDate\} />\n          </div>\n", s, flags=re.S)
assert m, 'request date block'
s = s.replace(m.group(0), """          <DateField
            key={`date-${prefill?.date ?? ''}`}
            id="date"
            name="date"
            label="Departure date"
            tone="light"
            defaultValue={prefill?.date ?? ''}
            error={errors.departureDate}
            onChange={setDeparture}
          />
""")

# Departure time field.
m = re.search(r"          <div>\n            <label htmlFor=\"time\" className=\{LABEL\}>.*?"
              r"<FieldError id=\"err-time\" message=\{errors\.departureTime\} />\n          </div>\n", s, flags=re.S)
assert m, 'request time block'
s = s.replace(m.group(0), """          <TimeField
            key={`time-${prefill?.time ?? ''}`}
            id="time"
            name="time"
            label="Departure time (optional)"
            tone="light"
            defaultValue={prefill?.time ?? ''}
            date={departure}
            error={errors.departureTime}
          />
""")

# Return date field.
m = re.search(r"            <label htmlFor=\"returnDate\" className=\{LABEL\}>.*?"
              r"<FieldError id=\"err-return\" message=\{errors\.returnDate\} />\n", s, flags=re.S)
assert m, 'return date block'
s = s.replace(m.group(0), """            <DateField
              id="returnDate"
              name="returnDate"
              label="Return date"
              placeholder="No return"
              tone="light"
              {...(departure ? { min: departure } : {})}
              error={errors.returnDate}
            />
""")
open(p, 'w').write(s)
assert 'type="date"' not in s and 'type="time"' not in s
print('request ok')
