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
  subjectId: string;
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
  { id: "kg", labelMy: "သူငယ်တန်း", labelEn: "Kindergarten", level: "kindergarten", curriculumStatus: "unverified" },
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
];



export const learningResources: readonly ResourceRecord[] = [];

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
    resource.rightsStatus === "permission_granted" ||
    resource.rightsStatus === "open_license" ||
    resource.rightsStatus === "original_thari";

  return (
    resource.reviewStatus === "approved" &&
    rightsAllowPublication &&
    resource.visibility === "public"
  );
}
