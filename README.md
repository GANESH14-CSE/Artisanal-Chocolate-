# Meridian Cacao — artisanal chocolate & truffle shop

A complete, original static website for a bean-to-bar chocolate and truffle business.
No build step, no dependencies, no framework. Open `index.html` in a browser and it runs.

## Pages

| File | What it covers |
|---|---|
| `index.html` | **Home** — hero, featured bars, bean-to-bar story, truffles, pairing teaser, gift boxes, subscription, seasonal |
| `home-2.html` | **Home 2** — alternative homepage led by the origin index and the current release, with the full bar grid |
| `about.html` | **About** — company story, 9-step bean-to-bar process, sourcing rules (`#sourcing`), the team, workshop tastings |
| `collections.html` | Bean-to-bar collection with dark / milk / white filtering; each bar opens to show origin, variety, harvest, ferment, ingredients, price |
| `truffles.html` | All twelve truffle varieties with shells, flavour notes, allergens, prices, storage guidance |
| `pairings.html` | Interactive flavour pairing guide — filter by bar and by category (coffee, fruit, nuts, cheese, desserts, drinks) |
| `gift-box.html` | Customisable gift box builder — size, individual pieces, packaging, ribbon, personalised message, live total |
| `seasonal.html` | Seasonal and limited-edition calendar with release windows and availability status |
| `subscription.html` | Chocolate-of-the-month plans, delivery frequency switcher, benefits, full policy table |
| `contact.html` | Contact form, workshop address, hours, tasting bookings, wholesale |

## Structure

```
/
├── index.html … contact.html      10 pages
├── README.md
└── assets/
    ├── css/style.css              all styling, design tokens at the top
    ├── js/data.js                 catalogue: bars, truffles, pairings, boxes, plans
    ├── js/main.js                 nav, filters, pairing guide, box builder, plan pricing
    └── img/logo.svg, favicon.svg
```

## Editing the catalogue

All products live in `assets/js/data.js` as plain arrays. Add a bar by copying an entry in
`MC.bars` and changing the fields — every page that lists bars picks it up automatically.
The same applies to `MC.truffles`, `MC.pairings`, `MC.boxSizes`, `MC.packaging`,
`MC.ribbons` and `MC.plans`.

To place bars anywhere in a page, add `<div class="grid" data-bars="all" data-limit="4"></div>`.
`data-bars` accepts `all`, `dark`, `milk` or `white`. Truffles use `data-truffles="all"`.

## Design tokens

Colour, type scale and spacing are CSS custom properties at the top of `assets/css/style.css`:

```
--ink #241510   --paper #F3E7D3   --pod #7B2138   --gold #C0912F   --leaf #3E5940
```

Typefaces are Fraunces (display) and Karla (text), loaded from Google Fonts with system
serif/sans fallbacks, so the site still reads correctly offline.

## Before you go live

- The contact and newsletter forms are demonstrations: they validate and confirm in the page
  only. Point them at your own mail handler or form service.
- The gift box "Add box to bag" button stores the configuration in the page. Wire it to your
  cart or checkout.
- Prices, addresses, phone numbers and email addresses are placeholders.
- Replace the flat colour `.plate` and `.bar__wrap` blocks with photography when you have it;
  the markup is already sized and cropped for it.

## Notes

- Responsive from 320 px up, keyboard-navigable, visible focus rings, `prefers-reduced-motion`
  respected, live regions on the filters and the box builder.
- Everything here — design, code, product copy, brand name — is original work created for this
  project. It is not derived from any existing chocolate company's website.
