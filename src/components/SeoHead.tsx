import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "../lib/SettingsContext";

export function SeoHead() {
  const location = useLocation();
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (loading) return;

    const baseTitle = settings.heroTitle || "ivx | متجر الألعاب الأول في العراق";
    const desc = settings.aboutText || "متجر ivx - وجهتك الأولى لكل ما يخص الألعاب في العراق. اشتراكات بلس وجيم باس، ألعاب رقمية، حسابات جاهزة، وخدمات شحن الأرصدة بأفضل الأسعار. نتعامل بالجملة والمفرد.";

    let pageTitle = baseTitle;
    const path = location.pathname;

    if (path === "/services") pageTitle = `الخدمات | ${baseTitle}`;
    else if (path === "/packages") pageTitle = `الباقات | ${baseTitle}`;
    else if (path === "/contact") pageTitle = `تواصل معنا | ${baseTitle}`;
    else if (path === "/clients") pageTitle = `أراء العملاء | ${baseTitle}`;
    else if (path.startsWith("/admin")) pageTitle = `لوحة التحكم | ${baseTitle}`;

    document.title = pageTitle;

    const updateMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes("property")) {
          el.setAttribute("property", selector.match(/"([^"]+)"/)?.[1] || "");
        } else {
          el.setAttribute("name", selector.match(/"([^"]+)"/)?.[1] || "");
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta('meta[name="description"]', desc);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', desc);
  }, [location.pathname, settings, loading]);

  return null;
}
