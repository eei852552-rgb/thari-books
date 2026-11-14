# THARi BOOKS — ဆက်လက်တည်ဆောက်မှု TODO

## ပြီးစီးရန် ရည်မှန်းချက်များ

- [x] **Professional homepage နှင့် mobile-first shell** — THARi BOOKS ပင်မစာမျက်နှာတွင် header, brand, navigation, search, hero, category/library sections, book grid, about/footer, mobile menu နှင့် responsive touch targets ပါဝင်သည်။
- [x] **Category browsing** — အမျိုးအစားခလုတ်များမှ ချက်ချင်း filter လုပ်နိုင်သည်။ School textbook inventory အသစ် မထည့်ထားပါ။
- [x] **Search** — စာအုပ်အမည်၊ စာရေးသူအမည် (မြန်မာ/အင်္ဂလိပ်)၊ အမျိုးအစားနှင့် description တွင် live search လုပ်နိုင်ပြီး empty state ပါရှိသည်။
- [x] **Book detail and reading links** — စာအုပ်တိုင်းတွင် local cover asset, title, author, summary, THARi reader action နှင့် Project Gutenberg original link သီးခြားပြထားသည်။ ရှိပြီးသားစာအုပ်/အခန်း data ကို preserve လုပ်ထားသည်။
- [x] **Chapter-level illustration system** — Chapter record တွင် optional `illustration` metadata (`src`, alt text, caption) ထည့်နိုင်ပြီး reader တွင် သီးခြား original SVG panel အဖြစ် ပြသည်။ Page scan မသုံးပါ။
- [x] **Burmese/English switching** — Homepage UI နှင့် reader content ကို မြန်မာ/English ပြောင်းနိုင်သည်။ Chapter II ၏ `summary`/abridged label ကို ထိန်းသိမ်းထားသည်။
- [x] **Last-read resume** — စာအုပ်၊ အခန်း၊ page နှင့် reader language ကို browser `localStorage` တွင် အခမဲ့သိမ်းပြီး reader ပြန်ဖွင့်ရာတွင် ဆက်ဖတ်နိုင်သည်။ Storage မရလျှင် reader ဆက်အလုပ်လုပ်သည်။
- [x] **Rights and paid-service constraints** — Paid service/backend/login/payment မထည့်ပါ။ Full-book file များကို re-host မလုပ်ဘဲ original source links နှင့် rights notes ကို ဆက်လက်ဖော်ပြထားသည်။
- [x] **Validation and handoff** — `pnpm check`, `pnpm build:static`, `pnpm test`, preview HTTP/asset checks နှင့် browser click-through စမ်းသပ်ပြီးပါပြီ။ Production deploy မလုပ်ထားပါ။

## Status notes

- ရှိပြီးသား bilingual reader, public-domain source links, rights notes နှင့် curriculum data များကို preserve လုပ်ထားသည်။
- ဤအဆင့်တွင် backend/database/login/payment/membership/upload flow မထည့်ပါ။
