/**
 * THARi BOOKS — curated free-to-read public-domain classics.
 * These are external reading links only; no book files are hosted here.
 * Project Gutenberg's public-domain determination is US-based; status can vary by country.
 */

export type OpenBook = {
  id: string;
  title: string;
  titleMy: string;
  author: string;
  categoryId: string;
  categoryMy: string;
  descriptionMy: string;
  source: "Project Gutenberg";
  language: "English";
  sourceUrl: string;
  access: "free_external_read";
  rightsNote: string;
};

export const openBooks: readonly OpenBook[] = [
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    titleMy: "မာနနှင့် အစွဲအလမ်း",
    author: "Jane Austen",
    categoryId: "stories-fiction",
    categoryMy: "ဝတ္ထုနှင့် စိတ်ကူးယဉ်",
    descriptionMy: "မိသားစု၊ လူမှုဆက်ဆံရေးနှင့် လူ့သဘာဝကို ဟာသနှော၍ ရေးသားထားသော ဂန္ထဝင်ဝတ္ထု။",
    source: "Project Gutenberg",
    language: "English",
    sourceUrl: "https://www.gutenberg.org/ebooks/1342",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    titleMy: "ဖရန်ကင်စတိန်း",
    author: "Mary Wollstonecraft Shelley",
    categoryId: "stories-fiction",
    categoryMy: "ဝတ္ထုနှင့် စိတ်ကူးယဉ်",
    descriptionMy: "သိပ္ပံစိတ်ကူးယဉ်ဂန္ထဝင်ဝတ္ထု။ လူ့တာဝန်ယူမှုနှင့် သိပ္ပံဆိုင်ရာကျင့်ဝတ်ကို စူးစမ်းထားသည်။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/84",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "sherlock-holmes",
    title: "The Adventures of Sherlock Holmes",
    titleMy: "ရှားလော့ဟုမ်းစ် စုံထောက်ဝတ္ထုများ",
    author: "Arthur Conan Doyle",
    categoryId: "stories-fiction",
    categoryMy: "ဝတ္ထုနှင့် စိတ်ကူးယဉ်",
    descriptionMy: "စုံထောက်ဇာတ်လမ်းတိုများမှတစ်ဆင့် သဲလွန်စရှာဖွေခြင်းနှင့် ဆင်ခြင်တွေးခေါ်ခြင်းကို လေ့လာနိုင်သည်။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/1661",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "time-machine",
    title: "The Time Machine",
    titleMy: "အချိန်ယန္တရား",
    author: "H. G. Wells",
    categoryId: "stories-fiction",
    categoryMy: "ဝတ္ထုနှင့် စိတ်ကူးယဉ်",
    descriptionMy: "အနာဂတ်ကမ္ဘာကို စိတ်ကူးဖြင့် စူးစမ်းထားသော သိပ္ပံစိတ်ကူးယဉ်ဝတ္ထု။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/35",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "meditations",
    title: "Meditations",
    titleMy: "ကိုယ်တိုင်ဆင်ခြင်ချက်များ",
    author: "Marcus Aurelius",
    categoryId: "personal-development",
    categoryMy: "ကိုယ်ရည်ကိုယ်သွေးနှင့် အတွေးအမြင်",
    descriptionMy: "ကိုယ့်အတွေး၊ စိတ်နေသဘောထားနှင့် နေ့စဉ်ဘဝအပေါ် ဆင်ခြင်သုံးသပ်ထားသော ဒဿနစာစု။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/2680",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "republic",
    title: "The Republic",
    titleMy: "နိုင်ငံတော်",
    author: "Plato",
    categoryId: "general-knowledge",
    categoryMy: "အထွေထွေဗဟုသုတနှင့် ဒဿန",
    descriptionMy: "တရားမျှတမှု၊ လူ့အဖွဲ့အစည်းနှင့် အုပ်ချုပ်မှုအကြောင်း ရှေးဂရိဒဿနစာအုပ်။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/1497",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "wealth-of-nations",
    title: "The Wealth of Nations",
    titleMy: "နိုင်ငံများ၏ ကြွယ်ဝချမ်းသာမှု",
    author: "Adam Smith",
    categoryId: "business",
    categoryMy: "စီးပွားရေး",
    descriptionMy: "စီးပွားရေးစနစ်၊ ကုန်သွယ်ရေးနှင့် အလုပ်ခွဲဝေမှုတို့၏ အခြေခံအယူအဆများကို ဆွေးနွေးထားသော ဂန္ထဝင်စာအုပ်။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/3300",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "origin-of-species",
    title: "On the Origin of Species",
    titleMy: "မျိုးစိတ်များ၏ မူလအစ",
    author: "Charles Darwin",
    categoryId: "science",
    categoryMy: "သိပ္ပံ",
    descriptionMy: "သဘာဝရွေးချယ်မှုနှင့် သက်ရှိမျိုးစိတ်များ ပြောင်းလဲတိုးတက်လာပုံကို ရှင်းပြထားသော သိပ္ပံသမိုင်းဝင်စာအုပ်။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/1228",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
  {
    id: "herodotus-histories",
    title: "The History of Herodotus",
    titleMy: "ဟဲရိုဒိုတပ်စ်၏ သမိုင်းမှတ်တမ်း",
    author: "Herodotus",
    categoryId: "history",
    categoryMy: "သမိုင်း",
    descriptionMy: "ရှေးဟောင်းဂရိနှင့် အနီးပတ်ဝန်းကျင် လူ့အဖွဲ့အစည်းများအကြောင်း ရှေးဟောင်းသမိုင်းမှတ်တမ်း။",
    source: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/2707",
    access: "free_external_read",
    rightsNote: "မူရင်းဝက်ဘ်ဆိုက်တွင် အခမဲ့ဖတ်ရှုရန် လင့်ခ်သာဖြစ်သည်။ ပြန်လည်ကူးယူတင်ရန် နိုင်ငံအလိုက် မူပိုင်ခွင့်ကို သီးခြားစစ်ဆေးပါ။",
  },
];

export const openBookCategories = [
  { id: "stories-fiction", titleEn: "Stories & Fiction", titleMy: "ဝတ္ထုနှင့် စိတ်ကူးယဉ်" },
  { id: "business", titleEn: "Business & Economics", titleMy: "စီးပွားရေး" },
  { id: "science", titleEn: "Science", titleMy: "သိပ္ပံ" },
  { id: "history", titleEn: "History", titleMy: "သမိုင်း" },
  { id: "personal-development", titleEn: "Personal Development", titleMy: "ကိုယ်ရည်ကိုယ်သွေး" },
  { id: "general-knowledge", titleEn: "General Knowledge", titleMy: "အထွေထွေဗဟုသုတ" },
] as const;
