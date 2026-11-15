import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
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
import { wizardOfOzChapters3to4 } from "../data/translations/wizardOfOzChapters3to4";
import { artOfLearningChapters } from "../data/artOfLearning";
import { timeMachineChapter1My } from "../data/translations/timeMachineChapter1";
import { timeMachineChapter2My } from "../data/translations/timeMachineChapter2";
import { timeMachineChapter3My } from "../data/translations/timeMachineChapter3";
import { timeMachineChapter4My } from "../data/translations/timeMachineChapter4";
import { timeMachineChapter5My } from "../data/translations/timeMachineChapter5";

const categoryIcons = [BookOpen, BriefcaseBusiness, FlaskConical, History, Lightbulb, Globe2];
const categoryTones = ["rose", "gold", "green", "rose", "gold", "blue"];
const readingProgressKey = "thari-books:reading-progress:v2";
const legacyReadingProgressKey = "thari-books:last-reading";

const readerChaptersByBookId = {
  "pride-and-prejudice": prideAndPrejudiceChaptersMy,
  "wonderful-wizard-of-oz": [...wizardOfOzChaptersMy, ...wizardOfOzChapter2My, ...wizardOfOzChapters3to4],
  "art-of-learning": artOfLearningChapters,
  "time-machine": [...timeMachineChapter1My, ...timeMachineChapter2My, ...timeMachineChapter3My, ...timeMachineChapter4My, ...timeMachineChapter5My],
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
    editorialForeword: "THARi အယ်ဒီတာ၏ အမှာစကား",
    authorForeword: "စာရေးသူ၏ အမှာစာ",
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
    editorialForeword: "THARi Editorial Foreword",
    authorForeword: "Author’s Foreword",
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
  let currentPage = "";

  const splitLongParagraph = (paragraph: string): string[] => {
    if (paragraph.length <= maxCharacters) return [paragraph];
    const sentences = paragraph.match(/[^။!?]+[။!?]?/g)?.map((part) => part.trim()).filter(Boolean) ?? [paragraph];
    const chunks: string[] = [];
    let chunk = "";
    for (const sentence of sentences) {
      if (sentence.length > maxCharacters) {
        if (chunk) { chunks.push(chunk); chunk = ""; }
        const words = sentence.split(/\s+/).filter(Boolean);
        let wordChunk = "";
        for (const word of words) {
          if (word.length > maxCharacters) {
            if (wordChunk) { chunks.push(wordChunk); wordChunk = ""; }
            const characters = Array.from(word);
            for (let index = 0; index < characters.length; index += maxCharacters) {
              chunks.push(characters.slice(index, index + maxCharacters).join(""));
            }
          } else if (wordChunk && wordChunk.length + word.length + 1 > maxCharacters) {
            chunks.push(wordChunk);
            wordChunk = word;
          } else {
            wordChunk = wordChunk ? wordChunk + " " + word : word;
          }
        }
        if (wordChunk) chunks.push(wordChunk);
      } else if (chunk && chunk.length + sentence.length + 1 > maxCharacters) {
        chunks.push(chunk);
        chunk = sentence;
      } else {
        chunk = chunk ? chunk + " " + sentence : sentence;
      }
    }
    if (chunk) chunks.push(chunk);
    return chunks;
  };

  for (const paragraph of paragraphs) {
    const parts = splitLongParagraph(paragraph);
    for (let partIndex = 0; partIndex < parts.length; partIndex += 1) {
      const part = parts[partIndex];
      const separator = currentPage ? (partIndex === 0 ? "\n\n" : " ") : "";
      if (currentPage && currentPage.length + separator.length + part.length > maxCharacters) {
        pages.push(currentPage);
        currentPage = part;
      } else {
        currentPage += separator + part;
      }
    }
  }

  if (currentPage) pages.push(currentPage);
  return pages;
}

function getAssetPath(relativePath: string) {
  return `${import.meta.env.BASE_URL}${relativePath}`;
}

