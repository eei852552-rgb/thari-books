/**
 * THARi BOOKS static catalogue foundation.
 *
 * Only source-found Grade 1 and Grade 10 subject records are seeded below.
 * "source_found" is not the same as current-edition verification or reuse permission.
 * Add a resource only after accuracy and usage rights are reviewed.
 */

export type EducationLevel = "kindergarten" | "primary" | "middle" | "high";

export type VerificationStatus =
  | "unverified"
  | "source_found"
  | "verified_current";

export type RightsStatus =
  | "unknown"
  | "link_only"
  | "permission_granted"
  | "open_license"
  | "original_thari";

export type ResourceReviewStatus =
  | "draft"
  | "needs_review"
  | "approved"
  | "rejected";

export type ResourceType =
  | "official_textbook_link"
  | "official_audio_lesson"
  | "teacher_guide_link"
  | "original_lesson"
  | "original_exercise"
  | "original_diagram"
  | "reading_link";

export interface GradeRecord {
  id: string;
  labelMy: string;
  labelEn: string;
  level: EducationLevel;
  curriculumStatus: VerificationStatus;
}

export interface SubjectRecord {
  id: string;
  gradeId: string;
  nameMy: string;
  nameEn?: string;
  curriculumYear: string | null;
  verificationStatus: VerificationStatus;
  sourceUrls: string[];
  notes?: string;
}

export interface ResourceRecord {
  id: string;
  gradeId?: string;
  subjectId?: string;
  titleMy: string;
  titleEn?: string;
  resourceType: ResourceType;
  authorOrPublisher: string;
  sourceUrl: string | null;
  editionOrDate: string | null;
  rightsStatus: RightsStatus;
  licenseNote?: string;
  reviewStatus: ResourceReviewStatus;
  reviewedAt: string | null;
  visibility: "hidden" | "public";
}

export interface GeneralCategoryRecord {
  id: string;
  titleEn: string;
  titleMy: string;
}

export const educationGrades: readonly GradeRecord[] = [
  { id: "g1", labelMy: "Grade 1", labelEn: "Grade 1", level: "primary", curriculumStatus: "source_found" },
  { id: "g2", labelMy: "Grade 2", labelEn: "Grade 2", level: "primary", curriculumStatus: "unverified" },
  { id: "g3", labelMy: "Grade 3", labelEn: "Grade 3", level: "primary", curriculumStatus: "unverified" },
  { id: "g4", labelMy: "Grade 4", labelEn: "Grade 4", level: "primary", curriculumStatus: "unverified" },
  { id: "g5", labelMy: "Grade 5", labelEn: "Grade 5", level: "primary", curriculumStatus: "unverified" },
  { id: "g6", labelMy: "Grade 6", labelEn: "Grade 6", level: "middle", curriculumStatus: "unverified" },
  { id: "g7", labelMy: "Grade 7", labelEn: "Grade 7", level: "middle", curriculumStatus: "unverified" },
  { id: "g8", labelMy: "Grade 8", labelEn: "Grade 8", level: "middle", curriculumStatus: "unverified" },
  { id: "g9", labelMy: "Grade 9", labelEn: "Grade 9", level: "middle", curriculumStatus: "unverified" },
  { id: "g10", labelMy: "Grade 10", labelEn: "Grade 10", level: "high", curriculumStatus: "source_found" },
  { id: "g11", labelMy: "Grade 11", labelEn: "Grade 11", level: "high", curriculumStatus: "unverified" },
  { id: "g12", labelMy: "Grade 12", labelEn: "Grade 12", level: "high", curriculumStatus: "unverified" },
] as const;

/**
 * Source-found records only:
 * - Grade 1: DME KG+12 textbook notice lists six subjects; current edition/year
 *   and a working direct official URL still need confirmation.
 * - Grade 10: MOE curriculum index has eight new-curriculum subject pages,
 *   each tagged 2020-2021. Do not label these verified-current.
 */
