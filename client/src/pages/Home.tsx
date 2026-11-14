import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, FlaskConical, Globe2, History, Lightbulb, Search, Sparkles, X } from "lucide-react";
import { openBooks, openBookCategories } from "../data/openBooks";
import { prideAndPrejudiceChaptersMy } from "../data/translations/prideAndPrejudice";

const categoryIcons = [BookOpen, BriefcaseBusiness, FlaskConical, History, Lightbulb, Globe2];
const categoryTones = ["rose", "gold", "green", "rose", "gold", "blue"];

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

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<(typeof openBooks)[number] | null>(null);
  const [readerLanguage, setReaderLanguage] = useState<"my" | "en">("my");
  const [readerPage, setReaderPage] = useState(0);
  const activeChapter = prideAndPrejudiceChaptersMy[0];
  const readerContent = readerLanguage === "my" ? activeChapter.content : activeChapter.contentEn;
  const readerPages = useMemo(() => splitReaderPages(readerContent), [readerContent]);
  const normalizedQuery = query.normalize("NFC").trim().toLocaleLowerCase();

  const categories = openBookCategories.filter((category) =>
    openBooks.some((book) => book.categoryId === category.id),
  );

  const visibleCategories = categories.filter((category) =>
    (category.titleEn + " " + category.titleMy).normalize("NFC").toLocaleLowerCase().includes(normalizedQuery),
  );

  const visibleBooks = useMemo(() => openBooks.filter((book) => {
    const matchesCategory = !selectedCategory || book.categoryId === selectedCategory;
    const searchable = [book.title, book.titleMy, book.author, book.categoryMy, book.descriptionMy].join(" ").normalize("NFC").toLocaleLowerCase();
    return matchesCategory && searchable.includes(normalizedQuery);
  }), [normalizedQuery, selectedCategory]);

  return (
    <div className="site-shell" id="top">
      <div className="announcement"><Sparkles size={14} aria-hidden="true" /> အခမဲ့စာဖတ်ခြင်းမှ အသိပညာကမ္ဘာကို ဖွင့်လှစ်လိုက်ပါ</div>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="THARi BOOKS ပင်မစာမျက်နှာ">
            <span className="brand-mark" aria-hidden="true"><BookOpen size={25} /></span>
            <span className="brand-wordmark"><strong>THARi BOOKS</strong><small>အသိပညာ · စာဖတ်ခြင်း · တိုးတက်မှု</small></span>
          </a>
          <nav className="desktop-nav" aria-label="အဓိက လမ်းညွှန်">
            <a href="#general">စာအုပ်အမျိုးအစားများ</a>
            <a href="#featured">အခမဲ့စာအုပ်များ</a>
            <a href="#about">THARi အကြောင်း</a>
          </nav>
          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="စာအုပ်၊ စာရေးသူ၊ အမျိုးအစား ရှာရန်…" aria-label="စာအုပ်ရှာရန်" />
          </label>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> DIGITAL LIBRARY · မြန်မာစာဖတ်သူများအတွက်</div>
              <h1 id="hero-title">အသိပညာရဲ့<br /><span>ကမ္ဘာသစ်ဆီသို့</span></h1>
              <p className="hero-description">အခမဲ့ဖတ်ရှုနိုင်သော ဂန္ထဝင်စာအုပ်များကို အမျိုးအစားအလိုက် ရှာဖွေဖတ်ရှုနိုင်သော ဒစ်ဂျစ်တယ်စာကြည့်တိုက်။</p>
              <div className="hero-actions">
                <a className="button-primary" href="#featured">အခမဲ့စာအုပ်များ ရှာဖွေမယ် <ArrowRight size={17} /></a>
                <a className="button-text" href="#about">THARi အကြောင်း <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-note"><span className="note-dot" /> စာဖတ်သူတိုင်းအတွက် အခမဲ့ဖတ်ရှုနိုင်သော လင့်ခ်များ</div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src={import.meta.env.BASE_URL + "images/library-hero.svg"} alt="စာအုပ်စင်များနှင့် သဘာဝအလင်းရောင်ရှိသော စာဖတ်ခန်း" />
                <div className="hero-image-caption"><BookOpen size={17} /><span>စာမျက်နှာတိုင်းတွင်<br /><strong>အခွင့်အလမ်းသစ်</strong></span></div>
              </div>
              <div className="hero-stamp" aria-hidden="true"><span>READ</span><BookOpen size={23} /><span>GROW</span></div>
              <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
              <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            </div>
          </div>
          <a className="scroll-cue" href="#general"><span>အမျိုးအစားများကို ကြည့်ရန်</span><ArrowRight size={15} /></a>
        </section>

        <section className="general-section section-pad" id="general" aria-labelledby="general-title">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> EXPLORE YOUR INTERESTS</div>
              <h2 id="general-title">စာအုပ် <span>အမျိုးအစားများ</span></h2>
              <p className="section-intro">စိတ်ဝင်စားရာ အမျိုးအစားကို ရွေးပြီး အခမဲ့စာအုပ်များကို ရှာဖွေပါ။</p>
            </div>
            <span className="category-count">{categories.length.toString().padStart(2, "0")} အမျိုးအစား</span>
          </div>
          <div className="category-grid">
            {visibleCategories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length];
              return (
                <button className="category-card" type="button" key={category.id} onClick={() => { setSelectedCategory(category.id); setQuery(""); }}>
                  <span className={"category-icon tone-" + categoryTones[index % categoryTones.length]}><Icon size={21} strokeWidth={1.7} /></span>
                  <span className="category-text"><strong>{category.titleEn}</strong><small>{category.titleMy}</small></span>
                  <span className="category-index">0{index + 1}</span>
                  <ArrowUpRight className="category-arrow" size={17} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </section>

        <section className="featured-section section-pad" id="featured" aria-labelledby="featured-title">
          <div className="section-heading featured-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> FREE READING LINKS</div>
              <h2 id="featured-title">အခမဲ့ <span>စာအုပ်များ</span></h2>
              <p className="section-intro">{selectedCategory ? "ရွေးချယ်ထားသော အမျိုးအစားမှ စာအုပ်များ" : "မူရင်းစာကြည့်တိုက်တွင် အခမဲ့ဖတ်ရှုနိုင်သော ဂန္ထဝင်စာအုပ်များ။"}</p>
            </div>
            <button className="section-link" type="button" onClick={() => setSelectedCategory(null)}>အားလုံးကြည့်ရန် <ArrowUpRight size={16} /></button>
          </div>
          <div className="book-grid">
            {visibleBooks.map((book, index) => (
              <article className="book-card" key={book.id}>
                <div className={"book-cover " + ["cover-blue", "cover-gold", "cover-green", "cover-rose"][index % 4]}>
                  <div className="cover-topline"><span>THARi · FREE LINK</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <div className="cover-art" aria-hidden="true"><span className="cover-orbit" /><BookOpen size={46} strokeWidth={1.05} /></div>
                  <div className="cover-title">{book.titleMy}</div>
                  <div className="cover-bottomline"><span>{book.author}</span><span className="cover-seal">T</span></div>
                </div>
                <div className="book-meta"><div><span className="book-category">{book.categoryMy} · အင်္ဂလိပ်ဘာသာ · {book.title}</span><h3>{book.titleMy}</h3></div><span className="book-demo-tag">FREE</span></div>
                <p className="book-description">{book.descriptionMy}</p>
                <div className="book-actions">
                  <button className="read-button" type="button" onClick={() => { setSelectedBook(book); setReaderLanguage("my"); setReaderPage(0); }}>{book.id === "pride-and-prejudice" ? "မြန်မာဘာသာပြန်အခန်းဖတ်ရန်" : "မြန်မာအကျဉ်းချုပ်ဖတ်ရန်"} <BookOpen size={16} /></button>
                  <a className="read-button read-original" href={book.sourceUrl} target="_blank" rel="noopener noreferrer">English မူရင်း <ArrowUpRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
          {visibleBooks.length === 0 && (
            <div className="empty-search" role="status" aria-live="polite"><Search size={20} /><span>ရှာဖွေမှုနှင့် ကိုက်ညီသော စာအုပ်မတွေ့ပါ။</span><button type="button" onClick={() => { setSelectedCategory(null); setQuery(""); }}>အားလုံးကြည့်ရန်</button></div>
          )}
          <p className="search-hint">စာအုပ်များကို Project Gutenberg မူရင်းစာမျက်နှာတွင် အခမဲ့ဖတ်ရှုနိုင်သည်။ THARi BOOKS တွင် စာအုပ်ဖိုင်များကို ကူးယူတင်ထားခြင်း မဟုတ်ပါ။ မူပိုင်ခွင့်နှင့် ပြန်လည်ဖြန့်ဝေခွင့်သည် နိုင်ငံအလိုက် ကွဲပြားနိုင်သည်။</p>
        </section>

        <section className="closing-note" id="about">
          <div className="closing-mark"><BookOpen size={25} /></div>
          <div><span className="eyebrow eyebrow-dark">A LIBRARY FOR EVERYONE</span><h2>စာဖတ်ခြင်းက <em>ဒီနေရာက</em> စတင်ပါတယ်။</h2><p>THARi BOOKS — မြန်မာစာဖတ်သူတိုင်းအတွက် အခမဲ့စာဖတ်နိုင်သော ရင်းမြစ်များကို စုစည်းပေးသော ဒစ်ဂျစ်တယ်စာကြည့်တိုက်။</p></div>
          <a className="closing-link" href="#top" aria-label="စာမျက်နှာအပေါ်သို့ ပြန်သွားရန်"><ArrowUpRight size={20} /></a>
        </section>
      {selectedBook && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedBook(null); }}>
          <section className="demo-dialog burmese-reader" role="dialog" aria-modal="true" aria-labelledby="reader-title">
            <button className="dialog-close" type="button" onClick={() => setSelectedBook(null)} aria-label="ပိတ်ရန်"><X size={19} /></button>
            <span className="demo-label"><BookOpen size={13} /> THARi BOOKS · မြန်မာ / English</span>
            <h2 id="reader-title">{selectedBook.titleMy}</h2>
            <p className="dialog-subtitle">{selectedBook.title} · {selectedBook.author}</p>
            {selectedBook.id === "pride-and-prejudice" ? (
              <div className="reader-full-translation">
                <div className="reader-language-switch" role="group" aria-label="စာဖတ်ဘာသာစကား ရွေးချယ်ရန်">
                  <button type="button" className={readerLanguage === "my" ? "is-active" : ""} aria-pressed={readerLanguage === "my"} onClick={() => { setReaderLanguage("my"); setReaderPage(0); }}>မြန်မာ</button>
                  <button type="button" className={readerLanguage === "en" ? "is-active" : ""} aria-pressed={readerLanguage === "en"} onClick={() => { setReaderLanguage("en"); setReaderPage(0); }}>English</button>
                </div>
                <section className="reader-page">
                  <div className="reader-page-heading">
                    <h3>{activeChapter.title}</h3>
                    <span>{readerLanguage === "my" ? "စာမျက်နှာ" : "Page"} {readerPage + 1} / {readerPages.length}</span>
                  </div>
                  <p className={"reader-chapter " + (readerLanguage === "en" ? "reader-chapter-en" : "")}>{readerPages[readerPage] ?? ""}</p>
                </section>
                <div className="reader-pagination">
                  <button type="button" disabled={readerPage === 0} onClick={() => setReaderPage((page) => Math.max(0, page - 1))}>ယခင်စာမျက်နှာ</button>
                  <span>{readerPage + 1} / {readerPages.length}</span>
                  <button type="button" disabled={readerPage >= readerPages.length - 1} onClick={() => setReaderPage((page) => Math.min(readerPages.length - 1, page + 1))}>နောက်စာမျက်နှာ</button>
                </div>
                <p className="reader-note">{readerLanguage === "my" ? "မြန်မာဘာသာပြန် — အခန်း (၁)။ ကျန်အခန်းများကို ဆက်လက်ဖြည့်သွင်းနေဆဲဖြစ်သည်။" : "English original — Chapter I. Original text source: Project Gutenberg."}</p>
              </div>
            ) : (
              <>
                <h3>စာအုပ်အကြောင်း မြန်မာလို</h3>
                <p>{selectedBook.synopsisMy}</p>
                <h3>အဓိက မှတ်သားစရာများ</h3>
                <ul className="reader-ideas">{selectedBook.keyIdeasMy.map((idea, index) => <li key={index}>{idea}</li>)}</ul>
                <p className="reader-note">{selectedBook.readingNoteMy}</p>
              </>
            )}
            <a className="read-button reader-source" href={selectedBook.sourceUrl} target="_blank" rel="noopener noreferrer">English မူရင်းစာအုပ် ဖတ်ရန် <ArrowUpRight size={16} /></a>
          </section>
        </div>
      )}
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-col">
            <a className="brand brand-footer" href="#top"><span className="brand-mark"><BookOpen size={25} /></span><span className="brand-wordmark"><strong>THARi BOOKS</strong><small>အသိပညာ · စာဖတ်ခြင်း · တိုးတက်မှု</small></span></a>
            <p>အခမဲ့စာအုပ်များနှင့် မူရင်းစာကြည့်တိုက်များဆီသို့ လမ်းညွှန်ပေးသည်။</p>
          </div>
          <div className="footer-links"><div><h2>စာဖတ်ရန်</h2><a href="#general">စာအုပ်အမျိုးအစားများ</a><a href="#featured">အခမဲ့စာအုပ်များ</a></div><div><h2>ရင်းမြစ်</h2><a href="https://www.gutenberg.org/" target="_blank" rel="noopener noreferrer">Project Gutenberg</a><a href="https://www.gutenberg.org/policy/terms_of_use.html" target="_blank" rel="noopener noreferrer">အသုံးပြုမှုစည်းမျဉ်း</a></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} THARi BOOKS · Free Reading Directory</span><span className="footer-note"><span className="footer-dot" /> အခမဲ့ဖတ်ရှုနိုင်သော ပြင်ပလင့်ခ်များ</span></div>
      </footer>
    </div>
  );
}
