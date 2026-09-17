# SEO Page Map

| URL | Search Intent | Primary Topic | Title | H1 |
| --- | --- | --- | --- | --- |
| / | Commercial / Brand | Chardham and helicopter charter | Kedarnath & Char Dham Helicopter Charter | Explore Kedarnath & Char Dham by Helicopter Charter |
| /about | Informational / Brand | Company background | About BookMyChardham | About BookMyChardham |
| /char-dham-yatra-by-helicopter | Commercial | Chardham helicopter yatra | Char Dham Yatra by Helicopter | Char Dham Yatra by Helicopter |
| /helicopter-flower-dropping | Commercial | Aerial flower shower | Helicopter Flower Dropping | Helicopter Flower Dropping |
| /private-helicopter-charter | Commercial | Private helicopter charter | Private Helicopter Charter | Private Helicopter Charter |
| /private-jet-charter | Commercial | Private jet charter | Private Jet Charter | Private Jet Charter |
| /private-jet-charter-booking | Transactional | Private jet booking | Private Jet Charter Booking | Private Jet Charter Booking |
| /private-jet-booking-india | Transactional | Private jet booking in India | Private Jet Booking India | Private Jet Booking India |
| /charter-flight-booking | Transactional | Charter flight booking | Charter Flight Booking | Charter Flight Booking |
| /aircraft-charter-services-india | Commercial | Aircraft charter services India | Aircraft Charter Services India | Aircraft Charter Services India |
| /private-jet-hire | Commercial | Private jet hire | Private Jet Hire | Private Jet Hire |
| /business-jet-charter | Commercial | Business jet charter | Business Jet Charter | Business Jet Charter |
| /private-jet-charter-delhi | Local commercial | Private jet charter Delhi | Private Jet Charter Delhi | Private Jet Charter Delhi |
| /corporate-jet-charter | Commercial | Corporate jet charter | Corporate Jet Charter | Corporate Jet Charter |
| /helicopter-charter-services | Commercial | Helicopter charter services | Helicopter Charter Services | Helicopter Charter Services |
| /helicopter-booking | Transactional | Helicopter booking in India | Helicopter Booking in India | Helicopter Booking |
| /corporate-helicopter-charter | Commercial | Corporate helicopter charter | Corporate Helicopter Charter in India | Corporate Helicopter Charter |
| /fleet | Informational / Product | Available aircraft fleet | Fleet | Fleet |
| /contact | Transactional | Contact and quote request | Contact BookMyChardham | Contact BookMyChardham |
| /blogs | Informational / Content | Business and aviation articles | Blog | Blog |

## Final validation scope

The 12 private aviation routes from `/private-jet-charter` through `/corporate-helicopter-charter` were requested from the production build. Each returned HTTP 200, had one unique server-rendered H1, a unique title and description, a matching canonical, Open Graph title/description/image, indexable robots metadata, valid JSON-LD containing BreadcrumbList, Service, and FAQPage nodes, and an exact sitemap match.

The sitemap is generated from `privateAviationPageOrder` in `src/data/privateAviationPages.js`; the order now includes all 12 audited aviation routes. The helicopter charter page links to both new helicopter pages, and each aviation page exposes crawlable related-service links through the shared `PrivateAviationPage` component.
