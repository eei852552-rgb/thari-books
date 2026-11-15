import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FlaskConical,
  Globe2,
  History,
  Languages,
  Lightbulb,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { openBooks, openBookCategories, type OpenBook } from "../data/openBooks";
import { prideAndPrejudiceChaptersMy } from "../data/translations/prideAndPrejudice";
import { wizardOfOzChaptersMy } from "../data/translations/wizardOfOz";
import { wizardOfOzChapter2My } from "../data/translations/wizardOfOzChapter2";
import { artOfLearningChapters } from "../data/artOfLearning";

const categoryIcons = [BookOpen, BriefcaseBusiness, FlaskConical, History, Lightbulb, Globe2];
const categoryTones = ["rose", "gold", "green", "rose", "gold", "blue"];
const readingProgressKey = "thari-books:last-reading";

const readerChaptersByBookId = {
  "pride-and-prejudice": prideAndPrejudiceChaptersMy,
  "wonderful-wizard-of-oz": [...wizardOfOzChaptersMy, ...wizardOfOzChapter2My],
  "art-of-learning": artOfLearningChapters,
} as const;

type ReaderChapter = {
  readonly number: number;
  readonly title: string;
  readonly titleEn?: string;
  readonly content: string;
  readonly contentEn: string;
  readonly readingType?: string;
  readonly illustration?: {
    readonly src: string;
    readonly altMy: string;
    readonly altEn: string;
    readonly captionMy: string;
    readonly captionEn: string;
  };
};

type ReaderProgress = {
  bookId: string;
  chapterIndex: number;
  page: number;
  language: "my" | "en";
  updatedAt: number;
};

