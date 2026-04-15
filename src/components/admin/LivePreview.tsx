import { useState, useMemo } from "react";
import { CheckCircle2, Sparkles, Send, Minus, Plus, Image, User, Phone, FileText, DollarSign, ChevronDown, Check } from "lucide-react";
import { FormField, ServiceData, PackageData, Currency, formatDisplayPrice, formatPriceWithCommas, getCurrencySymbol } from "../../lib/firebase";

interface ServicePreviewProps {
  mode: "service";
  data: ServiceData;
  showForm: boolean;
}

interface PackagePreviewProps {
  mode: "package";
  data: PackageData;
  showForm: boolean;
}

type LivePreviewProps = ServicePreviewProps | PackagePreviewProps;

// Mini Custom Dropdown for Preview
function PreviewDropdown({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const options = field.options || [];
  const hasPricing = field.pricingEnabled && field.pricingMode === "options_map";
  const currency = field.priceCurrency || "USD";

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "0.55rem 0.75rem",
          borderRadius: "0.6rem",
          background: "rgba(0,0,0,0.5)",
          border: `1px solid rgba(255,255,255,${isOpen ? "0.2" : "0.08"})`,
          color: value ? "#fff" : "#555",
          fontSize: "0.8rem",
          fontWeight: 600,
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          fontFamily: "inherit",
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: 0 }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
            {value || field.placeholder || "اختر..."}
          </span>
          {hasPricing && value && field.optionPrices?.[value] !== undefined && (
            <span style={{
              fontSize: "0.7rem", fontWeight: 800, color: "#4ade80",
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
              padding: "0.1rem 0.4rem", borderRadius: "0.3rem", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {formatPriceWithCommas(String(field.optionPrices[value]))} {getCurrencySymbol(currency)}
            </span>
          )}
        </div>
        <ChevronDown size={14} style={{ color: "#666", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>

      {isOpen && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 50,
          background: "rgba(15,15,15,0.98)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.6rem",
          overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          maxHeight: "160px", overflowY: "auto",
        }}>
          {options.map((opt, i) => {
            const optPrice = hasPricing && field.optionPrices?.[opt] !== undefined ? field.optionPrices[opt] : null;
            const isSelected = value === opt;
            return (
              <button key={i} type="button"
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{
                  width: "100%", padding: "0.5rem 0.75rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.4rem",
                  fontFamily: "inherit", fontSize: "0.78rem", fontWeight: 600,
                  color: isSelected ? "#fff" : "#ccc", textAlign: "right",
                  background: isSelected ? "rgba(255,255,255,0.06)" : "transparent",
                  borderBottom: i < options.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isSelected ? "rgba(255,255,255,0.06)" : "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: 0 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{opt}</span>
                  {optPrice !== null && (
                    <span style={{
                      fontSize: "0.68rem", fontWeight: 800, color: "#4ade80",
                      background: "rgba(34,197,94,0.08)", padding: "0.05rem 0.35rem",
                      borderRadius: "0.25rem", whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {formatPriceWithCommas(String(optPrice))} {getCurrencySymbol(currency)}
                    </span>
                  )}
                </div>
                {isSelected && <Check size={12} style={{ color: "#4ade80", flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Price breakdown for preview
function PreviewPriceBar({ breakdown, total, currency }: { breakdown: { label: string; value: number }[]; total: number; currency: Currency }) {
  if (breakdown.length === 0 && total === 0) return null;
  const sym = getCurrencySymbol(currency);
  return (
    <div style={{
      margin: "0.75rem 0", borderRadius: "0.65rem", overflow: "hidden",
      background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.3rem",
        padding: "0.45rem 0.65rem", fontSize: "0.7rem", fontWeight: 800,
        color: "#4ade80", background: "rgba(34,197,94,0.06)",
        borderBottom: "1px solid rgba(34,197,94,0.1)",
      }}>
        <DollarSign size={12} />
        <span>ملخص التسعير</span>
      </div>
      <div style={{ padding: "0.45rem 0.65rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
        {breakdown.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#4ade80", whiteSpace: "nowrap" }}>{formatPriceWithCommas(String(item.value))} {sym}</span>
          </div>
        ))}
        {breakdown.length > 0 && (
          <>
            <div style={{ height: "1px", background: "linear-gradient(to left, transparent, rgba(34,197,94,0.2), transparent)", margin: "0.1rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.2rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 900, color: "#fff" }}>الإجمالي</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#4ade80", textShadow: "0 0 8px rgba(34,197,94,0.3)" }}>{formatPriceWithCommas(String(total))} {sym}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FormPreview({ fields, title, basePrice, baseCurrency }: { fields: FormField[]; title: string; basePrice?: number; baseCurrency?: Currency }) {
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const currency = baseCurrency || "USD";

  const getValue = (fieldId: string, defaultVal: any = "") => {
    return fieldValues[fieldId] ?? defaultVal;
  };

  const setValue = (fieldId: string, val: any) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: val }));
  };

  const visibleFields = fields.filter(f => !f.deleted);

  // Dynamic pricing calculation
  const { breakdown, total, hasPricing } = useMemo(() => {
    const items: { label: string; value: number }[] = [];
    let runningTotal = 0;
    let anyPricing = false;

    if (basePrice && basePrice > 0 && !isNaN(basePrice)) {
      items.push({ label: title || "السعر الأساسي", value: basePrice });
      runningTotal += basePrice;
      anyPricing = true;
    }

    for (const field of visibleFields) {
      if (!field.pricingEnabled) continue;
      const val = fieldValues[field.id];

      if (field.pricingMode === "options_map" && field.type === "select") {
        if (val && field.optionPrices?.[val] !== undefined) {
          const price = field.optionPrices[val];
          if (price > 0) {
            items.push({ label: `${field.label}: ${val}`, value: price });
            runningTotal += price;
            anyPricing = true;
          }
        }
      } else if (field.pricingMode === "per_unit") {
        const qty = Number(val) || 0;
        const unitPrice = field.pricePerUnit || 0;
        if (qty > 0 && unitPrice > 0) {
          const itemTotal = qty * unitPrice;
          items.push({ label: `${field.label}: ${qty} × ${formatPriceWithCommas(String(unitPrice))}`, value: itemTotal });
          runningTotal += itemTotal;
          anyPricing = true;
        }
      } else if (field.pricingMode === "fixed") {
        const fixedP = field.fixedPrice || 0;
        if (fixedP > 0 && val) {
          items.push({ label: field.label, value: fixedP });
          runningTotal += fixedP;
          anyPricing = true;
        }
      }
    }

    return { breakdown: items, total: runningTotal, hasPricing: anyPricing };
  }, [fieldValues, visibleFields, basePrice, title]);

  return (
    <div className="preview-form">
      <div className="preview-form-title">
        <div className="preview-form-title-icon">
          <Sparkles size={16} color="#000" />
        </div>
        <h4>طلب خدمة</h4>
      </div>

      {/* Selected item */}
      <div className="preview-form-field">
        <label>الخدمة / الباقة المطلوبة</label>
        <div
          style={{
            padding: "0.65rem 0.85rem",
            borderRadius: "0.75rem",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "0.4rem",
              height: "0.4rem",
              borderRadius: "50%",
              background: "#fff",
              animation: "previewPulse 2s ease-in-out infinite",
            }}
          />
          {title || "عنوان الخدمة"}
        </div>
      </div>

      {/* Dynamic Fields */}
      {visibleFields.map((field) => (
        <div className="preview-form-field" key={field.id}>
          <label>
            {field.label || "اسم الحقل"} {field.required && <span style={{ color: "#f87171" }}>*</span>}
          </label>

          {field.type === "text" && (
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                placeholder={field.placeholder || "أدخل النص..."}
                value={getValue(field.id)}
                onChange={(e) => setValue(field.id, e.target.value)}
                style={field.id === "customerName" ? { width: "100%", paddingRight: "2.5rem" } : { width: "100%" }}
              />
              {field.id === "customerName" && (
                <User size={16} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
              )}
            </div>
          )}

          {field.type === "email" && (
            <input
              type="email"
              placeholder={field.placeholder || "example@email.com"}
              value={getValue(field.id)}
              onChange={(e) => setValue(field.id, e.target.value)}
              dir="ltr"
              style={{ textAlign: "right" }}
            />
          )}

          {field.type === "tel" && (
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="tel"
                placeholder={field.placeholder || "07X XXXX XXXX"}
                value={getValue(field.id)}
                onChange={(e) => setValue(field.id, e.target.value)}
                dir="ltr"
                style={field.id === "customerPhone" ? { width: "100%", textAlign: "right", paddingRight: "2.5rem" } : { width: "100%", textAlign: "right" }}
              />
              {field.id === "customerPhone" && (
                <Phone size={16} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
              )}
            </div>
          )}

          {field.type === "number" && (
            <div>
              <input
                type="number"
                placeholder={field.placeholder || "0"}
                value={getValue(field.id)}
                onChange={(e) => setValue(field.id, e.target.value)}
                min={field.min}
                max={field.max}
                step={field.step ?? 1}
              />
              {field.pricingEnabled && field.pricingMode === "per_unit" && field.pricePerUnit && (
                <div style={{ marginTop: "0.25rem", fontSize: "0.65rem", color: "#555", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <DollarSign size={10} />
                  سعر الوحدة: {formatPriceWithCommas(String(field.pricePerUnit))} {getCurrencySymbol(field.priceCurrency || currency)}
                </div>
              )}
            </div>
          )}

          {field.type === "counter" && (() => {
            const min = field.min ?? 0;
            const max = field.max ?? 999;
            const step = field.step ?? 1;
            const val = Number(getValue(field.id, min));
            const hasUnitPrice = field.pricingEnabled && field.pricingMode === "per_unit" && field.pricePerUnit;
            const unitPrice = field.pricePerUnit || 0;
            const lineTotal = val * unitPrice;

            return (
              <div>
                <div className="preview-form-counter">
                  <button
                    type="button"
                    onClick={() => setValue(field.id, Math.max(min, val - step))}
                    style={{ opacity: val <= min ? 0.4 : 1 }}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{val}</span>
                  <button
                    type="button"
                    onClick={() => setValue(field.id, Math.min(max, val + step))}
                    style={{ opacity: val >= max ? 0.4 : 1 }}
                  >
                    <Plus size={14} />
                  </button>
                  {hasUnitPrice && lineTotal > 0 && (
                    <span style={{
                      marginRight: "auto", fontSize: "0.72rem", fontWeight: 800,
                      color: "#4ade80", background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      padding: "0.15rem 0.45rem", borderRadius: "0.35rem",
                    }}>
                      {formatPriceWithCommas(String(lineTotal))} {getCurrencySymbol(field.priceCurrency || currency)}
                    </span>
                  )}
                </div>
                {hasUnitPrice && (
                  <div style={{ marginTop: "0.25rem", fontSize: "0.65rem", color: "#555", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <DollarSign size={10} />
                    سعر الوحدة: {formatPriceWithCommas(String(unitPrice))} {getCurrencySymbol(field.priceCurrency || currency)}
                  </div>
                )}
              </div>
            );
          })()}

          {field.type === "slider" && (() => {
            const min = field.min ?? 0;
            const max = field.max ?? 100;
            const step = field.step ?? 1;
            const val = Number(getValue(field.id, Math.round((min + max) / 2)));
            const hasUnitPrice = field.pricingEnabled && field.pricingMode === "per_unit" && field.pricePerUnit;
            const lineTotal = val * (field.pricePerUnit || 0);

            return (
              <div>
                <input
                  type="range"
                  className="preview-form-slider"
                  min={min}
                  max={max}
                  step={step}
                  value={val}
                  onChange={(e) => setValue(field.id, Number(e.target.value))}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#555", marginTop: "0.25rem" }}>
                  <span>{min}</span>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{val}</span>
                  <span>{max}</span>
                </div>
                {hasUnitPrice && lineTotal > 0 && (
                  <div style={{ marginTop: "0.35rem", textAlign: "center" }}>
                    <span style={{
                      fontSize: "0.72rem", fontWeight: 800,
                      color: "#4ade80", background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      padding: "0.15rem 0.5rem", borderRadius: "0.35rem",
                    }}>
                      = {formatPriceWithCommas(String(lineTotal))} {getCurrencySymbol(field.priceCurrency || currency)}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}

          {field.type === "textarea" && (
            <div style={{ position: "relative", width: "100%" }}>
              <textarea
                placeholder={field.placeholder || "أدخل النص..."}
                rows={3}
                value={getValue(field.id)}
                onChange={(e) => setValue(field.id, e.target.value)}
                style={field.id === "customerNotes" ? { width: "100%", resize: "none", paddingRight: "2.5rem" } : { width: "100%", resize: "none" }}
              />
              {field.id === "customerNotes" && (
                <FileText size={16} style={{ position: "absolute", right: "0.75rem", top: "0.85rem", color: "#555" }} />
              )}
            </div>
          )}

          {field.type === "select" && (
            <PreviewDropdown
              field={field}
              value={getValue(field.id, "")}
              onChange={(val) => setValue(field.id, val)}
            />
          )}
        </div>
      ))}

      {/* Price Breakdown */}
      {hasPricing && (
        <PreviewPriceBar breakdown={breakdown} total={total} currency={currency} />
      )}

      {/* Submit button */}
      <div className="preview-form-submit">
        <Send size={16} />
        <span>تأكيد الطلب</span>
        {hasPricing && total > 0 && (
          <span style={{
            marginRight: "auto", fontSize: "0.7rem", fontWeight: 800,
            background: "rgba(0,0,0,0.15)", padding: "0.15rem 0.45rem",
            borderRadius: "0.3rem",
          }}>
            {formatPriceWithCommas(String(total))} {getCurrencySymbol(currency)}
          </span>
        )}
      </div>
    </div>
  );
}

export function LivePreview(props: LivePreviewProps) {
  if (props.mode === "service") {
    const { data, showForm } = props;
    const displayPrice = formatDisplayPrice(data.price, data.currency);
    const basePrice = data.price ? parseFloat(data.price) : undefined;

    if (showForm) {
      return (
        <div className="admin-preview-panel">
          <div className="admin-preview-header">
            <div className="admin-preview-dot" />
            معاينة نموذج الطلب — تفاعلية
          </div>
          <div className="admin-preview-body">
            <FormPreview fields={data.orderFormFields} title={data.title} basePrice={basePrice} baseCurrency={data.currency} />
          </div>
        </div>
      );
    }

    return (
      <div className="admin-preview-panel">
        <div className="admin-preview-header">
          <div className="admin-preview-dot" />
          معاينة بطاقة الخدمة
        </div>
        <div className="admin-preview-body">
          <div className="preview-service-card">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt=""
                className="preview-service-image"
                style={{ display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="preview-service-image">
                <Image size={32} />
              </div>
            )}
            <div className="preview-service-body">
              {data.type && <div className="preview-service-type">{data.type}</div>}
              <div className="preview-service-title">{data.title || "عنوان الخدمة"}</div>
              <div className="preview-service-desc">{data.description || "وصف الخدمة يظهر هنا..."}</div>
              {displayPrice && <div className="preview-service-price">{displayPrice}</div>}
              <div className="preview-service-btn">أطلب الخدمة</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Package mode
  const { data, showForm } = props;
  const displayPrice = formatDisplayPrice(data.price, data.currency);
  const bgColor = data.bgColor || "#000";
  const accentColor = data.accentColor || "#fff";
  const basePrice = data.price ? parseFloat(data.price) : undefined;

  if (showForm) {
    return (
      <div className="admin-preview-panel">
        <div className="admin-preview-header">
          <div className="admin-preview-dot" />
          معاينة نموذج الطلب — تفاعلية
        </div>
        <div className="admin-preview-body">
          <FormPreview fields={data.orderFormFields} title={data.title} basePrice={basePrice} baseCurrency={data.currency} />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-preview-panel">
      <div className="admin-preview-header">
        <div className="admin-preview-dot" />
        معاينة بطاقة الباقة
      </div>
      <div className="admin-preview-body">
        <div
          className="preview-package-card"
          style={{
            background: bgColor,
            borderColor: `${accentColor}30`,
            boxShadow: `0 0 40px ${accentColor}10`,
          }}
        >
          {data.popular && (
            <div
              className="preview-package-popular"
              style={{
                background: accentColor,
                color: bgColor,
              }}
            >
              الأكثر طلباً
            </div>
          )}
          <div className="preview-package-title" style={{ color: accentColor === "#ffffff" ? "#fff" : accentColor }}>
            {data.title || "عنوان الباقة"}
          </div>
          <div className="preview-package-subtitle">{data.subtitle || "SUBTITLE"}</div>
          <div className="preview-package-desc">{data.description || "وصف الباقة يظهر هنا..."}</div>
          {displayPrice && <div className="preview-package-price">{displayPrice}</div>}
          <div className="preview-package-divider" style={{ background: `linear-gradient(to right, transparent, ${accentColor}20, transparent)` }} />
          <div className="preview-package-features">
            {(data.features?.length ? data.features.filter(f => f) : ["ميزة 1", "ميزة 2"]).map((f, i) => (
              <div className="preview-package-feature" key={i}>
                <div className="preview-package-feature-dot" style={{ background: accentColor }}>
                  <CheckCircle2 size={12} color={bgColor || "#000"} />
                </div>
                <span>{f || "..."}</span>
              </div>
            ))}
          </div>
          <div
            className="preview-package-btn"
            style={{
              borderColor: `${accentColor}50`,
              color: accentColor === "#ffffff" ? "#fff" : accentColor,
            }}
          >
            أطلب الباقة
          </div>
        </div>
      </div>
    </div>
  );
}
