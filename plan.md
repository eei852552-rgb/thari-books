# THARi BOOKS — ဆက်လက်တည်ဆောက်မည့် Implementation Plan

## ရည်ရွယ်ချက်နှင့် ကန့်သတ်ချက်

လက်ရှိ THARi BOOKS static React/Vite frontend နှင့် ရှိပြီးသား `openBooks` catalogue၊ bilingual reader၊ chapter data များကို မဖျက်ဘဲ စာအုပ်ရှာဖွေ/ဖတ်ရှုနိုင်မှုကို ထုတ်လုပ်အသုံးပြုနိုင်အောင် တိုးချဲ့မည်။ Backend၊ database၊ login၊ payment၊ paid service နှင့် upload API မထည့်ပါ။ စာအုပ်မူရင်းစာသားများကို ထပ်မံကူးယူ host မလုပ်ဘဲ ရှိပြီးသား မူရင်း/အကျဉ်းချုပ်/ဘာသာပြန် data နှင့် ခွင့်ပြုထားသော သီးခြား asset များကိုသာ အသုံးပြုမည်။ KG မှ Grade 12 အထိ school textbook inventory အသစ် မထည့်ပါ။

## Implementation approach

- `client/src/data/openBooks.ts` ကို စာအုပ် catalogue ၏ source of truth အဖြစ် ဆက်လက်အသုံးပြုပြီး cover image, book-level language labels, chapter metadata များ ထည့်မည်။
- Translation chapter records များတွင် optional `illustration` metadata (`src`, `altMy`, `altEn`, `captionMy`, `captionEn`) ထည့်မည်။ Illustration သည် စာမျက်နှာ screenshot မဟုတ်ဘဲ အခန်းအကြောင်းအရာကို ကိုယ်စားပြုသည့် သီးခြား original SVG asset ဖြစ်မည်။
- Home UI ကို search query၊ category filter၊ book detail/reader modal၊ chapter navigation နှင့် reading resume state တို့ဖြင့် တစ်နေရာတည်းတွင် ထိန်းချုပ်မည်။
- Reader progress ကို `localStorage` တွင် `{bookId, chapterIndex, page, language, updatedAt}` အဖြစ် သိမ်းသည်။ Login/database မလိုဘဲ device/browser တစ်ခုအတွင်း အခမဲ့အလုပ်လုပ်ပြီး storage မရပါက reader သည် ပုံမှန်ဖတ်ရှုနိုင်သည်။
- မြန်မာ/English UI switch သည် UI labels, headings, helper text နှင့် reader language ကို ပြောင်းပေးမည်။ Catalog record မရှိသေးသော English metadata အတွက် ရှိပြီးသား English fields ကို အသုံးပြုမည်။
- `client/public/manus-routes.json` တွင် လက်ရှိ `/` နှင့် `/404` ကို ထိန်းသိမ်းမည်။ SPA route အသစ် မထည့်ပါ။

## Project structure

- `client/src/pages/Home.tsx` — homepage composition, filters, modal reader, mobile menu, language switch, resume progress.
- `client/src/data/openBooks.ts` — curated book metadata, source links, cover paths.
- `client/src/data/translations/*.ts` — bilingual chapter content and per-chapter illustration metadata.
- `client/public/images/covers/` — THARi-created SVG book cover artwork.
- `client/public/images/illustrations/` — per-chapter original SVG illustrations, never page scans.
- `client/src/index.css` — responsive/mobile-first presentation, cover art image treatment, reader illustration and controls.
- `TODO.md` — acceptance outcomes and delivery status.

## Design

ရွေးချယ်စရာ style သုံးမျိုး:

1. **Quiet Editorial Library** — စာကြည့်တိုက်အယ်ဒီတိုရီယယ်ပုံစံ၊ နေဗီ/ရွှေရောင်နှင့် စာဖတ်ရလွယ်သော whitespace (probability 0.07)
2. **Warm Cultural Modern** — နွေးထွေးသော မြန်မာယဉ်ကျေးမှု texture နှင့် အရောင်စုံ card layout (probability 0.06)
3. **Dark Knowledge Studio** — အနက်ရောင် canvas၊ neon accent နှင့် အပြန်အလှန်အာရုံစူးစိုက်သော dashboard ပုံစံ (probability 0.04)