const copy = {
  my: {
    navCategories: "စာအုပ်အမျိုးအစားများ",
    navBooks: "အခမဲ့စာအုပ်များ",
    navAbout: "THARi အကြောင်း",
    searchPlaceholder: "စာအုပ်၊ စာရေးသူ၊ အမျိုးအစား ရှာရန်…",
    searchLabel: "စာအုပ်နှင့် စာရေးသူ ရှာရန်",
    heroEyebrow: "DIGITAL LIBRARY · မြန်မာစာဖတ်သူများအတွက်",
    heroTitleA: "အသိပညာရဲ့",
    heroTitleB: "ကမ္ဘာသစ်ဆီသို့",
    heroDescription: "အခမဲ့ဖတ်ရှုနိုင်သော ဂန္ထဝင်စာအုပ်များကို အမျိုးအစားအလိုက် ရှာဖွေဖတ်ရှုနိုင်သော ဒစ်ဂျစ်တယ်စာကြည့်တိုက်။",
    browseBooks: "အခမဲ့စာအုပ်များ ရှာဖွေမယ်",
    aboutThari: "THARi အကြောင်း",
    heroNote: "စာအုပ်ဖိုင်များကို မကူးယူဘဲ မူရင်းရင်းမြစ်များဆီသို့ လမ်းညွှန်ပေးသည်",
    exploreEyebrow: "EXPLORE YOUR INTERESTS",
    categoriesTitle: "စာအုပ် အမျိုးအစားများ",
    categoriesIntro: "စိတ်ဝင်စားရာ အမျိုးအစားကို ရွေးပြီး အခမဲ့စာအုပ်များကို ရှာဖွေပါ။",
    allCategories: "အမျိုးအစားများ",
    freeEyebrow: "FREE READING LINKS",
    booksTitle: "အခမဲ့ စာအုပ်များ",
    allBooks: "အားလုံးကြည့်ရန်",
    filteredBooks: "ရွေးချယ်ထားသော အမျိုးအစားမှ စာအုပ်များ",
    allBooksIntro: "မူရင်းစာကြည့်တိုက်များတွင် အခမဲ့ဖတ်ရှုနိုင်သော ဂန္ထဝင်စာအုပ်များ။",
    readInThari: "THARi reader ဖြင့် ဖတ်ရန်",
    readOverview: "စာအုပ်အကျဉ်းချုပ် ဖတ်ရန်",
    originalEnglish: "English မူရင်း",
    freeLabel: "FREE",
    noResults: "ရှာဖွေမှုနှင့် ကိုက်ညီသော စာအုပ်မတွေ့ပါ။",
    showAll: "အားလုံးကြည့်ရန်",
    continueReading: "နောက်ဆုံးဖတ်ခဲ့သည့်နေရာမှ ဆက်ဖတ်မယ်",
    lastRead: "နောက်ဆုံးဖတ်ထားသည်",
    illustration: "အခန်းအတွက် သီးခြားသရုပ်ဖော်ပုံ",
    page: "စာမျက်နှာ",
    chapter: "အခန်း",
    previousChapter: "ယခင်အခန်း",
    nextChapter: "နောက်အခန်း",
    previousPage: "ယခင်စာမျက်နှာ",
    nextPage: "နောက်စာမျက်နှာ",
    myanmar: "မြန်မာ",
    english: "English",
    aboutBook: "စာအုပ်အကြောင်း",
    keyIdeas: "အဓိက မှတ်သားစရာများ",
    close: "ပိတ်ရန်",
    sourceBook: "English မူရင်းစာအုပ် ဖတ်ရန်",
    translationNote: "ဤအခန်းကို မြန်မာဘာသာဖြင့် အကျဉ်းချုပ်/ဘာသာပြန်အဖြစ် ဖော်ပြထားသည်။",
    abridgedNote: "ဤအခန်းသည် မူရင်းစာသားအပြည့်အစုံမဟုတ်သော အကျဉ်းချုပ်ပြန်လည်ဖော်ပြချက်ဖြစ်သည်။",
    sourceNote: "မူရင်းစာအုပ်များကို Project Gutenberg တွင် အခမဲ့ဖတ်ရှုနိုင်သည်။ THARi BOOKS သည် full-book ဖိုင်များကို re-host မလုပ်ပါ။",
    footerIntro: "အခမဲ့စာအုပ်များနှင့် မူရင်းစာကြည့်တိုက်များဆီသို့ လမ်းညွှန်ပေးသည်။",
    reading: "စာဖတ်ခြင်း",
    resources: "ရင်းမြစ်",
    sourceLibrary: "Project Gutenberg",
    terms: "အသုံးပြုမှုစည်းမျဉ်း",
    footerTag: "အခမဲ့ဖတ်ရှုနိုင်သော ပြင်ပလင့်ခ်များ",
  },
  en: {
    navCategories: "Categories",
    navBooks: "Free books",
    navAbout: "About THARi",
    searchPlaceholder: "Search by title, author or category…",
    searchLabel: "Search books and authors",
    heroEyebrow: "DIGITAL LIBRARY · FOR MYANMAR READERS",
    heroTitleA: "Open a new",
    heroTitleB: "world of knowledge",
    heroDescription: "A calm, curated directory for discovering classic books, bilingual reading notes and free original reading links.",
    browseBooks: "Browse free books",
    aboutThari: "About THARi",
    heroNote: "We guide readers to original sources instead of re-hosting book files",
    exploreEyebrow: "EXPLORE YOUR INTERESTS",
    categoriesTitle: "Book categories",
    categoriesIntro: "Choose an interest and discover the books available in this library.",
    allCategories: "Categories",
    freeEyebrow: "FREE READING LINKS",
    booksTitle: "Free books",
    allBooks: "View all",
    filteredBooks: "Books in the selected category",
    allBooksIntro: "Classic books available through free original-library links.",
    readInThari: "Read in THARi",
    readOverview: "Read book overview",
    originalEnglish: "English source",
    freeLabel: "FREE",
    noResults: "No books match your search.",
    showAll: "Show all books",
    continueReading: "Continue from your last page",
    lastRead: "Last read",
    illustration: "Original chapter illustration",
    page: "Page",
    chapter: "Chapter",
    previousChapter: "Previous chapter",
    nextChapter: "Next chapter",
    previousPage: "Previous page",
    nextPage: "Next page",
    myanmar: "မြန်မာ",
    english: "English",
    aboutBook: "About this book",
    keyIdeas: "Key ideas",
    close: "Close",
    sourceBook: "Read the English source",
    translationNote: "This chapter is presented as a Burmese translation or editorial retelling.",
    abridgedNote: "This chapter is an abridged retelling, not the complete original text.",
    sourceNote: "The original books are free to read at Project Gutenberg. THARi BOOKS does not re-host full-book files.",
    footerIntro: "A clear path to free books and original libraries.",
    reading: "Reading",
    resources: "Resources",
    sourceLibrary: "Project Gutenberg",
    terms: "Terms of use",
    footerTag: "Free external reading links",
  },
} as const;

