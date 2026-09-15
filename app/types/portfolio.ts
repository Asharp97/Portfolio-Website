export interface PortfolioEntry {
  title: string;
  titleLink?: string;
  subtitle?: string;
  subtitleLink?: string;
  date?: string;
  location?: string;
  description?: string;
  tags?: string[];
  points?: { label: string; value: string | number }[];
}