function normalizeProgress(value: Partial<ReaderProgress>, bookId?: string): ReaderProgress | null {
  const id = typeof value.bookId === "string" ? value.bookId : bookId;
  if (!id || !openBooks.some((book) => book.id === id)) return null;
  if (typeof value.chapterIndex !== "number" || !Number.isFinite(value.chapterIndex) || !Number.isInteger(value.chapterIndex)) return null;
  if (typeof value.page !== "number" || !Number.isFinite(value.page) || !Number.isInteger(value.page)) return null;
  return {
    bookId: id,
    chapterIndex: Math.max(0, value.chapterIndex),
    page: Math.max(0, value.page),
    language: value.language === "en" ? "en" : "my",
    updatedAt: typeof value.updatedAt === "number" && Number.isFinite(value.updatedAt) ? value.updatedAt : Date.now(),
  };
}

function readAllProgress(): Record<string, ReaderProgress> {
  try {
    const raw = window.localStorage.getItem(readingProgressKey);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, Partial<ReaderProgress>>;
      const progress: Record<string, ReaderProgress> = {};
      for (const [bookId, value] of Object.entries(parsed)) {
        const normalized = normalizeProgress(value, bookId);
        if (normalized) progress[bookId] = normalized;
      }
      return progress;
    }

    // Migrate the previous single-book bookmark without losing the reader's place.
    const legacyRaw = window.localStorage.getItem(legacyReadingProgressKey);
    if (!legacyRaw) return {};
    const legacy = normalizeProgress(JSON.parse(legacyRaw) as Partial<ReaderProgress>);
    if (!legacy) return {};
    const migrated = { [legacy.bookId]: legacy };
    window.localStorage.setItem(readingProgressKey, JSON.stringify(migrated));
    return migrated;
  } catch {
    return {};
  }
}

function readProgress(bookId?: string): ReaderProgress | null {
  const progress = readAllProgress();
  if (bookId) return progress[bookId] ?? null;
  return Object.values(progress).sort((a, b) => b.updatedAt - a.updatedAt)[0] ?? null;
}

function saveProgress(nextProgress: ReaderProgress) {
  try {
    const progress = readAllProgress();
    progress[nextProgress.bookId] = nextProgress;
    window.localStorage.setItem(readingProgressKey, JSON.stringify(progress));
  } catch {
    // Private browsing and restricted webviews can deny localStorage. Reading remains usable.
  }
}

