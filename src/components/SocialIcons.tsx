import React from "react";
import { Mail } from "lucide-react";
import { SiteSettings } from "../lib/firebase";

interface SocialIconsProps {
  settings: SiteSettings | null;
  className?: string;
  iconClassName?: string;
}

export function SocialIcons({ settings, className = "", iconClassName = "w-10 h-10 md:w-11 md:h-11 rounded-2xl" }: SocialIconsProps) {
  if (!settings) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* WhatsApp */}
      {settings.whatsappNumber && (
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className={`${iconClassName} flex items-center justify-center bg-black border border-white/5 text-gray-500 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 group shadow-sm`}
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      )}

      {/* Email */}
      {settings.email && (
        <a
          href={`mailto:${settings.email}`}
          title="Email"
          className={`${iconClassName} flex items-center justify-center bg-black border border-white/5 text-gray-500 hover:text-white hover:bg-[#ea4335] hover:border-[#ea4335] transition-all duration-300 group shadow-sm`}
        >
          <Mail size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      )}

      {/* Instagram */}
      {settings.instagramUrl && (
        <a
          href={settings.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className={`${iconClassName} flex items-center justify-center bg-black border border-white/5 text-gray-500 hover:text-white hover:border-transparent transition-all duration-300 group shadow-sm relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current relative z-10" viewBox="0 0 24 24">
             <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        </a>
      )}

      {/* Telegram */}
      {settings.telegramUrl && (
        <a
          href={settings.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Telegram"
          className={`${iconClassName} flex items-center justify-center bg-black border border-white/5 text-gray-500 hover:text-white hover:bg-[#229ED9] hover:border-[#229ED9] transition-all duration-300 group shadow-sm`}
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.09l-6.4 4.024-2.76-.86c-.6-.185-.615-.6.125-.89l10.736-4.136c.498-.184.912.115.76.84z"/>
          </svg>
        </a>
      )}

      {/* Twitter / X */}
      {settings.twitterUrl && (
        <a
          href={settings.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter / X"
          className={`${iconClassName} flex items-center justify-center bg-black border border-white/5 text-gray-500 hover:text-white hover:bg-zinc-800 hover:border-zinc-800 transition-all duration-300 group shadow-sm`}
        >
          <svg className="w-4 h-4 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      )}

      {/* TikTok */}
      {settings.tiktokUrl && (
        <a
          href={settings.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="TikTok"
          className={`${iconClassName} flex items-center justify-center bg-black border border-white/5 text-gray-500 hover:text-white hover:bg-[#ff0050] hover:border-[#ff0050] transition-all duration-300 group shadow-sm`}
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 2.31-4.642c.298.053.585.158.852.311V9.403c-.276-.051-.555-.078-.838-.078a6.336 6.336 0 0 0 0 12.671c3.501 0 6.34-2.839 6.34-6.34V8.15c2.1.282 3.82 1.942 4.195 4.02h3.411a7.863 7.863 0 0 0-3.854-5.484z"/>
          </svg>
        </a>
      )}
    </div>
  );
}