ရွေးချယ်ထားသည့် **Quiet Editorial Library** ကို ဆက်လက်အသုံးပြုမည်။

- **Design movement:** contemporary editorial web design + အေးချမ်းသည့် စာကြည့်တိုက်အရသာ။
- **Core principles:** စာဖတ်ရလွယ်မှု၊ အချက်အလက်ရိုးသားမှု၊ အဆင့်ဆင့်ရှာဖွေနိုင်မှု၊ မိုဘိုင်းတွင် လက်တစ်ဖက်ဖြင့်အသုံးပြုနိုင်မှု။
- **Color philosophy:** navy သည် ယုံကြည်ရသော knowledge anchor၊ gold သည် discovery/read action ကိုညွှန်ပြသော accent၊ paper background သည် အချိန်ကြာဖတ်ရှုရာတွင် မျက်စိသက်သာစေရန်။
- **Layout paradigm:** editorial rail, offset cover cards, grouped category strip နှင့် reader modal ထဲတွင် ခွဲထုတ်ထားသော illustration panel။
- **Signature elements:** book-shaped brand mark, thin gold rules, numbered category/card labels, cover art တစ်အုပ်ချင်းစီ၏ ကိုယ်ပိုင် palette။
- **Interaction philosophy:** filter နှိပ်ရာတွင် ရလဒ်ကို ချက်ချင်းကျဉ်းမြောင်းစေပြီး reader မှာ နောက်ဆုံးနေရာကို ပြန်ဖွင့်ပေးမည်။ External original link သည် အမြဲရှင်းလင်းစွာ သီးခြားပြမည်။
- **Animation:** hover lift သေးသေး၊ focus ring ရှင်းလင်း၊ prefers-reduced-motion ကို လေးစား; reader content ကို မတုန်ခါစေရန် တည်ငြိမ်သော transition သာ။
- **Typography:** Noto Sans Myanmar သည် မြန်မာ headline/body၊ Inter သည် English metadata၊ Georgia သည် English original reading text။
- **Brand essence:** မြန်မာစာဖတ်သူများအတွက် ယုံကြည်ရသော အခမဲ့စာဖတ်လမ်းညွှန် — ရိုးသား၊ အေးချမ်း၊ ရှာဖွေရလွယ်။
- **Brand voice:** CTA များသည် တိုတောင်းပြီး ဖိတ်ခေါ်သည့်အသံဖြင့် — “နောက်ဆုံးဖတ်ခဲ့သည့်နေရာမှ ဆက်ဖတ်မယ်”, “အမျိုးအစားရွေးပြီး ရှာဖွေပါ”။
- **Wordmark & logo:** ရှိပြီးသား open-book mark နှင့် THARi BOOKS wordmark ကို မပြောင်းဘဲ အသုံးပြုမည်။
- **Signature brand color:** `#142947` navy; accent `#ddc276` gold။

## Data and rights decisions

- `coverImage` နှင့် `illustration` တို့သည် THARi project ထဲတွင် ရေးဆွဲထားသည့် SVG များ ဖြစ်ပြီး စာမျက်နှာပုံ၊ scan သို့မဟုတ် မူပိုင်ခွင့်ရှိသော full-book asset မဟုတ်ပါ။
- External book links များသည် Project Gutenberg သို့သာ ချိတ်ဆက်ပြီး စာအုပ်ဖိုင်ကို THARi တွင် re-host မလုပ်ပါ။
- Chapter II ကို ရှိပြီးသား `readingType: "summary"` အဖြစ် ဆက်လက် label လုပ်မည်။ Reader တွင် အပြည့်အစုံဘာသာပြန်ဟု မဖော်ပြပါ။

## November 2026 visual refinement

The approved reference direction is a classic luxury library: dark walnut and oxblood hero sections, parchment/antique-paper category surfaces, antique-gold borders, and richer three-dimensional book presentation. Implementation remains visual-only. Existing React content, search, category filtering, language switching, external source links, reader routes, progress storage, and chapter/page behavior remain unchanged. The hero frame uses a new clean library-room visual inspired by the supplied screenshot, while the generated cover art replaces the first three visible cover assets.
