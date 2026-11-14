# THARi BOOKS — Static Catalog Data Model

> Planning specification only. This is not a database implementation. Stage one remains a static homepage with no book inventory, accounts, membership, payments, or upload flow.

## Design principles
- Keep the first release static and mobile-first; approved records can later live in version-controlled JSON or Markdown.
- Separate official external resources from original THARi learning materials.
- Never label a subject current/official until its source and edition have been checked.
- A publicly accessible file is not automatically licensed for copying, hosting, or sale.
- A resource stays hidden until content accuracy and rights checks pass.

## Hierarchy
```text
Library
├── Education
│   └── Grade (KG, G1 ... G12)
│       └── Subject
│           └── Resource
└── General
    └── Category
        └── Book / Article / Learning resource
```

## Grade record
| Field | Type | Required | Meaning |
|---|---|---:|---|
| id | string | yes | Stable slug, e.g. `g6` |
| label_my | string | yes | Myanmar display label |
| label_en | string | yes | English display label |
| level | enum | yes | `kindergarten`, `primary`, `middle`, `high` |
| curriculum_status | enum | yes | `unverified`, `source_found`, `verified_current` |
| source_ids | string[] | no | References in source register |

## Subject record
| Field | Type | Required | Meaning |
|---|---|---:|---|
| id | string | yes | Stable subject slug |
| grade_id | string | yes | Parent grade |
| name_my | string | yes | Official Myanmar title, if verified |
| name_en | string | no | Official English title, if available |
| curriculum_year | string/null | yes | Exact year/version or null if unknown |
| verification_status | enum | yes | `unverified`, `source_found`, `verified_current` |
| source_urls | string[] | yes | Exact official evidence URLs |
| notes | string | no | Edition/scope caveats |

## Resource record
| Field | Type | Required | Meaning |
|---|---|---:|---|
| id | string | yes | Stable resource slug |
| subject_id | string | yes | Parent subject |
| title_my | string | yes | Display title |
| title_en | string | no | Optional English title |
| resource_type | enum | yes | `official_textbook_link`, `official_audio_lesson`, `teacher_guide_link`, `original_lesson`, `original_exercise`, `original_diagram`, `reading_link` |
| author_or_publisher | string | yes | Actual creator/publisher |
| source_url | string/null | yes | Original source, or null for unpublished draft |
| edition_or_date | string/null | yes | Edition/year/date if known |
| rights_status | enum | yes | `unknown`, `link_only`, `permission_granted`, `open_license`, `original_thari` |
| license_note | string | no | Permission/license evidence |
| review_status | enum | yes | `draft`, `needs_review`, `approved`, `rejected` |
| reviewed_at | string/null | yes | ISO date of last review |
| visibility | enum | yes | `hidden`, `public` |

## Publication gate
A resource may be public only when:
1. Its source/creator is identified.
2. Its accuracy has been reviewed.
3. Its rights status permits the planned use. `unknown` is never publishable; `link_only` permits linking, not copying or hosting.
4. Its grade/subject label does not overstate curriculum verification.
5. Its link has been checked on a mobile browser.

## Example (illustrative schema only)
```json
{
  "id": "g6-geography-radio-intro",
  "subject_id": "g6-geography",
  "title_my": "ပထဝီဝင်ဘာသာရပ် သင်ရိုးမိတ်ဆက်",
  "title_en": null,
  "resource_type": "official_audio_lesson",
  "author_or_publisher": "Ministry of Education, Myanmar",
  "source_url": "https://www.moe.gov.mm/my/radio-lessons",
  "edition_or_date": null,
  "rights_status": "link_only",
  "license_note": "Link to the official page only; do not copy or re-host audio without permission.",
  "review_status": "needs_review",
  "reviewed_at": "2026-11-14",
  "visibility": "hidden"
}
```
This example illustrates the data shape; it is not a claim that the individual audio item has been cleared for republication.

## Stage-one boundary
Do not add a database, backend API, login, membership, payment, upload endpoint, or public download based on this schema alone. Finish and review the static homepage first; add a real catalog only after each record has evidence and the owner approves that stage.

## Implemented TypeScript foundation

The static type definitions and initial empty catalogue structure now live in
`client/src/data/catalog.ts`.

Implemented:
- KG through Grade 12 grade records grouped by the KG+12 levels.
- Typed subject and learning-resource records.
- Verification, rights, review, and visibility status types.
- The eight general-library category records.
- A publication guard that only allows public resources with approved review status and an explicit permitted rights state.

The subject array now contains 21 source-found records: six Grade 1 textbook subjects, eight Grade 10 subjects with 2020-2021 Ministry page tags, and seven individual lesson subjects identified in the Ministry radio archive across Grades 3, 4 and 6. None is marked verified-current. Seven external-link resource records point to the official Ministry radio archive; they are link-only and are not copied or hosted by THARi BOOKS. The homepage grade details display these source-found subjects and available official archive links. This remains a static catalogue with no database or backend.


## Evidence added — 2026-11-14

- Grade 1: six subject titles were listed by the Department of Myanmar Examinations. The official search result is evidence of the titles, but the direct page returned 404 during the latest check. Keep records at `source_found` and do not publish that URL as a working book link.
- Grade 10: eight individual new-curriculum subject pages were located on the Ministry of Education curriculum index: Economics, Biology, History, Geography, Physics, Chemistry, Mathematics and English. Each page is tagged 2020-2021. Keep records at `source_found`; this is not confirmation of the full current 2026-2027 syllabus.
- The Ministry index also labels some Grade 11 entries as old curriculum. Do not mix them into new-curriculum Grade 10 records or assume they represent the current Grade 11 catalogue.

See `docs/education-source-register.md` for source URLs and caveats.


## Stage-two static catalogue update — 2026-11-14

- The static catalogue contains 21 source-found subject records and seven official Ministry radio-lesson archive links.
- Grade 3, Grade 4 and Grade 6 grade-detail dialogs show the discovered lesson subjects and link to the Ministry archive.
- `link_only` is an allowed publication state only for external linking; it does not permit copying, downloading for redistribution, rehosting, or sale.
- The official 2026–2027 school-year reports provide broad textbook-distribution context but do not prove complete subject lists or current editions.
- No login, payment, membership, upload, database, or backend has been added.
