export interface Profile {
  name: string;
  headline: string;
  bio: string;
  aboutDetailed: string;
  avatar: string;
  secondaryPhoto: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  github: string;
  website: string;
}

export interface Education {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  type: "course" | "education";
  diplomaImage: string;
  link: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  type: "work" | "volunteer";
}

export interface Achievement {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
  link: string;
}

export interface Trip {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
}

export interface InstagramCategory {
  id: string;
  label: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  type: "post" | "reel";
  category: string;
  date: string;
  title: string;
  caption: string;
  link: string;
}

export interface InstagramData {
  categories: InstagramCategory[];
  posts: InstagramPost[];
}

import profileData from "@/data/profile.json";
import educationData from "@/data/education.json";
import experienceData from "@/data/experience.json";
import achievementsData from "@/data/achievements.json";
import tripsData from "@/data/trips.json";
import instagramData from "@/data/instagram.json";

export const profile = profileData as Profile;
export const education = educationData as Education[];
export const experience = experienceData as Experience[];
export const achievements = achievementsData as Achievement[];
export const trips = tripsData as Trip[];
export const instagram = instagramData as InstagramData;
