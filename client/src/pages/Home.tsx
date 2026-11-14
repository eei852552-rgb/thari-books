import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  BriefcaseBusiness,
  Check,
  FlaskConical,
  Globe2,
  GraduationCap,
  History,
  Languages,
  Lightbulb,
  Menu,
  Monitor,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type IconType = typeof BookOpen;

type Category = {
  title: string;
  subtitle: string;
  icon: IconType;
  tone: string;
};

type DemoBook = {
  title: string;
  subtitle: string;
  description: string;
  palette: string;
  mark: string;
};

type SiteNotice = {
  title: string;
  description: string;
};

const gradeGroups = [
  { name: "KG", label: "သူငယ်တန်း", grades: ["KG"] },
  { name: "Primary", label: "မူလတန်း", grades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"] },
  { name: "Middle", label: "အလယ်တန်း", grades: ["Grade 6", "Grade 7", "Grade 8", "Grade 9"] },
  { name: "High School", label: "အထက်တန်း", grades: ["Grade 10", "Grade 11", "Grade 12"] },
];

const categories: Category[] = [
  { title: "Technology", subtitle: "နည်းပညာ", icon: Monitor, tone: "blue" },
  { title: "Business", subtitle: "စီးပွားရေး", icon: BriefcaseBusiness, tone: "gold" },
  { title: "Science", subtitle: "သိပ္ပံ", icon: FlaskConical, tone: "green" },
  { title: "History", subtitle: "သမိုင်း", icon: History, tone: "rose" },
  { title: "Language Learning", subtitle: "ဘာသာစကား", icon: Languages, tone: "purple" },
  { title: "Personal Development", subtitle: "ကိုယ်ရည်ကိုယ်သွေး", icon: Lightbulb, tone: "gold" },
  { title: "Stories & Fiction", subtitle: "ဝတ္ထုနှင့် ပုံပြင်", icon: BookOpen, tone: "rose" },
  { title: "General Knowledge", subtitle: "အထွေထွေဗဟုသုတ", icon: Globe2, tone: "green" },
];

const demoBooks: DemoBook[] = [
  {
    title: "သိပ္ပံ စူးစမ်းလေ့လာမှု",
    subtitle: "Science · Demo",
    description: "သိပ္ပံကို စူးစမ်းလိုစိတ်ဖြင့် စတင်လေ့လာနိုင်ရန် စိတ်ကူးဖြင့် ဖန်တီးထားသော နမူနာစာအုပ်ကတ်ဖြစ်သည်။ အမှန်တကယ် စာအုပ်အကြောင်းအရာ မပါဝင်သေးပါ။",
    palette: "cover-blue",
    mark: "01",
  },
  {
    title: "နေ့စဉ် အတွေးအမြင်",
    subtitle: "Personal Development · Demo",
    description: "နေ့စဉ်တိုးတက်မှုဆိုင်ရာ ခေါင်းစဉ်ကို ပြသရန် ဖန်တီးထားသော နမူနာဒီဇိုင်းဖြစ်သည်။ အမှန်တကယ် ထုတ်ဝေထားသော စာအုပ်ကို ကိုယ်စားမပြုပါ။",
    palette: "cover-gold",
    mark: "02",
  },
  {
    title: "ကမ္ဘာ့ပုံပြင်များ",
    subtitle: "Stories & Fiction · Demo",
    description: "စာဖတ်သူများအတွက် ပုံပြင်အမျိုးအစားကို ပြသသည့် နမူနာကတ်သာ ဖြစ်ပါသည်။ အမှန်တကယ် စာအုပ်အကြောင်းအရာကို နောက်အဆင့်တွင် ထည့်သွင်းနိုင်သည်။",
    palette: "cover-green",
    mark: "03",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M5 8.5c5.2-.9 10.2.2 15 3.5v20c-4.8-3.2-9.8-4.4-15-3.5v-20Z" fill="currentColor" />
        <path d="M35 8.5c-5.2-.9-10.2.2-15 3.5v20c4.8-3.2 9.8-4.4 15-3.5v-20Z" fill="currentColor" opacity=".72" />
        <path d="M20 12v20" stroke="#CBA75B" strokeWidth="2" />
        <path d="M10 14.5c2 .1 3.6.5 5 1.2M10 19c2 .1 3.6.5 5 1.2M30 14.5c-2 .1-3.6.5-5 1.2M30 19c-2 .1-3.6.5-5 1.2" stroke="#fff" strokeOpacity=".74" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand${footer ? " brand-footer" : ""}`} href="#top" aria-label="THARi BOOKS — ပင်မစာမျက်နှာ">
      <BrandMark />
      <span className="brand-wordmark">
        <strong>THARi BOOKS</strong>
        <small>အသိပညာ · စာဖတ်ခြင်း · တိုးတက်မှု</small>
      </span>
    </a>
  );
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="search-box">
      <Search size={18} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="စာအုပ်၊ အတန်း၊ အမျိုးအစား ရှာရန်…"
        aria-label="စာအုပ်၊ အတန်း၊ အမျိုးအစား ရှာဖွေရန်"
      />
      <kbd aria-hidden="true">⌕</kbd>
    </label>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<DemoBook | null>(null);
  const [siteNotice, setSiteNotice] = useState<SiteNotice | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setSelectedBook(null);
      setSiteNotice(null);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase();

  const visibleCategories = useMemo(
    () => categories.filter((category) => `${category.title} ${category.subtitle}`.toLocaleLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const visibleBooks = useMemo(
    () => demoBooks.filter((book) => `${book.title} ${book.subtitle} ${book.description}`.toLocaleLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const visibleGrades = useMemo(
    () => gradeGroups.map((group) => ({
      ...group,
      grades: group.grades.filter((grade) => `${grade} ${group.name} ${group.label}`.toLocaleLowerCase().includes(normalizedQuery)),
    })).filter((group) => group.grades.length > 0),
    [normalizedQuery],
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-shell" id="top">
      <div className="announcement"><Sparkles size={14} aria-hidden="true" /> စာဖတ်ခြင်းမှတစ်ဆင့် အသိပညာကမ္ဘာကို ဖွင့်လှစ်လိုက်ပါ</div>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={`desktop-nav${menuOpen ? " nav-open" : ""}`} aria-label="အဓိက လမ်းညွှန်">
            <a href="#education" onClick={closeMenu}>ပညာရေးစာကြည့်တိုက်</a>
            <a href="#general" onClick={closeMenu}>အထွေထွေစာကြည့်တိုက်</a>
            <a href="#featured" onClick={closeMenu}>အထူးရွေးချယ်မှု</a>
          </nav>
          <div className="header-actions">
            <SearchBox value={query} onChange={setQuery} />
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "မီနူးပိတ်ရန်" : "မီနူးဖွင့်ရန်"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="မိုဘိုင်း လမ်းညွှန်" aria-hidden={!menuOpen} inert={!menuOpen}>
          <a href="#education" onClick={closeMenu}>ပညာရေးစာကြည့်တိုက် <ArrowUpRight size={16} /></a>
          <a href="#general" onClick={closeMenu}>အထွေထွေစာကြည့်တိုက် <ArrowUpRight size={16} /></a>
          <a href="#featured" onClick={closeMenu}>အထူးရွေးချယ်မှု <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> DIGITAL LIBRARY · မြန်မာစာဖတ်သူများအတွက်</div>
              <h1 id="hero-title">အသိပညာရဲ့<br /><span>ကမ္ဘာသစ်ဆီသို့</span></h1>
              <p className="hero-description">ပညာရေးမှသည် အထွေထွေဗဟုသုတအထိ — စူးစမ်းလေ့လာဖို့၊ သင်ယူဖို့နဲ့ စာဖတ်ပျော်ရွှင်ဖို့ အားလုံးကို တစ်နေရာတည်းမှာ ရှာဖွေလိုက်ပါ။</p>
              <div className="hero-actions">
                <a className="button-primary" href="#education">စာအုပ်များ ရှာဖွေမယ် <ArrowRight size={17} /></a>
                <a className="button-text" href="#about">THARi အကြောင်း <ArrowUpRight size={16} /></a>
              </div>
              <div className="hero-note"><span className="note-dot" /> ကျောင်းသား၊ ဆရာ၊ မိဘနှင့် စာဖတ်သူတိုင်းအတွက်</div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src={`${import.meta.env.BASE_URL}images/library-hero.svg`} alt="စာအုပ်စင်များနှင့် သဘာဝအလင်းရောင်ရှိသော စာဖတ်ခန်း" />
                <div className="hero-image-caption"><BookOpen size={17} /><span>စာမျက်နှာတိုင်းတွင်<br /><strong>အခွင့်အလမ်းသစ်</strong></span></div>
              </div>
              <div className="hero-stamp" aria-hidden="true"><span>READ</span><BookMarked size={23} /><span>GROW</span></div>
              <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
              <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            </div>
          </div>
          <a className="scroll-cue" href="#education"><span>စူးစမ်းလေ့လာရန်</span><ArrowDown size={15} /></a>
        </section>

        <section className="education-section section-pad" id="education" aria-labelledby="education-title">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> LEARN BY GRADE</div>
              <h2 id="education-title">ပညာရေး <span>စာကြည့်တိုက်</span></h2>
              <p className="section-intro">KG မှ အထက်တန်းအထိ — သင်ယူမှုအဆင့်တိုင်းအတွက် နေရာတစ်ခု။</p>
            </div>
            <a className="section-link" href="#featured">နမူနာစာအုပ်များ <ArrowUpRight size={16} /></a>
          </div>
          <div className="grade-groups">
            {visibleGrades.map((group, index) => (
              <article className={`grade-group grade-group-${index + 1}`} key={group.name}>
                <div className="grade-group-heading">
                  <span className="grade-icon"><GraduationCap size={18} /></span>
                  <div><h3>{group.name}</h3><p>{group.label}</p></div>
                  <span className="grade-count">{group.grades.length.toString().padStart(2, "0")}</span>
                </div>
                <div className={`grade-list${group.grades.length === 1 ? " single-grade" : ""}`}>
                  {group.grades.map((grade) => (
                    <a className="grade-card" href="#featured" key={grade} aria-label={`${grade} နမူနာအကြောင်းအရာများကို ကြည့်ရန်`}>
                      <span>{grade === "KG" ? "KG" : grade.replace("Grade ", "G")}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <p className="grade-group-foot">{group.grades.length === 1 ? "စတင်လေ့လာရန်" : `${group.grades[0]} — ${group.grades[group.grades.length - 1]}`}</p>
              </article>
            ))}
          </div>
          <div className="curriculum-note"><span><Check size={16} /></span><p>အတန်းအလိုက် ဘာသာရပ်၊ သင်ခန်းစာ၊ ရှင်းလင်းချက်၊ မှတ်စု၊ လေ့ကျင့်ခန်းနှင့် စာမေးပွဲလေ့ကျင့်မှုများ ထည့်သွင်းနိုင်ရန် ရည်ရွယ်ထားသည်။</p><span className="note-en">BUILT TO GROW</span></div>
        </section>

        <section className="general-section section-pad" id="general" aria-labelledby="general-title">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-dark"><span className="eyebrow-line" /> EXPLORE YOUR INTERESTS</div>
              <h2 id="general-title">အထွေထွေ <span>စာကြည့်တိုက်</span></h2>
              <p className="section-intro">သိလိုစိတ်ရဲ့ ဦးတည်ရာတိုင်းအတွက် ခေါင်းစဉ်တစ်ခုစီ။</p>
            </div>
            <span className="category-count">{visibleCategories.length.toString().padStart(2, "0")} ခေါင်းစဉ်</span>
          </div>
          <div className="category-grid">
            {visibleCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <a className="category-card" href="#featured" key={category.title}>
                  <span className={`category-icon tone-${category.tone}`}><Icon size={21} strokeWidth={1.7} /></span>
                  <span className="category-text"><strong>{category.title}</strong><small>{category.subtitle}</small></span>
                  <span className="category-index">0{index + 1}</span>
                  <ArrowUpRight className="category-arrow" size={17} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>

        <section className="featured-section section-pad" id="featured" aria-labelledby="featured-title">
          <div className="section-heading featured-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> A FIRST LOOK</div>
              <h2 id="featured-title">ရွေးချယ်ထားသော <span>စာအုပ်များ</span></h2>
              <p className="section-intro">ဒီဇိုင်းနမူနာများဖြစ်ပြီး အမှန်တကယ်စာအုပ်များ မဟုတ်သေးပါ။</p>
            </div>
            <span className="demo-label"><Sparkles size={13} /> DEMO CONTENT</span>
          </div>
          <div className="book-grid">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.mark}>
                <div className={`book-cover ${book.palette}`}>
                  <div className="cover-topline"><span>THARi · DEMO</span><span>{book.mark}</span></div>
                  <div className="cover-art" aria-hidden="true"><span className="cover-orbit" /><BookOpen size={46} strokeWidth={1.05} /></div>
                  <div className="cover-title">{book.title}</div>
                  <div className="cover-bottomline"><span>နမူနာအဖုံး</span><span className="cover-seal">T</span></div>
                </div>
                <div className="book-meta"><div><span className="book-category">{book.subtitle}</span><h3>{book.title}</h3></div><span className="book-demo-tag">DEMO</span></div>
                <button className="read-button" type="button" onClick={() => setSelectedBook(book)}>ဖတ်ရှုရန် · Demo <ArrowRight size={16} /></button>
              </article>
            ))}
          </div>
          {normalizedQuery && visibleGrades.length === 0 && visibleCategories.length === 0 && visibleBooks.length === 0 && (
            <div className="empty-search" role="status"><Search size={20} /><span>“{query}” အတွက် မတွေ့ပါ။ စကားလုံးတစ်ခု ပြောင်းပြီး ထပ်ရှာကြည့်ပါ။</span><button type="button" onClick={() => setQuery("")}>ရှာဖွေမှု ရှင်းရန်</button></div>
          )}
          {normalizedQuery && (visibleGrades.length > 0 || visibleCategories.length > 0 || visibleBooks.length > 0) && (
            <p className="search-hint" role="status">“{query}” နှင့် ကိုက်ညီသော ရလဒ်များကို အပေါ်က ကဏ္ဍများတွင် ပြထားပါသည်။ <button type="button" onClick={() => setQuery("")}>အားလုံးကြည့်ရန်</button></p>
          )}
        </section>

        <section className="closing-note" id="about">
          <div className="closing-mark"><BookOpen size={25} /></div>
          <div><span className="eyebrow eyebrow-dark">A LIBRARY FOR EVERYONE</span><h2>သင်ယူမှုက <em>ဒီနေရာက</em> စတင်ပါတယ်။</h2><p>THARi BOOKS — မြန်မာစာဖတ်သူတိုင်းအတွက် အသိပညာဆီသို့ လမ်းဖွင့်ပေးသော ဒစ်ဂျစ်တယ်စာကြည့်တိုက်။</p></div>
          <a className="closing-link" href="#top" aria-label="စာမျက်နှာအပေါ်သို့ ပြန်သွားရန်"><ArrowUpRight size={20} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-col"><Brand footer /><p>စာဖတ်ခြင်း၊ သင်ယူခြင်းနဲ့ သိလိုစိတ်ကို တန်ဖိုးထားသော မြန်မာစာဖတ်သူတိုင်းအတွက်။</p></div>
          <div className="footer-links"><div><h2>လေ့လာရန်</h2><a href="#education">ပညာရေးစာကြည့်တိုက်</a><a href="#general">အထွေထွေစာကြည့်တိုက်</a><a href="#featured">နမူနာစာအုပ်များ</a></div><div><h2>THARi BOOKS</h2><a href="#about">ကျွန်ုပ်တို့အကြောင်း</a><button type="button" onClick={() => setSiteNotice({ title: "ဆက်သွယ်ရန်", description: "တရားဝင် ဆက်သွယ်ရန်အချက်အလက်ကို မပေးထားသေးပါ။ မှန်ကန်သော email သို့မဟုတ် ဖုန်းနံပါတ်ကို အတည်ပြုပြီးမှ ထည့်သွင်းပါမည်။" })}>ဆက်သွယ်ရန်</button><button type="button" onClick={() => setSiteNotice({ title: "အကူအညီ", description: "အကူအညီအကြောင်းအရာများကို နောက်အဆင့်တွင် စီမံကိန်းပိုင်ရှင်၏ အတည်ပြုချက်ဖြင့် ထည့်သွင်းပါမည်။" })}>အကူအညီ</button><button type="button" onClick={() => setSiteNotice({ title: "အသုံးပြုမှုစည်းမျဉ်းများ", description: "တရားဝင် အသုံးပြုမှုစည်းမျဉ်းများကို မပေးထားသေးပါ။ ဥပဒေဆိုင်ရာ စည်းကမ်းချက်များကို မဖန်တီးဘဲ ပိုင်ရှင်၏ စိစစ်အတည်ပြုချက်ရမှ ထည့်သွင်းပါမည်။" })}>အသုံးပြုမှုစည်းမျဉ်းများ</button></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} THARi BOOKS · Stage 1 Homepage</span><span className="footer-note"><span className="footer-dot" /> မြန်မာစာဖတ်သူတိုင်းအတွက်</span></div>
      </footer>

      {selectedBook && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedBook(null); }}>
          <section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <button className="dialog-close" type="button" onClick={() => setSelectedBook(null)} aria-label="ပိတ်ရန်"><X size={19} /></button>
            <span className="demo-label"><Sparkles size={13} /> DEMO · အမှန်တကယ်စာအုပ် မဟုတ်ပါ</span>
            <h2 id="dialog-title">{selectedBook.title}</h2>
            <p className="dialog-subtitle">{selectedBook.subtitle}</p>
            <p>{selectedBook.description}</p>
            <button className="button-primary dialog-done" type="button" onClick={() => setSelectedBook(null)}>နားလည်ပါပြီ <Check size={16} /></button>
          </section>
        </div>
      )}
      {siteNotice && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSiteNotice(null); }}>
          <section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="site-notice-title">
            <button className="dialog-close" type="button" onClick={() => setSiteNotice(null)} aria-label="ပိတ်ရန်"><X size={19} /></button>
            <span className="eyebrow eyebrow-dark">THARi BOOKS · အချက်အလက်</span>
            <h2 id="site-notice-title">{siteNotice.title}</h2>
            <p>{siteNotice.description}</p>
            <button className="button-primary dialog-done" type="button" onClick={() => setSiteNotice(null)}>နားလည်ပါပြီ <Check size={16} /></button>
          </section>
        </div>
      )}
    </div>
  );
}