export default function Home() {
  const [, navigate] = useLocation();
  const [isBookRoute, bookRouteParams] = useRoute("/book/:bookId");
  const detailBook = isBookRoute ? openBooks.find((book) => book.id === bookRouteParams?.bookId) ?? null : null;
  const detailChapters = detailBook ? (readerChaptersByBookId[detailBook.id as keyof typeof readerChaptersByBookId] ?? []) as readonly ReaderChapter[] : [];
  const detailProgress = detailBook ? readProgress(detailBook.id) : null;
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<OpenBook | null>(null);
  const [siteLanguage, setSiteLanguage] = useState<"my" | "en">("my");
  const [readerLanguage, setReaderLanguage] = useState<"my" | "en">("my");
  const [readerPage, setReaderPage] = useState(0);
  const [pageTurnDirection, setPageTurnDirection] = useState<"forward" | "backward" | null>(null);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [readerChapterIndex, setReaderChapterIndex] = useState(0);
  const [readerStarted, setReaderStarted] = useState(false);
  const [readerIntroPage, setReaderIntroPage] = useState(0);
  const [readerIntroComplete, setReaderIntroComplete] = useState(false);
  const [readerFinished, setReaderFinished] = useState(false);
  const [resumeAtSavedPage, setResumeAtSavedPage] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeProgress, setResumeProgress] = useState<ReaderProgress | null>(() => readProgress());
  const readerDialogRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const ui = copy[siteLanguage];
  const readerChapters = selectedBook ? (readerChaptersByBookId[selectedBook.id as keyof typeof readerChaptersByBookId] ?? []) as readonly ReaderChapter[] : [];
  const activeChapter = readerChapters[readerChapterIndex] ?? null;
  const readerContent = activeChapter ? (readerLanguage === "my" ? activeChapter.content : activeChapter.contentEn) : "";
  const readerPages = useMemo(() => splitReaderPages(readerContent, readerLanguage === "my" ? 650 : 1300), [readerContent, readerLanguage]);
  const readerForewordPages = useMemo(() => {
    if (!selectedBook) return [];
    const sections = [
      selectedBook.authorForewordMy ? {
        title: readerLanguage === "my" ? "စာရေးသူ၏ အမှာစကား" : "Author’s Foreword",
        content: readerLanguage === "my" ? selectedBook.authorForewordMy : selectedBook.authorForewordEn,
      } : null,
      selectedBook.editorialForewordMy ? {
        title: readerLanguage === "my" ? "THARi အယ်ဒီတာ၏ အမှာစကား" : "THARi Editorial Foreword",
        content: readerLanguage === "my" ? selectedBook.editorialForewordMy : selectedBook.editorialForewordEn,
      } : null,
    ].filter((section): section is { title: string; content: string } => Boolean(section?.content?.trim()));
    return sections.flatMap((section) => splitReaderPages(section.content, readerLanguage === "my" ? 650 : 1300).map((content, pageIndex) => ({
      title: section.title,
      content,
      sectionPage: pageIndex + 1,
      sectionPages: splitReaderPages(section.content, readerLanguage === "my" ? 650 : 1300).length,
    })));
  }, [selectedBook, readerLanguage]);
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
    if (!selectedBook || !readerStarted || !readerIntroComplete) return;
    const nextProgress: ReaderProgress = {
      bookId: selectedBook.id,
      chapterIndex: readerChapterIndex,
      page: readerPage,
      language: readerLanguage,
      updatedAt: Date.now(),
    };
    saveProgress(nextProgress);
    setResumeProgress(nextProgress);
  }, [selectedBook, readerChapterIndex, readerPage, readerLanguage, readerStarted, readerIntroComplete]);

  const turnReaderPage = (direction: "forward" | "backward") => {
    if (pageTurnDirection || pendingPage !== null || readerPages.length < 2) return;
    const targetPage = direction === "forward" ? readerPage + 1 : readerPage - 1;
    if (targetPage < 0 || targetPage >= readerPages.length) return;
    setPendingPage(targetPage);
    setPageTurnDirection(direction);
  };

  const finishPageTurn = () => {
    if (pendingPage === null) return;
    setReaderPage(pendingPage);
    setPendingPage(null);
    setPageTurnDirection(null);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const selectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setQuery("");
    closeMobileMenu();
  };

  const openBookDetails = (book: OpenBook) => {
    setSelectedBook(null);
    navigate(`/book/${encodeURIComponent(book.id)}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const openReader = (book: OpenBook) => {
    const saved = readProgress(book.id);
    const chapters = (readerChaptersByBookId[book.id as keyof typeof readerChaptersByBookId] ?? []) as readonly ReaderChapter[];
    const savedForBook = saved?.bookId === book.id ? saved : null;
    const initialChapterIndex = savedForBook
      ? Math.min(savedForBook.chapterIndex, Math.max(0, chapters.length - 1))
      : 0;
    const initialLanguage = savedForBook?.language ?? "my";
    const initialChapter = chapters[initialChapterIndex];
    const initialContent = initialChapter
      ? (initialLanguage === "my" ? initialChapter.content : initialChapter.contentEn)
      : "";
    const initialPageCount = splitReaderPages(
      initialContent,
      initialLanguage === "my" ? 650 : 1300
    ).length;
    const initialPage = savedForBook
      ? Math.min(savedForBook.page, Math.max(0, initialPageCount - 1))
      : 0;
    setSelectedBook(book);
    setReaderChapterIndex(initialChapterIndex);
    setReaderPage(initialPage);
    setReaderLanguage(initialLanguage);
    setReaderStarted(true);
    setReaderIntroPage(0);
    const hasForeword = Boolean(book.authorForewordMy?.trim() || book.editorialForewordMy?.trim());
    setReaderIntroComplete(Boolean(savedForBook) || !hasForeword);
    setReaderFinished(false);
    setResumeAtSavedPage(Boolean(savedForBook));
  };

  return (
    <div className="site-shell" id="top">
      {!detailBook && (
        <>
        <div className="announcement"><Sparkles size={14} aria-hidden="true" /> {siteLanguage === "my" ? "အခမဲ့စာဖတ်ခြင်းမှ အသိပညာကမ္ဘာကို ဖွင့်လှစ်လိုက်ပါ" : "Open a wider world through free reading"}</div>
        <header className="site-header">
          <div className="header-inner">
            <a className="brand" href="#top" aria-label="THARi BOOKS ပင်မစာမျက်နှာ" onClick={closeMobileMenu}>
              <span className="brand-mark" aria-hidden="true"><BookOpen size={25} /></span>
              <span className="brand-wordmark"><strong>THARi BOOKS</strong><small>အသိပညာ · စာဖတ်ခြင်း · တိုးတက်မှု</small></span>
            </a>
            <nav className="desktop-nav" aria-label={siteLanguage === "my" ? "အဓိက လမ်းညွှန်" : "Main navigation"}>
              <a href={detailBook ? `${import.meta.env.BASE_URL}#general` : "#general"}>{ui.navCategories}</a>
              <a href={detailBook ? `${import.meta.env.BASE_URL}#featured` : "#featured"}>{ui.navBooks}</a>
              <a href={detailBook ? `${import.meta.env.BASE_URL}#about` : "#about"}>{ui.navAbout}</a>
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
            <a href={detailBook ? `${import.meta.env.BASE_URL}#general` : "#general"} onClick={closeMobileMenu}>{ui.navCategories}<ChevronRight size={15} /></a>
            <a href={detailBook ? `${import.meta.env.BASE_URL}#featured` : "#featured"} onClick={closeMobileMenu}>{ui.navBooks}<ChevronRight size={15} /></a>
            <a href={detailBook ? `${import.meta.env.BASE_URL}#about` : "#about"} onClick={closeMobileMenu}>{ui.navAbout}<ChevronRight size={15} /></a>
          </nav>
        </header>
        </>
      )}

      <main>
      {detailBook ? (
        <>
        <section className="book-cover-entry" aria-labelledby="book-detail-title">
          <a className="cover-entry-back" href={import.meta.env.BASE_URL}><ArrowRight size={17} /> {siteLanguage === "my" ? "စာအုပ်စာရင်းသို့ ပြန်သွားရန်" : "Back to the library"}</a>
          <button className="cover-entry-language" type="button" onClick={() => setSiteLanguage((language) => language === "my" ? "en" : "my")} aria-label="မြန်မာနှင့် English ဘာသာစကား ပြောင်းရန်"><Languages size={16} /><span>{siteLanguage === "my" ? "EN" : "မြန်မာ"}</span></button>
          <div className="cover-entry-content">
            <div className="cover-entry-art">
              <img src={getAssetPath(detailBook.coverImage)} alt={`${detailBook.title} — ${detailBook.author}`} decoding="async" />
            </div>
            <span className="cover-entry-kicker">THARi BOOKS · CLASSICS</span>
            <h1 id="book-detail-title">{siteLanguage === "my" ? detailBook.titleMy : detailBook.title}</h1>
            <p className="cover-entry-author">{detailBook.author}</p>
            {detailChapters.length > 0 ? (
              <button className="cover-entry-read" type="button" onClick={() => openReader(detailBook)}>
                {siteLanguage === "my" ? (detailProgress ? "ဆက်ဖတ်မယ်" : "ဖတ်မယ်") : (detailProgress ? "Continue reading" : "Start reading")} <BookOpen size={19} />
              </button>
            ) : (
              <a className="cover-entry-read" href={detailBook.sourceUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                {siteLanguage === "my" ? "မူရင်းစာအုပ် ဖတ်ရန်" : "Read the original"} <ArrowRight size={18} />
              </a>
            )}
            {detailProgress && detailChapters.length > 0 && (
              <p className="cover-entry-progress">{siteLanguage === "my" ? `နောက်ဆုံးဖတ်ထားသည် — အခန်း ${detailProgress.chapterIndex + 1}၊ စာမျက်နှာ ${detailProgress.page + 1}` : `Last read — Chapter ${detailProgress.chapterIndex + 1}, page ${detailProgress.page + 1}`}</p>
            )}
          </div>
        </section>
        <section className="book-detail-content section-pad" aria-label={siteLanguage === "my" ? "စာအုပ်အသေးစိတ်" : "Book details"}>
          <section className="detail-overview" id="book-overview">
            <span className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> {siteLanguage === "my" ? "စာအုပ်မိတ်ဆက်" : "BOOK OVERVIEW"}</span>
            <h2>{siteLanguage === "my" ? "ဒီစာအုပ်အကြောင်း" : "About this book"}</h2>
            <p>{siteLanguage === "my" ? detailBook.synopsisMy : detailBook.descriptionEn}</p>
            {siteLanguage === "my" && detailBook.keyIdeasMy.length > 0 && <><h3>အဓိက မှတ်သားစရာများ</h3><ul className="detail-key-ideas">{detailBook.keyIdeasMy.map((idea, index) => <li key={index}>{idea}</li>)}</ul></>}
            <p className="detail-rights-note"><ShieldCheck size={15} /> {detailBook.rightsNote}</p>
            <div className="book-detail-facts"><span>{detailBook.language}</span><span>{detailBook.source}</span><span>{siteLanguage === "my" ? "အခမဲ့" : "Free access"}</span></div>
            {detailBook.sourceUrl && <a className="detail-source-link" href={detailBook.sourceUrl} target="_blank" rel="noopener noreferrer">{siteLanguage === "my" ? "မူရင်းစာအုပ်ရင်းမြစ် ဖွင့်ရန်" : "Open original source"} <ArrowUpRight size={15} /></a>}
          </section>
          <section className="detail-chapters">
            <span className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> READING GUIDE</span>
            <h2>{siteLanguage === "my" ? "အခန်းစာရင်း" : "Chapters"}</h2>
            {detailChapters.length > 0 ? <div className="detail-chapter-list">{detailChapters.map((chapter, index) => <button type="button" className="detail-chapter-item" key={`${chapter.number}-${chapter.title}`} onClick={() => { openReader(detailBook); setReaderChapterIndex(index); setReaderPage(0); }}><span className="detail-chapter-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{siteLanguage === "my" ? chapter.title : chapter.titleEn ?? `Chapter ${chapter.number}`}</strong><small>{siteLanguage === "my" ? `အခန်း ${index + 1}` : `Chapter ${index + 1}`}</small></span><ArrowUpRight size={17} /></button>)}</div> : <div className="detail-external-note"><BookOpen size={19} /><p>{siteLanguage === "my" ? "ဤစာအုပ်၏ အခန်းများကို THARi Reader ထဲတွင် မထည့်သွင်းရသေးပါ။ မူရင်းစာအုပ်ကို အခမဲ့ဖတ်ရှုရန် အပေါ်ရှိ မူရင်းရင်းမြစ်လင့်ခ်ကို အသုံးပြုနိုင်ပါတယ်။" : "Chapters for this title are not yet available in the THARi reader. Use the original-source link above to read the book."}</p></div>}
          </section>
        </section>
        </>
      ) : (<>
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
                <img src={getAssetPath("images/library-hero-luxury.jpg")} alt={siteLanguage === "my" ? "စာအုပ်စင်များနှင့် သဘာဝအလင်းရောင်ရှိသော စာဖတ်ခန်း" : "A sunlit reading room with shelves of books"} />
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
              <span><small>{ui.lastRead}</small><strong>{ui.continueReading}</strong><em>{lastReadBook.titleMy} · {ui.chapter} {(resumeProgress?.chapterIndex ?? 0) + 1} · {ui.page} {(resumeProgress?.page ?? 0) + 1}</em></span>
              <ArrowRight size={18} />
            </button>
          )}
          <div className="book-grid">
            {visibleBooks.map((book, index) => {
              const category = openBookCategories.find((item) => item.id === book.categoryId);
              return (
                <article className="book-card" key={book.id}>
                  <div className={`book-cover cover-${["blue", "gold", "green", "rose"][index % 4]}`}>
                    <img className="book-cover-image" src={getAssetPath(book.coverImage)} alt={`${book.title} — ${book.author}`} loading="lazy" decoding="async" fetchPriority="low" />
                    <div className="book-cover-overlay" aria-hidden="true" />
                    <div className="cover-topline"><span>THARi · FREE LINK</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <div className="cover-bottomline"><span>{book.author}</span><span className="cover-seal">T</span></div>
                  </div>
                  <div className="book-meta"><div><span className="book-category">{siteLanguage === "my" ? category?.titleMy : category?.titleEn} · {book.language}</span><h3>{siteLanguage === "my" ? book.titleMy : book.title}</h3></div><span className="book-demo-tag">{ui.freeLabel}</span></div>
                  <p className={`book-description ${siteLanguage === "en" ? "book-description-en" : ""}`}>{siteLanguage === "my" ? book.descriptionMy : book.descriptionEn}</p>
                  <div className="book-actions">
                    <button className="read-button" type="button" onClick={() => openBookDetails(book)}>{siteLanguage === "my" ? "စာအုပ်အကြောင်း ကြည့်ရန်" : "View book details"} <BookOpen size={16} /></button>
                    {book.sourceUrl && <a className="read-button read-original" href={book.sourceUrl} target="_blank" rel="noopener noreferrer">{ui.originalEnglish} <ArrowUpRight size={16} /></a>}
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

      </>)}
        {selectedBook && (
          <div className="reader-fullscreen-backdrop">
            <section ref={readerDialogRef} className="reader-fullscreen" role="dialog" aria-modal="true" aria-labelledby="reader-title" tabIndex={-1}>
              <header className="reader-topbar">
                <button className="reader-topbar-button" type="button" onClick={() => setSelectedBook(null)} aria-label={ui.close}><X size={21} /></button>
                <div className="reader-topbar-title"><strong>THARi BOOKS</strong><span>{siteLanguage === "my" ? selectedBook.titleMy : selectedBook.title}</span></div>
                {readerStarted && !readerFinished && (
                  <button className="reader-topbar-button reader-language-quick" type="button" onClick={() => { setReaderLanguage((language) => language === "my" ? "en" : "my"); setReaderPage(0); setReaderIntroPage(0); }} aria-label="Change reading language"><Languages size={19} /></button>
                )}
              </header>

              {!readerStarted ? (
                <section className="reader-cover-screen">
                  <div className="reader-cover-frame">
                    <img src={getAssetPath(selectedBook.coverImage)} alt={`${selectedBook.title} — ${selectedBook.author}`} decoding="async" />
                  </div>
                  <p className="reader-cover-kicker">THARi BOOKS · CLASSIC LIBRARY</p>
                  <h1 id="reader-title">{siteLanguage === "my" ? selectedBook.titleMy : selectedBook.title}</h1>
                  <p className="reader-cover-author">{selectedBook.author}</p>
                  <button className="reader-start-button" type="button" onClick={() => { setReaderStarted(true); setReaderIntroComplete(resumeAtSavedPage || readerForewordPages.length === 0); setReaderFinished(false); }}>{siteLanguage === "my" ? (detailProgress ? "ဆက်ဖတ်မယ်" : "ဖတ်မယ်") : (detailProgress ? "Continue reading" : "Start reading")} <BookOpen size={18} /></button>
                  <p className="reader-cover-hint">{siteLanguage === "my" ? "စာအုပ်ကို စာမျက်နှာတစ်မျက်နှာချင်း ဖတ်ရှုနိုင်ပါသည်" : "Read one page at a time"}</p>
                </section>
              ) : readerFinished ? (
                <section className="reader-finish-screen">
                  <BookOpen size={42} />
                  <p className="reader-cover-kicker">THE END</p>
                  <h1>{siteLanguage === "my" ? "စာအုပ်ဖတ်ရှုပြီးပါပြီ" : "You’ve reached the end"}</h1>
                  <p>{siteLanguage === "my" ? "ဒီစာအုပ်ကို အဆုံးထိ ဖတ်ရှုပြီးပါပြီ။" : "You have reached the final page of this book."}</p>
                  <button className="reader-start-button" type="button" onClick={() => { setReaderFinished(false); setReaderChapterIndex(0); setReaderPage(0); setReaderIntroPage(0); setReaderIntroComplete(false); }}>{siteLanguage === "my" ? "အစမှ ပြန်ဖတ်မယ်" : "Read again"} <BookOpen size={18} /></button>
                </section>
              ) : !readerIntroComplete && readerForewordPages.length > 0 ? (
                <section className="reader-page-screen">
                  <div className="reader-page-paper">
                    <div className="reader-page-running-head"><span>THARi BOOKS</span><span>{readerLanguage === "my" ? "အမှာစကား" : "FOREWORD"}</span></div>
                    <h1>{readerForewordPages[readerIntroPage]?.title}</h1>
                    <p className={`reader-page-prose ${readerLanguage === "en" ? "reader-chapter-en" : ""}`}>{readerForewordPages[readerIntroPage]?.content}</p>
                    <span className="reader-page-folio">{readerIntroPage + 1}</span>
                  </div>
                  <div className="reader-bottom-controls">
                    <button type="button" disabled={readerIntroPage === 0} onClick={() => setReaderIntroPage((page) => Math.max(0, page - 1))}>{ui.previousPage}</button>
                    <span>{readerIntroPage + 1} / {readerForewordPages.length}</span>
                    <button type="button" onClick={() => {
                      if (readerIntroPage < readerForewordPages.length - 1) setReaderIntroPage((page) => page + 1);
                      else { setReaderIntroComplete(true); setReaderPage(0); }
                    }}>{readerIntroPage === readerForewordPages.length - 1 ? (siteLanguage === "my" ? "စာအုပ်စဖတ်မယ်" : "Begin the book") : ui.nextPage}</button>
                  </div>
                </section>
              ) : readerChapters.length > 0 && activeChapter ? (
                <section className="reader-page-screen">
                  <div className="reader-reading-meta">
                    <span>{readerLanguage === "my" ? activeChapter.title : activeChapter.titleEn ?? `Chapter ${activeChapter.number}`}</span>
                    <span>{ui.chapter} {readerChapterIndex + 1} / {readerChapters.length}</span>
                  </div>
                  {activeChapter.illustration && readerPage === 0 && (
                    <figure className="reader-illustration">
                      <img src={getAssetPath(activeChapter.illustration.src)} alt={readerLanguage === "my" ? activeChapter.illustration.altMy : activeChapter.illustration.altEn} />
                      <figcaption>{readerLanguage === "my" ? activeChapter.illustration.captionMy : activeChapter.illustration.captionEn}</figcaption>
                    </figure>
                  )}
                  <div className="reader-page-paper reader-chapter-paper">
                    <div className="reader-page-running-head"><span>THARi BOOKS</span><span>{readerLanguage === "my" ? "စာဖတ်ခန်း" : "READING ROOM"}</span></div>
                    <h1>{readerLanguage === "en" ? activeChapter.titleEn ?? `Chapter ${activeChapter.number}` : activeChapter.title}</h1>
                    <p className={`reader-page-prose ${readerLanguage === "en" ? "reader-chapter-en" : ""}`}>{readerPages[pendingPage ?? readerPage] ?? ""}</p>
                    <span className="reader-page-folio">{(pendingPage ?? readerPage) + 1}</span>
                    {pendingPage !== null && pageTurnDirection && (
                      <div
                        key={`${readerChapterIndex}-${readerPage}-${pendingPage}-${pageTurnDirection}`}
                        className={`reader-page-turn-overlay ${pageTurnDirection === "forward" ? "turn-forward" : "turn-backward"}`}
                        aria-hidden="true"
                        onAnimationEnd={finishPageTurn}
                      >
                        <div className="reader-page-running-head"><span>THARi BOOKS</span><span>{readerLanguage === "my" ? "စာဖတ်ခန်း" : "READING ROOM"}</span></div>
                        <h1>{readerLanguage === "en" ? activeChapter.titleEn ?? `Chapter ${activeChapter.number}` : activeChapter.title}</h1>
                        <p className={`reader-page-prose ${readerLanguage === "en" ? "reader-chapter-en" : ""}`}>{readerPages[readerPage] ?? ""}</p>
                        <span className="reader-page-folio">{readerPage + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="reader-bottom-controls">
                    <button type="button" onClick={() => {
                      if (readerPage > 0) turnReaderPage("backward");
                      else if (readerChapterIndex > 0) {
                        const previousIndex = readerChapterIndex - 1;
                        setReaderChapterIndex(previousIndex);
                        setReaderPage(splitReaderPages(readerLanguage === "my" ? readerChapters[previousIndex].content : readerChapters[previousIndex].contentEn, readerLanguage === "my" ? 650 : 1300).length - 1);
                      } else if (readerForewordPages.length > 0) {
                        setReaderIntroComplete(false);
                        setReaderIntroPage(readerForewordPages.length - 1);
                      }
                    }}>{ui.previousPage}</button>
                    <span>{readerPage + 1} / {readerPages.length}</span>
                    <button type="button" onClick={() => {
                      if (readerPage < readerPages.length - 1) turnReaderPage("forward");
                      else if (readerChapterIndex < readerChapters.length - 1) {
                        setReaderChapterIndex((index) => index + 1);
                        setReaderPage(0);
                      } else setReaderFinished(true);
                    }}>{readerPage === readerPages.length - 1 && readerChapterIndex === readerChapters.length - 1 ? (siteLanguage === "my" ? "ပြီးဆုံးမယ်" : "Finish") : ui.nextPage}</button>
                  </div>
                  <div className="reader-bottom-note">
                    <span>{activeChapter.readingType === "summary" ? ui.abridgedNote : ui.translationNote}</span>
                    <span>{readerLanguage === "my" ? "မြန်မာ" : "English"}</span>
                  </div>
                </section>
              ) : (
                <section className="reader-finish-screen">
                  <BookOpen size={42} />
                  <h1>{siteLanguage === "my" ? "ဖတ်ရှုရန် အကြောင်းအရာ မရှိသေးပါ" : "Reading content is not available yet"}</h1>
                  <p>{siteLanguage === "my" ? "ဤစာအုပ်အတွက် THARi Reader အကြောင်းအရာ မထည့်သွင်းရသေးပါ။" : "THARi Reader content has not been added for this book yet."}</p>
                  {selectedBook.sourceUrl && <a className="reader-start-button" href={selectedBook.sourceUrl} target="_blank" rel="noopener noreferrer">{ui.sourceBook} <ArrowUpRight size={18} /></a>}
                </section>
              )}
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
