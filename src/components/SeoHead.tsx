import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSettings } from "../lib/SettingsContext";

interface PageSeoData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

const BASE_URL = "https://ivxiq.com";
const SITE_NAME = "IVX Store";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

function getPageSeo(path: string, baseTitle: string, baseDesc: string): PageSeoData {
  const pages: Record<string, PageSeoData> = {
    "/": {
      title: `${baseTitle}`,
      description: baseDesc,
      keywords: "IVX, IVX Store, متجر IVX, متجر العاب العراق, شراء العاب, بلايستيشن بلس, PS Plus العراق, Xbox Game Pass, جيم باس, العاب رقمية, حسابات بلايستيشن, حسابات Xbox, شحن رصيد ستيم, بطاقات ايتونز, Google Play, شحن رصيد, بطاقات هدايا, اشتراكات العاب, متجر رقمي, كيمرز العراق, gaming store Iraq, ivxiq",
      canonical: `${BASE_URL}/`,
    },
    "/services": {
      title: `الخدمات والألعاب | ${SITE_NAME}`,
      description: "تصفح جميع خدمات متجر IVX - اشتراكات بلايستيشن بلس، Xbox Game Pass، ألعاب رقمية، حسابات جاهزة، شحن رصيد ستيم وبلايستيشن، شدات ببجي، V-Bucks فورتنايت والمزيد بأرخص الأسعار في العراق.",
      keywords: "خدمات IVX, العاب رقمية العراق, شراء العاب بلايستيشن, شراء العاب اكسبوكس, اشتراك PS Plus, اشتراك Game Pass, شحن ستيم, شدات ببجي, PUBG UC, فورتنايت V-Bucks, شحن فري فاير, حسابات جاهزة, ارخص اسعار العاب العراق",
      canonical: `${BASE_URL}/services`,
    },
    "/packages": {
      title: `الباقات والعروض | ${SITE_NAME}`,
      description: "اكتشف باقات IVX Store المميزة - باقات مخصصة بأسعار تنافسية تجمع بين الاشتراكات والألعاب والخدمات الرقمية. وفّر أكثر مع باقاتنا الحصرية في العراق.",
      keywords: "باقات IVX, باقات العاب العراق, عروض العاب, باقات اشتراكات, باقات بلايستيشن, عروض حصرية, تخفيضات العاب, خصومات كيمنج, باقات رقمية",
      canonical: `${BASE_URL}/packages`,
    },
    "/clients": {
      title: `آراء العملاء والتقييمات | ${SITE_NAME}`,
      description: "اقرأ آراء وتقييمات عملاء متجر IVX في العراق. أكثر من 500 عميل راضٍ يثقون بخدماتنا. تعرّف على تجاربهم مع خدماتنا الرقمية.",
      keywords: "اراء عملاء IVX, تقييمات متجر IVX, تجارب العملاء, موثوقية IVX, افضل متجر العاب العراق, تقييم, مراجعات",
      canonical: `${BASE_URL}/clients`,
    },
    "/contact": {
      title: `تواصل معنا | ${SITE_NAME}`,
      description: "تواصل مع فريق متجر IVX عبر تيليجرام، واتساب، أو انستغرام. نحن هنا لمساعدتك على مدار الساعة. دعم فني سريع ومباشر.",
      keywords: "تواصل IVX, دعم IVX, رقم IVX, واتساب IVX, تيليجرام IVX, انستغرام IVX, خدمة العملاء, دعم فني العاب",
      canonical: `${BASE_URL}/contact`,
    },
  };

  // Handle dynamic category pages
  if (path.startsWith("/services/category/")) {
    return {
      title: `خدمات القسم | ${SITE_NAME}`,
      description: "تصفح خدمات هذا القسم في متجر IVX - أفضل الألعاب والاشتراكات الرقمية بأسعار منافسة في العراق.",
      keywords: "خدمات IVX, قسم خدمات, العاب رقمية, اشتراكات, متجر العاب العراق",
      canonical: `${BASE_URL}${path}`,
    };
  }

  return pages[path] || pages["/"]!;
}

export function SeoHead() {
  const location = useLocation();
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (loading) return;

    const baseTitle = settings.heroTitle || "IVX Store | متجر الألعاب الأول في العراق";
    const baseDesc = settings.aboutText || "متجر IVX - الوجهة الأولى للكيمرز في العراق. اشتراكات بلايستيشن بلس PS Plus، Xbox Game Pass، ألعاب رقمية، حسابات جاهزة، شحن رصيد ستيم وبلايستيشن، بطاقات iTunes وGoogle Play بأرخص الأسعار. توصيل فوري وضمان كامل.";
    const path = location.pathname;

    // Don't override SEO for admin pages
    if (path.startsWith("/admin")) {
      document.title = `لوحة التحكم | ${SITE_NAME}`;
      return;
    }

    const seo = getPageSeo(path, baseTitle, baseDesc);

    // Set document title
    document.title = seo.title;

    // Helper to update or create meta tags
    const updateMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to update or create link tags
    const updateLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Primary meta tags
    updateMeta("name", "description", seo.description);
    updateMeta("name", "keywords", seo.keywords);

    // Canonical URL
    updateLink("canonical", seo.canonical);

    // Open Graph
    updateMeta("property", "og:title", seo.title);
    updateMeta("property", "og:description", seo.description);
    updateMeta("property", "og:url", seo.canonical);
    updateMeta("property", "og:image", OG_IMAGE);
    updateMeta("property", "og:site_name", SITE_NAME);

    // Twitter
    updateMeta("name", "twitter:title", seo.title);
    updateMeta("name", "twitter:description", seo.description);
    updateMeta("name", "twitter:image", OG_IMAGE);

  }, [location.pathname, settings, loading]);

  return null;
}
