import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, SiteSettings } from "./firebase";

// Default settings as fallback
const defaultSettings: SiteSettings = {
  whatsappNumber: "+9647830796658",
  email: "support@ivx.com",
  instagramUrl: "https://instagram.com",
  twitterUrl: "",
  tiktokUrl: "",
  telegramUrl: "",
  heroTitle: "IVX Store",
  heroSubtitle: "متجرك الأول للألعاب والاشتراكات",
  aboutText: "",
  workingHoursText: "نحن متاحون للرد على مكالماتك خلال أوقات العمل.",
  emailContactText: "أرسل لنا استفسارك وسنرد عليك بأقرب وقت.",
  locationTitle: "متجر إلكتروني يخدم جميع أنحاء العالم.",
  locationSubtitle: "العراق IQ",
  contactPhoneNumber: "+964 783 079 6658",
  contactEmail: "support@ivx.com",
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  loading: true,
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase 'general' settings doc in real-time
    const unsubscribe = onSnapshot(doc(db, "settings", "general"), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...defaultSettings, ...docSnap.data() } as SiteSettings);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}
