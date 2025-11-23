export type ContractType =
  | "CDI"
  | "CDD"
  | "Intérim"
  | "Freelance"
  | "Stage";

export type ExperienceLevel =
  | "Responsable"
  | "Senior"
  | "Manager"
  | "Directeur"
  | "Expert";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: ContractType;
  experience: ExperienceLevel;
  salaryRange: [number, number];
  publishDate: string;
  remote: "Hybride" | "Présentiel" | "Télétravail";
  tags: string[];
  missions: string[];
  competences: string[];
  description: string;
  tools: string[];
  analysticsHighlights: {
    budgetResponsibility: string;
    teamSize: string;
    reportingTo: string;
  };
  extras: {
    languages: string[];
    perks: string[];
    benefits: string[];
  };
}

export interface FilterOptions {
  query: string;
  location: string;
  contractType: ContractType | "Tous";
  remote: "Tous" | "Hybride" | "Présentiel" | "Télétravail";
  minSalary: number;
  tags: string[];
}
