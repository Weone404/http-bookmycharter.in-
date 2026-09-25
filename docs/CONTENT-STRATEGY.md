# Content Strategy

## The rule

Every indexable URL answers a question no other URL on the site answers. Where two pages would say
the same thing, one of them does not exist. The twelve near-identical programmatic pages this
rebuild removed — six of them chasing the same query with the benefit cards reworded — are why this
is enforced rather than assumed.

## What is published, and what is deliberately not

| Cluster | Published | Held back, and why |
|---|---|---|
| Private charter | Hub, private jet charter, aircraft charter | Turboprop, group and international charter — each needs content that does not repeat the hub |
| Helicopter charter | Hub, private helicopter charter, helicopter rental | VVIP, corporate, wedding, aerial services — pending operational specifics |
| Aircraft | Hub with the 3D class carousel and the full compact list, 3 category pages, a page for all 52 types (11 with a written narrative, the rest built from the spec sheet and the type's own description) | Narratives for the other 41 as they are written |
| Services | Hub, corporate charter, aerial flower dropping | Wedding, medical, film, events, logistics — pending B3 (which pillars are live) |
| Pricing | Full methodology, 9 cost components, comparison guide | No figures. E2 unanswered, and an invented "from" price is the practice this rebuild removed |
| Empty legs | Full explainer, honest empty availability state | No inventory. F1 unanswered; fabricated rows would be a false availability claim |
| Destinations | Hub with the sourced airport reference, Delhi, Mumbai | Other cities pending D1/D2. A template with the city swapped is not a page |
| Routes | Hub explaining how a city pair is planned | No route pages: distance and flight time are unverified, and a flight time is a number people plan a day around |
| Chardham | Hub, Kedarnath | Badrinath, Do Dham, travel information pending D4 |
| Insights | 6 articles | More as they are written; each must support a commercial page |

## Search intent, mapped to pages

| Intent | Page |
|---|---|
| private jet charter India, private charter India | `/private-charter/private-jet-charter`, `/private-charter` |
| aircraft charter India, charter flight India | `/private-charter/aircraft-charter` |
| helicopter charter India, helicopter booking India | `/helicopter-charter` |
| private helicopter booking India | `/helicopter-charter/private-helicopter-charter` |
| helicopter rental India | `/helicopter-charter/helicopter-rental` |
| private jet charter cost India, helicopter charter cost India | `/pricing` and the pricing insights |
| empty leg flights India, empty leg private jet India | `/empty-leg-charter`, `/insights/what-is-an-empty-leg-flight` |
| private jet charter Delhi, private charter Mumbai | `/destinations/delhi`, `/destinations/mumbai` |
| how private jet charter works | `/how-it-works` |
| private jet vs commercial flight | `/insights/private-jet-vs-commercial-flight` |
| helicopter vs private jet | `/insights/helicopter-vs-private-jet` |
| how to book a helicopter in India | `/helicopter-charter`, `/how-it-works` |
| Chardham yatra by helicopter, Kedarnath helicopter booking | `/chardham`, `/chardham/kedarnath-helicopter` — charter-framed |

Keywords are research inputs, not phrases to insert. No page repeats its target phrase
mechanically, and none carries a keyword-stuffed title.

## Entity separation from the sister property

Both domains stay live, so they are separated by what each is about rather than by wording:

- **bookmycharter.in** — charter access. Chardham pages are about chartering a whole aircraft into
  Himalayan terrain: density altitude, payload, sites, waiting time, weather.
- **bookmychardham.in** — the pilgrimage. Seats, packages, darshan, season, temple logistics.

The rule applied to every Chardham page here: if a paragraph would sit equally well on the
pilgrimage site, it does not belong on this one. Both Chardham pages link out to the sister site
for the pilgrimage side rather than reproducing it.

## Claims discipline

Carried forward from `CLAIMS.md`. No fabricated aircraft, registrations, operators, prices,
availability, certifications, partnerships, testimonials or people. Aircraft specifications are
labelled typical for the type with their source named on the page. Unknown figures render as an em
dash, never as an estimate. `/about` states this policy instead of displaying badges, because every
badge the previous site carried was unevidenced.
