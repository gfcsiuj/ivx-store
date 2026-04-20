import { useState, useEffect } from "react";
import { Save, Loader2, Globe, MessageCircle, Phone, Settings, CheckCircle2, MapPin, Mail } from "lucide-react";
import { SocialIcons } from "../SocialIcons";
import { SiteSettings, getSettings, saveSettings, getServiceTypes, saveServiceTypes } from "../../lib/firebase";

interface AdminSettingsProps {
  onCountChange?: (count: number) => void;
}

export function AdminSettings({ onCountChange }: AdminSettingsProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    Promise.all([getSettings(), getServiceTypes()]).then(([s, t]) => {
      setSettings(s);
      setServiceTypes(t);
      onCountChange?.(0);
      setLoading(false);
    });
  }, []);

  const handleChange = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await saveSettings(settings);
      await saveServiceTypes(serviceTypes);
      setToast("✅ تم حفظ الإعدادات بنجاح!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
      setToast("❌ حدث خطأ أثناء الحفظ");
      setTimeout(() => setToast(""), 3000);
    }
    setSaving(false);
  };

  const addServiceType = () => {
    if (!newType.trim() || serviceTypes.includes(newType.trim())) return;
    setServiceTypes((prev) => [...prev, newType.trim()]);
    setNewType("");
  };

  const removeServiceType = (type: string) => {
    setServiceTypes((prev) => prev.filter((t) => t !== type));
  };



  if (loading || !settings) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
        <Loader2 size={32} style={{ animation: "spin 1s linear infinite", color: "#555" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-6xl mx-auto">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3 font-arabic">
            <Settings className="text-indigo-400" size={28} />
            إعدادات النظام الشاملة
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-arabic">التحكم بكافة الروابط ومعلومات التواصل الخاصة بالموقع.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center gap-2" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>



      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="admin-editor-form" style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Phone size={18} color="#22c55e" />
            <span style={{ fontWeight: 800, fontSize: "1rem" }}>معلومات التواصل</span>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">رقم الواتساب</label>
              <input
                className="admin-form-input"
                value={settings.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                placeholder="964XXXXXXXXXX"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">البريد الإلكتروني</label>
              <input
                className="admin-form-input"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="support@example.com"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">رقم الهاتف (في بطاقة اتصل بنا)</label>
              <input
                className="admin-form-input"
                value={settings.contactPhoneNumber || ""}
                onChange={(e) => handleChange("contactPhoneNumber", e.target.value)}
                placeholder="+964 783 079 6658"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">الإيميل (في بطاقة الإيميل)</label>
              <input
                className="admin-form-input"
                value={settings.contactEmail || ""}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                placeholder="support@ivx.com"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">رابط تيليجرام</label>
              <input
                className="admin-form-input"
                value={settings.telegramUrl}
                onChange={(e) => handleChange("telegramUrl", e.target.value)}
                placeholder="https://t.me/username"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">رابط انستجرام</label>
              <input
                className="admin-form-input"
                value={settings.instagramUrl}
                onChange={(e) => handleChange("instagramUrl", e.target.value)}
                placeholder="https://instagram.com/username"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">رابط تويتر/X</label>
              <input
                className="admin-form-input"
                value={settings.twitterUrl}
                onChange={(e) => handleChange("twitterUrl", e.target.value)}
                placeholder="https://x.com/username"
                dir="ltr"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">رابط تيك توك</label>
              <input
                className="admin-form-input"
                value={settings.tiktokUrl}
                onChange={(e) => handleChange("tiktokUrl", e.target.value)}
                placeholder="https://tiktok.com/@username"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Service Types + Platform Types + Site Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Service Types */}
          <div className="admin-editor-form" style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Globe size={18} color="#3b82f6" />
              <span style={{ fontWeight: 800, fontSize: "1rem" }}>أنواع الخدمات</span>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                {serviceTypes.map((type) => (
                  <div
                    key={type}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.4rem 0.75rem",
                      borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#ccc",
                    }}
                  >
                    {type}
                    <button
                      onClick={() => removeServiceType(type)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#666",
                        fontSize: "1rem",
                        lineHeight: 1,
                        fontFamily: "inherit",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {serviceTypes.length === 0 && (
                  <span style={{ color: "#444", fontSize: "0.85rem" }}>لا توجد أنواع بعد</span>
                )}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  className="admin-form-input"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  placeholder="اكتب نوع جديد..."
                  onKeyDown={(e) => e.key === "Enter" && addServiceType()}
                  style={{ flex: 1 }}
                />
                <button className="admin-btn admin-btn-secondary" onClick={addServiceType} style={{ whiteSpace: "nowrap" }}>
                  إضافة
                </button>
              </div>
            </div>
          </div>

          {/* Site Content */}
          <div className="admin-editor-form" style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MessageCircle size={18} color="#a855f7" />
              <span style={{ fontWeight: 800, fontSize: "1rem" }}>محتوى الموقع</span>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">عنوان Hero</label>
                <input
                  className="admin-form-input"
                  value={settings.heroTitle}
                  onChange={(e) => handleChange("heroTitle", e.target.value)}
                  placeholder="IVX Store"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">العنوان الفرعي</label>
                <input
                  className="admin-form-input"
                  value={settings.heroSubtitle}
                  onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                  placeholder="متجرك الأول للألعاب"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">نص أوقات العمل (في صفحة تواصل)</label>
                <input
                  className="admin-form-input"
                  value={settings.workingHoursText || ""}
                  onChange={(e) => handleChange("workingHoursText", e.target.value)}
                  placeholder="نحن متاحون للرد على مكالماتك خلال أوقات العمل."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">نص الإيميل (في صفحة تواصل)</label>
                <input
                  className="admin-form-input"
                  value={settings.emailContactText || ""}
                  onChange={(e) => handleChange("emailContactText", e.target.value)}
                  placeholder="أرسل لنا استفسارك وسنرد عليك بأقرب وقت."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">عنوان الموقع (في صفحة تواصل)</label>
                <input
                  className="admin-form-input"
                  value={settings.locationTitle || ""}
                  onChange={(e) => handleChange("locationTitle", e.target.value)}
                  placeholder="متجر إلكتروني يخدم جميع أنحاء العالم."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">تفاصيل الموقع (في صفحة تواصل)</label>
                <input
                  className="admin-form-input"
                  value={settings.locationSubtitle || ""}
                  onChange={(e) => handleChange("locationSubtitle", e.target.value)}
                  placeholder="العراق IQ"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-[0_10px_40px_rgba(34,197,94,0.4)] flex items-center gap-2 animate-bounce z-50">
          <CheckCircle2 size={20} />
          {toast}
        </div>
      )}
    </div>
  );
}
