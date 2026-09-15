import type { PortfolioEntry } from "../types/portfolio.ts";

export default function getDelayByContent(content?: Pick<PortfolioEntry, "description" | "points">) {
  const characters = content?.description?.length
    || content?.points?.reduce((sum, point) => sum + point.label.length + String(point.value).length, 0)
    || 0;
  return Math.max(3000, (characters / 15) * 1000);
}
