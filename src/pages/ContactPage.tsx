import React, { useState } from "react";
import { motion } from "motion/react";
import { PageHero } from "../components/PageHero";
import { PageLayout } from "../components/PageLayout";
import { MapPin, Phone, Mail, Instagram, ArrowLeft, MessageCircle, Loader2, CheckCircle2, Terminal, Send, Code, Monitor, Cpu, Zap } from "lucide-react";
import { addMessage } from "../lib/firebase";
import { useSettings } from "../lib/SettingsContext";
import { SocialIcons } from "../components/SocialIcons";

export function ContactPage() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name.trim()) { setError("يرجى إدخال اسمك"); return; }
    if (!form.message.trim()) { setError("يرجى كتابة رسالتك"); return; }

    setSending(true);
    try {
      await addMessage({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setSent(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
    }
    setSending(false);
  };

  return (
    <PageLayout>
      <PageHero
        badge="📩 نحن هنا لمساعدتك"
        title="تواصل"
        highlight="معنا"
        description="نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما يخص الألعاب والاشتراكات. لا تتردد في التواصل."
      />

      <section className="pb-24 md:pb-32 relative z-10 overflow-x-hidden" dir="rtl">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">

            {/* Contact Info Cards */}
            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/40 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 flex items-start gap-4 md:gap-6 group hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.04)] transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 font-arabic">اتصل بنا</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-1 md:mb-2 font-arabic">{settings.workingHoursText || "نحن متاحون للرد على مكالماتك خلال أوقات العمل."}</p>
                  <a href={settings.contactPhoneNumber ? `tel:${settings.contactPhoneNumber.replace(/[^0-9+]/g, '')}` : "tel:+9647830796658"} className="text-base md:text-lg font-bold text-white font-arabic block" dir="ltr">{settings.contactPhoneNumber || "+964 783 079 6658"}</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-900/40 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 flex items-start gap-4 md:gap-6 group hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.04)] transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 font-arabic">البريد الإلكتروني</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-1 md:mb-2 font-arabic">{settings.emailContactText || "أرسل لنا استفسارك وسنرد عليك بأقرب وقت."}</p>
                  <a href={`mailto:${settings.contactEmail || "support@ivx.com"}`} className="text-base md:text-lg font-bold text-white font-arabic block" dir="ltr">{settings.contactEmail || "support@ivx.com"}</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900/40 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 flex items-start gap-4 md:gap-6 group hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.04)] transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 font-arabic">موقعنا</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-1 md:mb-2 font-arabic">{settings.locationTitle || "متجر إلكتروني يخدم جميع أنحاء العالم."}</p>
                  <p className="text-base md:text-lg font-bold text-white font-arabic">{settings.locationSubtitle || "العراق 🇮🇶"}</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-end w-full pt-4"
              >
                <SocialIcons settings={settings} />
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/40 p-6 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="text-xl md:text-2xl font-black text-white mb-6 md:mb-8 font-arabic">أرسل رسالة</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-black text-white mb-3 font-arabic">تم إرسال رسالتك بنجاح!</h4>
                  <p className="text-gray-400 font-arabic text-sm mb-6">سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-arabic font-bold text-sm hover:bg-white/10 transition-all"
                  >
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-4 md:space-y-6 relative z-10" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold font-arabic">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-1.5 md:mb-2 font-arabic">
                        الاسم <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-black border border-gray-800 rounded-xl md:rounded-2xl focus:bg-gray-900 focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all font-arabic text-sm md:text-base text-white placeholder-gray-600"
                        placeholder="اسمك الكريم"
                        disabled={sending}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-1.5 md:mb-2 font-arabic">رقم الجوال</label>
                      <input
                        type="tel"
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-black border border-gray-800 rounded-xl md:rounded-2xl focus:bg-gray-900 focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all font-arabic text-right text-sm md:text-base text-white placeholder-gray-600"
                        placeholder="07X XXXX XXXX"
                        disabled={sending}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-1.5 md:mb-2 font-arabic">البريد الإلكتروني</label>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-black border border-gray-800 rounded-xl md:rounded-2xl focus:bg-gray-900 focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all font-arabic text-right text-sm md:text-base text-white placeholder-gray-600"
                      placeholder="example@domain.com"
                      disabled={sending}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-1.5 md:mb-2 font-arabic">
                      الرسالة <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 md:px-5 py-3 md:py-4 bg-black border border-gray-800 rounded-xl md:rounded-2xl focus:bg-gray-900 focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all font-arabic resize-none text-sm md:text-base text-white placeholder-gray-600"
                      placeholder="كيف يمكننا مساعدتك؟"
                      disabled={sending}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-bold text-base md:text-lg font-arabic hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <span>إرسال الرسالة</span>
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
          {/* Developer Credit Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-6xl mx-auto bg-white/[0.05] p-[1px] rounded-[2rem] overflow-hidden"
          >
            <div className="bg-[#0a0a0c]/90 md:bg-[#0a0a0c]/80 backdrop-blur-md md:backdrop-blur-3xl rounded-[calc(2rem-1px)] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-purple-500/[0.02] to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700" />

              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-right w-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                    <Terminal className="text-indigo-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white font-arabic drop-shadow-md">المطور</h3>
                    <p className="text-xs text-indigo-400 font-arabic font-bold">The Developer</p>
                  </div>
                </div>
                <p className="text-gray-400 font-arabic text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                  تم تصميم وبرمجة هذا النظام بشغف وإتقان بواسطة <span className="font-bold text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">محمد حازم احمد</span> باستخدام أحدث التقنيات مثل <span className="font-bold text-indigo-400">React</span> و <span className="font-bold text-blue-400">TailwindCSS</span> مع واجهات تفاعلية سريعة ومتقدمة مبنية بدقة واحترافية عالية.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-5 border-t border-white/[0.05] pt-6 w-full md:w-auto">
                  <span className="text-sm text-gray-500 font-arabic font-bold whitespace-nowrap">تواصل مع المطور :</span>
                  <div className="flex items-center gap-3">
                    {/* Telegram */}
                    <a href="https://t.me/dagg_iq" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-900 border border-white/5 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-1.5 transition-all duration-300" title="Contact via Telegram">
                      <Send size={20} className="-ml-0.5" />
                    </a>
                    {/* WhatsApp */}
                    <a href="https://wa.me/9647771821250" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-900 border border-white/5 text-green-400 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1.5 transition-all duration-300" title="Contact via WhatsApp">
                      <Phone size={20} />
                    </a>
                    {/* Instagram */}
                    <a href="https://www.instagram.com/dagg_iq" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-900 border border-white/5 text-pink-400 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:-translate-y-1.5 transition-all duration-300" title="Contact via Instagram">
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0 hidden md:block pl-4">
                <div className="w-32 h-32 lg:w-44 lg:h-44 relative flex items-center justify-center overflow-visible">
                  {/* Glow Behind */}
                  <div className="absolute inset-0 bg-blue-600/20 blur-[40px] rounded-full mix-blend-screen" />

                  {/* Main Center Icon - Monitor */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-20 w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-black border border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-sm"
                  >
                    <Monitor className="w-10 h-10 lg:w-12 lg:h-12 text-blue-400" strokeWidth={1} />

                    {/* Inner Screen Code Pulse */}
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl"
                    >
                      <Code className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-400/80 mb-2" strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>

                  {/* Orbiting Ring 1 */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-10 rounded-full border border-white/[0.08]"
                  >
                    {/* Zap */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-950 border border-indigo-500/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    >
                      <Zap className="w-5 h-5 text-indigo-400" fill="currentColor" />
                    </motion.div>

                    {/* Cpu */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute bottom-[10%] right-[5%] w-11 h-11 bg-gray-950 border border-purple-500/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    >
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </motion.div>
                  </motion.div>

                  {/* Inner subtle orbit ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 z-10 rounded-full border border-dashed border-white/[0.05]"
                  >
                    <div className="absolute top-0 left-4 w-2 h-2 bg-pink-500/80 rounded-full shadow-[0_0_15px_rgba(236,72,153,1)]" />
                    <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-blue-400/80 rounded-full shadow-[0_0_15px_rgba(96,165,250,1)]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </PageLayout>
  );
}
