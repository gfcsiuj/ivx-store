import { IvxLogo } from "./IvxLogo";
import { useSettings } from "../lib/SettingsContext";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="py-8 md:py-12 border-t border-white/10 bg-black/50 backdrop-blur-xl relative z-10 pb-24 md:pb-12">
      <div className="container mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <IvxLogo className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-base md:text-lg font-bold tracking-widest text-white">ivx</span>
        </div>
        
        <p className="text-gray-400 text-xs md:text-sm font-arabic font-medium text-center" dir="rtl">
          © {new Date().getFullYear()} ivx. جميع الحقوق محفوظة. متجر الألعاب الأول في العراق.
        </p>
        
        <SocialIcons 
          settings={settings} 
          className="justify-center" 
          iconClassName="w-10 h-10 rounded-full" 
        />
      </div>
    </footer>
  );
}
