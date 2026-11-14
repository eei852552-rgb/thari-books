/**
 * THARi BOOKS static catalogue foundation.
 *
 * This file intentionally contains no subject or book records yet.
 * Add a subject only after its current official curriculum evidence is checked.
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
  { id: "g1", labelMy: "Grade 1", labelEn: "Grade 1", level: "primary", curriculumStatus: "unverified" },
  { id: "g2", labelMy: "Grade 2", labelEn: "Grade 2", level: "primary", curriculumStatus: "unverified" },
  { id: "g3", labelMy: "Grade 3", labelEn: "Grade 3", level: "primary", curriculumStatus: "unverified" },
  { id: "g4", labelMy: "Grade 4", labelEn: "Grade 4", level: "primary", curriculumStatus: "unverified" },
  { id: "g5", labelMy: "Grade 5", labelEn: "Grade 5", level: "primary", curriculumStatus: "unverified" },
  { id: "g6", labelMy: "Grade 6", labelEn: "Grade 6", level: "middle", curriculumStatus: "unverified" },
  { id: "g7", labelMy: "Grade 7", labelEn: "Grade 7", level: "middle", curriculumStatus: "unverified" },
  { id: "g8", labelMy: "Grade 8", labelEn: "Grade 8", level: "middle", curriculumStatus: "unverified" },
  { id: "g9", labelMy: "Grade 9", labelEn: "Grade 9", level: "middle", curriculumStatus: "unverified" },
  { id: "g10", labelMy: "Grade 10", labelEn: "Grade 10", level: "high", curriculumStatus: "unverified" },
  { id: "g11", labelMy: "Grade 11", labelEn: "Grade 11", level: "high", curriculumStatus: "unverified" },
  { id: "g12", labelMy: "Grade 12", labelEn: "Grade 12", level: "high", curriculumStatus: "unverified" },
] as const;

/**
 * Keep these arrays empty until each entry has a source and review record.
 * An empty catalogue is more honest than displaying guessed subjects/books.
 */
export const educationSubjects: readonly SubjectRecord[] = [];

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
