export default defineEventHandler((event) => {
  const baseUrl = "https://ali-elsayed.vercel.app";
  const pages = [{ language: "en", path: "/" }, { language: "tr", path: "/tr" }];
  const alternates = pages.map(page =>
    `    <xhtml:link rel="alternate" hreflang="${page.language}" href="${baseUrl}${page.path}"/>`,
  ).join("\n");
  setHeader(event, "Content-Type", "application/xml");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
${alternates}
  </url>`).join("\n")}
</urlset>`;
});
