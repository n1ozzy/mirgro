import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";

export type ServiceId =
  | "malowanie"
  | "podlogi"
  | "stolarka"
  | "laser"
  | "elewacje";

/** Value the contact form's service select can hold (services + fallback). */
export type ServiceOptionId = ServiceId | "inne";

export type AccentTone = "brass" | "laser";

export interface Service {
  id: ServiceId;
  name: string;
  tagline: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  /** 'laser' → cyan accents, everything else → brass. */
  accent: AccentTone;
}

/** One entry of the flat service catalog (the full offer, no tabs). */
export interface CatalogService {
  name: string;
  description: string;
  /** Category the service belongs to — drives the accent color. */
  serviceId: ServiceId;
}

export type GalleryTag =
  | "Schody"
  | "Malowanie"
  | "Wnętrza"
  | "Podłogi"
  | "Stolarka"
  | "Elewacje"
  | "Laser";

export interface GalleryItem {
  id: string;
  src: StaticImageData | string;
  alt: string;
  caption: string;
  tags: GalleryTag[];
}

/** Aspect-ratio bucket of a filmstrip photo — drives the card width. */
export type FrameRatio = "portrait" | "tall" | "wide";

/** One frame of the job-site filmstrip (a real in-progress photo). */
export interface StripFrame {
  src: StaticImageData | string;
  alt: string;
  /** Short stage label, e.g. "Szlifowanie". */
  stage: string;
  detail: string;
  ratio: FrameRatio;
}

/** One documentary frame of the renovation timeline (a real job-site photo). */
export interface RenovationStage {
  src: StaticImageData | string;
  alt: string;
  name: string;
  detail: string;
}

/** Scroll-scrubbed timeline: real photos of one staircase at consecutive stages. */
export interface RenovationStory {
  kicker: string;
  title: string;
  description: string;
  /** Chronological stages of the same staircase, first shown by default. */
  stages: RenovationStage[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
}

export interface ValueCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface LaserBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  /** Section element id the link scrolls to. */
  id: string;
  label: string;
}

export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  region: string;
  facebook: string;
  instagram: string;
}