export const educationSubjects: readonly SubjectRecord[] = [
  {
    id: "g1-myanmar",
    gradeId: "g1",
    nameMy: "မြန်မာဖတ်စာ",
    nameEn: "Myanmar Reader",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://myanmarexam.org/news/34"],
    notes: "Official DME search result lists this title; direct page returned 404 during the latest check. Verify a working official URL and current edition before publication.",
  },
  {
    id: "g1-english",
    gradeId: "g1",
    nameMy: "အင်္ဂလိပ်စာ",
    nameEn: "English",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://myanmarexam.org/news/34"],
    notes: "Official DME search result lists this title; direct page returned 404 during the latest check. Verify a working official URL and current edition before publication.",
  },
  {
    id: "g1-mathematics",
    gradeId: "g1",
    nameMy: "သင်္ချာ",
    nameEn: "Mathematics",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://myanmarexam.org/news/34"],
    notes: "Official DME search result lists this title; direct page returned 404 during the latest check. Verify a working official URL and current edition before publication.",
  },
  {
    id: "g1-science",
    gradeId: "g1",
    nameMy: "သိပ္ပံ",
    nameEn: "Science",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://myanmarexam.org/news/34"],
    notes: "Official DME search result lists this title; direct page returned 404 during the latest check. Verify a working official URL and current edition before publication.",
  },
  {
    id: "g1-social-studies",
    gradeId: "g1",
    nameMy: "လူမှုရေး",
    nameEn: "Social Studies",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://myanmarexam.org/news/34"],
    notes: "Official DME search result lists this title; direct page returned 404 during the latest check. Verify a working official URL and current edition before publication.",
  },
  {
    id: "g1-moral-civics",
    gradeId: "g1",
    nameMy: "စာရိတ္တနှင့် ပြည်သူ့နီတိ",
    nameEn: "Moral and Civics",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://myanmarexam.org/news/34"],
    notes: "Official DME search result lists this title; direct page returned 404 during the latest check. Verify a working official URL and current edition before publication.",
  },
  {
    id: "g10-economics",
    gradeId: "g10",
    nameMy: "ဘောဂဗေဒ",
    nameEn: "Economics",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3196"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-biology",
    gradeId: "g10",
    nameMy: "ဇီဝဗေဒ",
    nameEn: "Biology",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3195"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-history",
    gradeId: "g10",
    nameMy: "သမိုင်း",
    nameEn: "History",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3198"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-geography",
    gradeId: "g10",
    nameMy: "ပထဝီဝင်",
    nameEn: "Geography",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3197"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-physics",
    gradeId: "g10",
    nameMy: "ရူပဗေဒ",
    nameEn: "Physics",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3194"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-chemistry",
    gradeId: "g10",
    nameMy: "ဓာတုဗေဒ",
    nameEn: "Chemistry",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3193"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-mathematics",
    gradeId: "g10",
    nameMy: "သင်္ချာ",
    nameEn: "Mathematics",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3192"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },
  {
    id: "g10-english",
    gradeId: "g10",
    nameMy: "အင်္ဂလိပ်စာ",
    nameEn: "English",
    curriculumYear: "2020-2021",
    verificationStatus: "source_found",
    sourceUrls: ["https://moe.gov.mm/my/node/3191"],
    notes: "Official MOE new-curriculum Grade 10 page; tagged 2020-2021. Current edition and complete subject inventory remain unverified.",
  },

  {
    id: "g3-science",
    gradeId: "g3",
    nameMy: "သိပ္ပံ",
    nameEn: "Science",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists an individual Grade 3 science lesson; this is not a complete subject inventory or current textbook confirmation.",
  },
  {
    id: "g3-mathematics",
    gradeId: "g3",
    nameMy: "သင်္ချာ",
    nameEn: "Mathematics",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists an individual Grade 3 mathematics lesson; this is not a complete subject inventory or current textbook confirmation.",
  },
  {
    id: "g3-myanmar",
    gradeId: "g3",
    nameMy: "မြန်မာစာ",
    nameEn: "Myanmar",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists a Grade 3 new-curriculum Myanmar introduction; this is not a complete subject inventory.",
  },
  {
    id: "g4-social-studies",
    gradeId: "g4",
    nameMy: "လူမှုရေး",
    nameEn: "Social Studies",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists an individual Grade 4 social-studies introduction; this is not a complete subject inventory or current textbook confirmation.",
  },
  {
    id: "g6-geography",
    gradeId: "g6",
    nameMy: "ပထဝီဝင်",
    nameEn: "Geography",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists an individual Grade 6 geography introduction; this is not a complete subject inventory.",
  },
  {
    id: "g6-science",
    gradeId: "g6",
    nameMy: "သိပ္ပံ",
    nameEn: "Science",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists an individual Grade 6 science introduction; this is not a complete subject inventory.",
  },
  {
    id: "g6-mathematics",
    gradeId: "g6",
    nameMy: "သင်္ချာ",
    nameEn: "Mathematics",
    curriculumYear: null,
    verificationStatus: "source_found",
    sourceUrls: ["https://www.moe.gov.mm/my/radio-lessons"],
    notes: "Ministry radio archive lists an individual Grade 6 mathematics lesson; this is not a complete subject inventory.",
  },
];



export const learningResources: readonly ResourceRecord[] = [



  {
    id: "g3-science-radio-floating-sinking",
    subjectId: "g3-science",
    titleMy: "ရေတွင် မြှုပ်နိုင်ပေါနိုင်သော အရာများ — မြှုပ်ခြင်း၊ ပေါ်ခြင်း",
    titleEn: "Floating and Sinking in Water",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
  {
    id: "g3-mathematics-radio-time",
    subjectId: "g3-mathematics",
    titleMy: "အချိန်နှင့် ကြာသောအချိန်",
    titleEn: "Time and Duration",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
  {
    id: "g3-myanmar-radio-intro",
    subjectId: "g3-myanmar",
    titleMy: "သင်ရိုးသစ် မြန်မာစာ မိတ်ဆက်ဆွေးနွေးခြင်း",
    titleEn: "New Curriculum Myanmar Introduction",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
  {
    id: "g4-social-radio-intro",
    subjectId: "g4-social-studies",
    titleMy: "လူမှုရေးဘာသာ မိတ်ဆက်ဆွေးနွေးခြင်း",
    titleEn: "Social Studies Introduction",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
  {
    id: "g6-geography-radio-intro",
    subjectId: "g6-geography",
    titleMy: "ပထဝီဝင်ဘာသာရပ် သင်ရိုးမိတ်ဆက်",
    titleEn: "Geography Curriculum Introduction",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
  {
    id: "g6-science-radio-intro",
    subjectId: "g6-science",
    titleMy: "အလယ်တန်းသင်ရိုးသစ် သိပ္ပံဘာသာရပ် မိတ်ဆက်",
    titleEn: "Middle School Science Introduction",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
  {
    id: "g6-mathematics-radio-intro",
    subjectId: "g6-mathematics",
    titleMy: "အက္ခရာကိန်းတန်းများ",
    titleEn: "Number Sequences",
    resourceType: "official_audio_lesson",
    authorOrPublisher: "Ministry of Education, Myanmar",
    sourceUrl: "https://www.moe.gov.mm/my/radio-lessons",
    editionOrDate: null,
    rightsStatus: "link_only",
    licenseNote: "Official Ministry archive link only. Do not download, rehost, or redistribute the audio without permission.",
    reviewStatus: "approved",
    reviewedAt: "2026-11-14",
    visibility: "public",
  },
];

export const generalCategories: readonly GeneralCategoryRecord[] = [
  { id: "technology", titleEn: "Technology", titleMy: "နည်းပညာ" },
  { id: "business", titleEn: "Business", titleMy: "စီးပွားရေး" },
  { id: "science", titleEn: "Science", titleMy: "သိပ္ပံ" },
  { id: "history", titleEn: "History", titleMy: "သမိုင်း" },
  { id: "language-learning", titleEn: "Language Learning", titleMy: "ဘာသာစကား" },
  { id: "personal-development", titleEn: "Personal Development", titleMy: "ကိုယ်ရည်ကိုယ်သွေး" },
  { id: "stories-fiction", titleEn: "Stories & Fiction", titleMy: "ဝတ္ထုနှင့် ပုံပြင်" },
  { id: "general-knowledge", titleEn: "General Knowledge", titleMy: "အထွေထွေဗဟုသုတ" },
] as const;

export function canPublishResource(resource: ResourceRecord): boolean {
  const rightsAllowPublication =
    resource.rightsStatus === "link_only" ||
    resource.rightsStatus === "permission_granted" ||
    resource.rightsStatus === "open_license" ||
    resource.rightsStatus === "original_thari";

  return (
    resource.reviewStatus === "approved" &&
    rightsAllowPublication &&
    resource.visibility === "public"
  );
}
