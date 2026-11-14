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

The subject and resource arrays are intentionally empty. This file is a typed foundation only; it is not yet connected to the homepage UI, does not contain a verified subject inventory, and does not create a database or backend.
