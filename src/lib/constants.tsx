import React from "react";
import { Clock, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { OrderData } from "./firebase";

export const STATUS_CONFIG: Record<OrderData["status"], { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: { label: "قيد الانتظار", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Clock size={14} /> },
  processing: { label: "قيد المعالجة", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: <RefreshCw size={14} /> },
  completed: { label: "مكتمل", color: "#22c55e", bg: "rgba(34,197,94,0.1)", icon: <CheckCircle2 size={14} /> },
  cancelled: { label: "ملغي", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: <XCircle size={14} /> },
};

export const ITEM_TYPE_LABELS: Record<string, string> = {
  service: "خدمة",
  package: "باقة",
  offer: "عرض",
};