function splitReaderPages(content: string, maxCharacters = 1900): string[] {
  const paragraphs = content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const pages: string[] = [];
  let currentPage: string[] = [];
  let currentLength = 0;

  for (const paragraph of paragraphs) {
    const extraLength = paragraph.length + (currentPage.length ? 2 : 0);
    if (currentPage.length && currentLength + extraLength > maxCharacters) {
      pages.push(currentPage.join("\n\n"));
      currentPage = [];
      currentLength = 0;
    }
    currentPage.push(paragraph);
    currentLength += paragraph.length + (currentPage.length > 1 ? 2 : 0);
  }

  if (currentPage.length) pages.push(currentPage.join("\n\n"));
  return pages;
}

function getAssetPath(relativePath: string) {
  return `${import.meta.env.BASE_URL}${relativePath}`;
}

function readProgress(): ReaderProgress | null {
  try {
    const raw = window.localStorage.getItem(readingProgressKey);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<ReaderProgress>;
    if (!value.bookId || typeof value.chapterIndex !== "number" || !Number.isFinite(value.chapterIndex) || !Number.isInteger(value.chapterIndex) || typeof value.page !== "number" || !Number.isFinite(value.page) || !Number.isInteger(value.page)) return null;
    if (!openBooks.some((book) => book.id === value.bookId)) return null;
    return {
      bookId: value.bookId,
      chapterIndex: Math.max(0, value.chapterIndex),
      page: Math.max(0, value.page),
      language: value.language === "en" ? "en" : "my",
      updatedAt: typeof value.updatedAt === "number" && Number.isFinite(value.updatedAt) ? value.updatedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

function saveProgress(progress: ReaderProgress) {
  try {
    window.localStorage.setItem(readingProgressKey, JSON.stringify(progress));
  } catch {
    // Private browsing and restricted webviews can deny localStorage. Reading remains usable.
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<OpenBook | null>(null);
  const [siteLanguage, setSiteLanguage] = useState<"my" | "en">("my");
  const [readerLanguage, setReaderLanguage] = useState<"my" | "en">("my");
  const [readerPage, setReaderPage] = useState(0);
  const [readerChapterIndex, setReaderChapterIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeProgress, setResumeProgress] = useState<ReaderProgress | null>(() => readProgress());
  const readerDialogRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const ui = copy[siteLanguage];
  const readerChapters = selectedBook ? (readerChaptersByBookId[selectedBook.id as keyof typeof readerChaptersByBookId] ?? []) as readonly ReaderChapter[] : [];
  const activeChapter = readerChapters[readerChapterIndex] ?? null;
  const readerContent = activeChapter ? (readerLanguage === "my" ? activeChapter.content : activeChapter.contentEn) : "";
  const readerPages = useMemo(() => splitReaderPages(readerContent), [readerContent]);
  const normalizedQuery = query.normalize("NFC").trim().toLocaleLowerCase();
  const categories = openBookCategories.filter((category) => openBooks.some((book) => book.categoryId === category.id));
  const visibleBooks = useMemo(() => openBooks.filter((book) => {
    const matchesCategory = !selectedCategory || book.categoryId === selectedCategory;
    const searchable = [
      book.title,
      book.titleMy,
      book.author,
      book.categoryMy,
      openBookCategories.find((category) => category.id === book.categoryId)?.titleEn,
      book.categoryId,
      book.descriptionMy,
      book.descriptionEn,
      book.synopsisMy,
      ...book.keyIdeasMy,
    ].filter(Boolean).join(" ").normalize("NFC").toLocaleLowerCase();
    return matchesCategory && searchable.includes(normalizedQuery);
  }), [normalizedQuery, selectedCategory]);
  const lastReadBook = resumeProgress ? openBooks.find((book) => book.id === resumeProgress.bookId) ?? null : null;

  useEffect(() => {
    if (readerPage >= readerPages.length && readerPages.length > 0) setReaderPage(readerPages.length - 1);
  }, [readerPage, readerPages.length]);

  useEffect(() => {
    if (!selectedBook) return;
    const previousOverflow = document.body.style.overflow;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const dialog = readerDialogRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () => Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    getFocusableElements()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedBook(null);
        return;
      }
      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialog?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [selectedBook]);

  useEffect(() => {
    if (!selectedBook) return;
    const nextProgress: ReaderProgress = {
      bookId: selectedBook.id,
      chapterIndex: readerChapterIndex,
      page: readerPage,
      language: readerLanguage,
      updatedAt: Date.now(),
    };
    saveProgress(nextProgress);
    setResumeProgress(nextProgress);
  }, [selectedBook, readerChapterIndex, readerPage, readerLanguage]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const selectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setQuery("");
    closeMobileMenu();
  };

  const openReader = (book: OpenBook) => {
    const saved = readProgress();
    const chapters = (readerChaptersByBookId[book.id as keyof typeof readerChaptersByBookId] ?? []) as readonly ReaderChapter[];
    const savedForBook = saved?.bookId === book.id ? saved : null;
    setSelectedBook(book);
    setReaderChapterIndex(savedForBook ? Math.min(savedForBook.chapterIndex, Math.max(0, chapters.length - 1)) : 0);
    setReaderPage(savedForBook?.page ?? 0);
    setReaderLanguage(savedForBook?.language ?? "my");
  };

  return (
    <div className="site-shell" id="top">
      <div className="announcement"><Sparkles size={14} aria-hidden="true" /> {siteLanguage === "my" ? "အခမဲ့စာဖတ်ခြင်းမှ အသိပညာကမ္ဘာကို ဖွင့်လှစ်လိုက်ပါ" : "Open a wider world through free reading"}</div>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="THARi BOOKS ပင်မစာမျက်နှာ" onClick={closeMobileMenu}>
            <span className="brand-mark" aria-hidden="true"><BookOpen size={25} /></span>
            <span className="brand-wordmark"><strong>THARi BOOKS</strong><small>အသိပညာ · စာဖတ်ခြင်း · တိုးတက်မှု</small></span>
          </a>
          <nav className="desktop-nav" aria-label={siteLanguage === "my" ? "အဓိက လမ်းညွှန်" : "Main navigation"}>
            <a href="#general">{ui.navCategories}</a>
            <a href="#featured">{ui.navBooks}</a>
            <a href="#about">{ui.navAbout}</a>
          </nav>
          <div className="header-actions">
            <label className="search-box">
              <Search size={18} aria-hidden="true" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ui.searchPlaceholder} aria-label={ui.searchLabel} />
            </label>
            <button className="language-toggle" type="button" onClick={() => setSiteLanguage((language) => language === "my" ? "en" : "my")} aria-label="မြန်မာနှင့် English ဘာသာစကား ပြောင်းရန်">
              <Languages size={15} aria-hidden="true" /><span>{siteLanguage === "my" ? "EN" : "မြန်မာ"}</span>
            </button>
            <button className="mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? "မီနူးပိတ်ရန်" : "မီနူးဖွင့်ရန်"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <nav className={`mobile-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <a href="#general" onClick={closeMobileMenu}>{ui.navCategories}<ChevronRight size={15} /></a>
          <a href="#featured" onClick={closeMobileMenu}>{ui.navBooks}<ChevronRight size={15} /></a>
          <a href="#about" onClick={closeMobileMenu}>{ui.navAbout}<ChevronRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> {ui.heroEyebrow}</div>
              <h1 id="hero-title">{ui.heroTitleA}<br /><span>{ui.heroTitleB}</span></h1>
              <p className="hero-description">{ui.heroDescription}</p>
              <div className="hero-actions">
                <a className="button-primary" href="#featured">{ui.browseBooks} <ArrowRight size={17} /></a>
                <a className="button-text" href="#about">{ui.aboutThari} <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-note"><span className="note-dot" /> {ui.heroNote}</div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src={getAssetPath("images/library-hero.svg")} alt={siteLanguage === "my" ? "စာအုပ်စင်များနှင့် သဘာဝအလင်းရောင်ရှိသော စာဖတ်ခန်း" : "A sunlit reading room with shelves of books"} />
                <div className="hero-image-caption"><BookOpen size={17} /><span>{siteLanguage === "my" ? <>စာမျက်နှာတိုင်းတွင်<br /><strong>အခွင့်အလမ်းသစ်</strong></> : <>Every page opens<br /><strong>a new possibility</strong></>}</span></div>
              </div>
              <div className="hero-stamp" aria-hidden="true"><span>READ</span><BookOpen size={23} /><span>GROW</span></div>
              <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
              <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            </div>
          </div>
          <a className="scroll-cue" href="#general"><span>{siteLanguage === "my" ? "အမျိုးအစားများကို ကြည့်ရန်" : "Explore categories"}</span><ArrowRight size={15} /></a>
        </section>

        <section className="library-promise" aria-label="THARi BOOKS library principles">
          <div><ShieldCheck size={17} /><span><strong>{siteLanguage === "my" ? "မူရင်းရင်းမြစ်" : "Original sources"}</strong><small>{siteLanguage === "my" ? "link-only နှင့် rights note ရှင်းလင်း" : "Clear external links and rights notes"}</small></span></div>
          <div><Bookmark size={17} /><span><strong>{siteLanguage === "my" ? "နောက်ဆုံးနေရာမှ ဆက်ဖတ်" : "Resume reading"}</strong><small>{siteLanguage === "my" ? "စက်တစ်ခုအတွင်း အခမဲ့သိမ်းထားနိုင်" : "Free browser-only progress saving"}</small></span></div>
          <div><Languages size={17} /><span><strong>{siteLanguage === "my" ? "နှစ်ဘာသာဖတ်ရှုမှု" : "Bilingual reading"}</strong><small>{siteLanguage === "my" ? "မြန်မာ / English ပြောင်းဖတ်နိုင်" : "Switch between Burmese and English"}</small></span></div>
        </section>

        <section className="general-section section-pad" id="general" aria-labelledby="general-title">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> {ui.exploreEyebrow}</div>
              <h2 id="general-title">{ui.categoriesTitle}</h2>
              <p className="section-intro">{ui.categoriesIntro}</p>
            </div>
            <span className="category-count">{categories.length.toString().padStart(2, "0")} {ui.allCategories}</span>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              const isSelected = selectedCategory === category.id;
              return (
                <button className={`category-card ${isSelected ? "is-selected" : ""}`} type="button" key={category.id} onClick={() => selectCategory(isSelected ? null : category.id)} aria-pressed={isSelected}>
                  <span className={`category-icon tone-${categoryTones[index % categoryTones.length]}`}><Icon size={21} strokeWidth={1.7} /></span>
                  <span className="category-text"><strong>{category.titleEn}</strong><small>{category.titleMy}</small></span>
                  <span className="category-index">{String(index + 1).padStart(2, "0")}</span>
                  {isSelected ? <Check className="category-arrow is-visible" size={17} aria-hidden="true" /> : <ArrowUpRight className="category-arrow" size={17} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="featured-section section-pad" id="featured" aria-labelledby="featured-title">
          <div className="section-heading featured-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> {ui.freeEyebrow}</div>
              <h2 id="featured-title">{ui.booksTitle} <span>{selectedCategory ? `· ${openBookCategories.find((category) => category.id === selectedCategory)?.titleEn ?? ""}` : ""}</span></h2>
              <p className="section-intro">{selectedCategory ? ui.filteredBooks : ui.allBooksIntro}</p>
            </div>
            <button className="section-link" type="button" onClick={() => selectCategory(null)}>{ui.allBooks} <ArrowUpRight size={16} /></button>
          </div>
          {lastReadBook && readerChaptersByBookId[lastReadBook.id as keyof typeof readerChaptersByBookId] && (
            <button className="resume-card" type="button" onClick={() => openReader(lastReadBook)}>
              <span className="resume-card-icon"><Bookmark size={17} /></span>
              <span><small>{ui.lastRead}</small><strong>{ui.continueReading}</strong><em>{lastReadBook.titleMy} · {ui.chapter} {(resumeProgress?.chapterIndex ?? 0) + 1}</em></span>
              <ArrowRight size={18} />
            </button>
          )}
          <div className="book-grid">
            {visibleBooks.map((book, index) => {
              const category = openBookCategories.find((item) => item.id === book.categoryId);
              return (
                <article className="book-card" key={book.id}>
                  <div className={`book-cover cover-${["blue", "gold", "green", "rose"][index % 4]}`}>
                    <img className="book-cover-image" src={getAssetPath(book.coverImage)} alt={`${book.title} — ${book.author}`} />
                    <div className="book-cover-overlay" aria-hidden="true" />
                    <div className="cover-topline"><span>THARi · FREE LINK</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <div className="cover-bottomline"><span>{book.author}</span><span className="cover-seal">T</span></div>
                  </div>
                  <div className="book-meta"><div><span className="book-category">{siteLanguage === "my" ? category?.titleMy : category?.titleEn} · {book.language}</span><h3>{siteLanguage === "my" ? book.titleMy : book.title}</h3></div><span className="book-demo-tag">{ui.freeLabel}</span></div>
                  <p className={`book-description ${siteLanguage === "en" ? "book-description-en" : ""}`}>{siteLanguage === "my" ? book.descriptionMy : book.descriptionEn}</p>
                  <div className="book-actions">
                    <button className="read-button" type="button" onClick={() => openReader(book)}>{(readerChaptersByBookId[book.id as keyof typeof readerChaptersByBookId]?.length ?? 0) > 0 ? ui.readInThari : ui.readOverview} <BookOpen size={16} /></button>
                    <a className="read-button read-original" href={book.sourceUrl} target="_blank" rel="noopener noreferrer">{ui.originalEnglish} <ArrowUpRight size={16} /></a>
                  </div>
                </article>
              );
            })}
          </div>
          {visibleBooks.length === 0 && (
            <div className="empty-search" role="status" aria-live="polite"><Search size={20} /><span>{ui.noResults}</span><button type="button" onClick={() => { setSelectedCategory(null); setQuery(""); }}>{ui.showAll}</button></div>
          )}
          <p className="search-hint">{ui.sourceNote}</p>
        </section>

        <section className="closing-note" id="about">
          <div className="closing-mark"><BookOpen size={25} /></div>
          <div><span className="eyebrow eyebrow-dark">A LIBRARY FOR EVERYONE</span><h2>{siteLanguage === "my" ? <>စာဖတ်ခြင်းက <em>ဒီနေရာက</em> စတင်ပါတယ်။</> : <>Reading starts <em>right here.</em></>}</h2><p>{siteLanguage === "my" ? "THARi BOOKS — မြန်မာစာဖတ်သူတိုင်းအတွက် အခမဲ့စာဖတ်နိုင်သော ရင်းမြစ်များကို စုစည်းပေးသော ဒစ်ဂျစ်တယ်စာကြည့်တိုက်။" : "THARi BOOKS is a carefully labelled path to free reading links and original bilingual editorial notes."}</p></div>
          <a className="closing-link" href="#top" aria-label={siteLanguage === "my" ? "စာမျက်နှာအပေါ်သို့ ပြန်သွားရန်" : "Back to top"}><ArrowUpRight size={20} /></a>
        </section>

        {selectedBook && (
          <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedBook(null); }}>
            <section ref={readerDialogRef} className="demo-dialog burmese-reader" role="dialog" aria-modal="true" aria-labelledby="reader-title" tabIndex={-1}>
              <button className="dialog-close" type="button" onClick={() => setSelectedBook(null)} aria-label={ui.close}><X size={19} /></button>
              <span className="demo-label"><BookOpen size={13} /> THARi BOOKS · {ui.myanmar} / {ui.english}</span>
              <h2 id="reader-title">{siteLanguage === "my" ? selectedBook.titleMy : selectedBook.title}</h2>
              <p className="dialog-subtitle">{selectedBook.title} · {selectedBook.author}</p>
              {readerChapters.length > 0 && activeChapter ? (
                <div className="reader-full-translation">
                  {activeChapter.illustration && (
                    <figure className="reader-illustration">
                      <img src={getAssetPath(activeChapter.illustration.src)} alt={readerLanguage === "my" ? activeChapter.illustration.altMy : activeChapter.illustration.altEn} />
                      <figcaption><span>{ui.illustration}</span><strong>{readerLanguage === "my" ? activeChapter.illustration.captionMy : activeChapter.illustration.captionEn}</strong></figcaption>
                    </figure>
                  )}
                  {readerChapters.length > 1 && <div className="reader-pagination reader-chapter-pagination">
                    <button type="button" disabled={readerChapterIndex === 0} onClick={() => { setReaderChapterIndex((index) => Math.max(0, index - 1)); setReaderPage(0); }}>{ui.previousChapter}</button>
                    <span>{ui.chapter} {readerChapterIndex + 1} / {readerChapters.length}</span>
                    <button type="button" disabled={readerChapterIndex >= readerChapters.length - 1} onClick={() => { setReaderChapterIndex((index) => Math.min(readerChapters.length - 1, index + 1)); setReaderPage(0); }}>{ui.nextChapter}</button>
                  </div>}
                  <div className="reader-language-switch" role="group" aria-label="စာဖတ်ဘာသာစကား ရွေးချယ်ရန်">
                    <button type="button" className={readerLanguage === "my" ? "is-active" : ""} aria-pressed={readerLanguage === "my"} onClick={() => { setReaderLanguage("my"); setReaderPage(0); }}>{ui.myanmar}</button>
                    <button type="button" className={readerLanguage === "en" ? "is-active" : ""} aria-pressed={readerLanguage === "en"} onClick={() => { setReaderLanguage("en"); setReaderPage(0); }}>{ui.english}</button>
                  </div>
                  <section className="reader-page">
                    <div className="reader-page-heading"><h3>{readerLanguage === "en" ? activeChapter.titleEn ?? `Chapter ${activeChapter.number}` : activeChapter.title}</h3><span>{readerLanguage === "my" ? ui.page : "Page"} {readerPage + 1} / {readerPages.length}</span></div>
                    <p className={`reader-chapter ${readerLanguage === "en" ? "reader-chapter-en" : ""}`}>{readerPages[readerPage] ?? ""}</p>
                  </section>
                  <div className="reader-pagination">
                    <button type="button" disabled={readerPage === 0} onClick={() => setReaderPage((page) => Math.max(0, page - 1))}>{ui.previousPage}</button>
                    <span>{readerPage + 1} / {readerPages.length}</span>
                    <button type="button" disabled={readerPage >= readerPages.length - 1} onClick={() => setReaderPage((page) => Math.min(readerPages.length - 1, page + 1))}>{ui.nextPage}</button>
                  </div>
                  <p className="reader-note">{activeChapter.readingType === "summary" ? ui.abridgedNote : ui.translationNote} {siteLanguage === "my" ? `Source: ${selectedBook.source}.` : `Source: ${selectedBook.source}.`}</p>
                </div>
              ) : (
                <>
                  <h3>{ui.aboutBook}</h3>
                  <p>{siteLanguage === "my" ? selectedBook.synopsisMy : selectedBook.descriptionEn}</p>
                  {siteLanguage === "my" && <>
                    <h3>{ui.keyIdeas}</h3>
                    <ul className="reader-ideas">{selectedBook.keyIdeasMy.map((idea, index) => <li key={index}>{idea}</li>)}</ul>
                    <p className="reader-note">{selectedBook.readingNoteMy}</p>
                  </>}
                </>
              )}
              <p className="reader-note"><ShieldCheck size={14} aria-hidden="true" /> {siteLanguage === "my" ? selectedBook.rightsNote : "This link opens the original source. Copyright status and reuse rights can differ by country; check local law before reusing any text."}</p>
              <a className="read-button reader-source" href={selectedBook.sourceUrl} target="_blank" rel="noopener noreferrer">{ui.sourceBook} <ArrowUpRight size={16} /></a>
            </section>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <a className="brand brand-footer" href="#top"><span className="brand-mark"><BookOpen size={25} /></span><span className="brand-wordmark"><strong>THARi BOOKS</strong><small>အသိပညာ · စာဖတ်ခြင်း · တိုးတက်မှု</small></span></a>
            <p>{ui.footerIntro}</p>
          </div>
          <div className="footer-links"><div><h2>{ui.reading}</h2><a href="#general">{ui.navCategories}</a><a href="#featured">{ui.navBooks}</a></div><div><h2>{ui.resources}</h2><a href="https://www.gutenberg.org/" target="_blank" rel="noopener noreferrer">{ui.sourceLibrary}</a><a href="https://www.gutenberg.org/policy/terms_of_use.html" target="_blank" rel="noopener noreferrer">{ui.terms}</a></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} THARi BOOKS · Free Reading Directory</span><span className="footer-note"><span className="footer-dot" /> {ui.footerTag}</span></div>
      </footer>
    </div>
  );
}
