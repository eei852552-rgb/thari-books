# THARi BOOKS

A Burmese-first, mobile-first digital-library homepage for students, teachers, parents and readers in Myanmar. Stage one establishes the responsive frontend foundation for education and general-interest reading; it does not include a backend, database, user accounts, memberships, payments, administration or book-upload flows.

## What's included

- A Burmese-language homepage with the requested THARi BOOKS headline, responsive desktop/mobile navigation, search UI and library visual.
- Education cards for KG and Grades 1–12, organized into KG, Primary (1–5), Middle (6–9) and High School (10–12).
- Eight general-library categories: Technology, Business, Science, History, Language Learning, Personal Development, Stories & Fiction, and General Knowledge.
- Clearly labeled **Demo** featured-book cards. These are illustrative placeholders, not claims about real books; the read action explains their demo status.
- About, Contact, Help and Terms of Use footer actions. Contact/help/Terms open transparent placeholder notices until the owner supplies verified contact details and approved policy text; no email address or legal terms are invented.

## Technologies

React 19, TypeScript, Vite, Tailwind CSS 4, Lucide React, and Noto Sans Myanmar / Inter web fonts. The initial project also contains a prepared Express/tRPC/Drizzle starter, but stage one does not activate or use backend or database functionality.

## Run locally

Prerequisites: Node.js and pnpm 10.18.0 (the project pins the package manager).

```bash
pnpm install --frozen-lockfile
pnpm dev:static
```

The local preview is served on port 3000 by default. To create a static production build:

```bash
pnpm build:static
```

To run the available TypeScript check:

```bash
pnpm check
```

## Stage-one scope and content notes

No real book inventory or reading files have been supplied. The featured covers/titles are visibly marked Demo. Education cards indicate grades only; subject, lesson, note, exercise and exam content can be added in a later approved stage. The project should not progress to another stage until the owner approves it.
