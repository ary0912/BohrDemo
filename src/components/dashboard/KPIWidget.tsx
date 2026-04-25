import React, { useMemo } from "react";
import { motion } from "framer-motion";
import type { Leak } from "../../types/leak";

interface KPIWidgetProps {
  leaks: Leak[];
}

interface KPICardProps {
  label: string;
  value: string | number;
  unit: string;
  trend?: "up" | "down" | "stable";
  accent: "cyan" | "red" | "amber" | "emerald";
  delay: number;
}

const accentStyles = {
  cyan: {
    bg: "bg-gradient-to-br from-cyan-50 to-blue-50",
    border: "border-cyan-100",
    dot: "bg-cyan-500",
    label: "text-cyan-700",
    value: "text-slate-800",
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 to-orange-50",
    border: "border-red-100",
    dot: "bg-red-500",
    label: "text-red-600",
    value: "text-slate-800",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    border: "border-amber-100",
    dot: "bg-amber-500",
    label: "text-amber-700",
    value: "text-slate-800",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-50 to-green-50",
    border: "border-emerald-100",
    dot: "bg-emerald-500",
    label: "text-emerald-700",
    value: "text-slate-800",
  },
};

const trendIcons = {
  up: "↑",
  down: "↓",
  stable: "→",
};

const trendColors = {
  up: "text-red-500",
  down: "text-emerald-500",
  stable: "text-slate-400",
};

const KPICard = ({ label, value, unit, trend, accent, delay }: KPICardProps) => {
  const s = accentStyles[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`flex-1 ${s.bg} border ${s.border} rounded-xl p-3 flex flex-col gap-1 min-w-0`}
    >
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} aria-hidden="true" />
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${s.label} truncate`}>
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-black leading-none ${s.value}`}>{value}</span>
        <span className="text-[10px] text-slate-400 font-medium">{unit}</span>
        {trend && (
          <span className={`text-xs font-bold ml-auto ${trendColors[trend]}`} aria-label={`Trend: ${trend}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const KPIWidget = ({ leaks }: KPIWidgetProps) => {
  const stats = useMemo(() => {
    const total = leaks.length;
    const critical = leaks.filter((l) => l.severity >= 5).length;
    const avgPpb =
      total === 0
        ? 0
        : Math.round(leaks.reduce((acc, l) => acc + l.concentration_ppb, 0) / total);
    const repaired = leaks.filter((l) => l.status === "repaired").length;
    const complianceRate = total === 0 ? 100 : Math.round(((total - critical) / total) * 100);

    return { total, critical, avgPpb, repaired, complianceRate };
  }, [leaks]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full" role="region" aria-label="Key performance indicators">
      <KPICard
        label="Active Detections"
        value={stats.total}
        unit="total"
        trend="up"
        accent="cyan"
        delay={0}
      />
      <KPICard
        label="Critical Alerts"
        value={stats.critical}
        unit={`of ${stats.total}`}
        trend={stats.critical > 0 ? "up" : "stable"}
        accent="red"
        delay={0.05}
      />
      <KPICard
        label="Avg Concentration"
        value={stats.avgPpb}
        unit="ppb"
        trend="stable"
        accent="amber"
        delay={0.1}
      />
      <KPICard
        label="Compliance"
        value={`${stats.complianceRate}%`}
        unit="LDAR"
        trend={stats.complianceRate >= 90 ? "down" : "up"}
        accent="emerald"
        delay={0.15}
      />
    </div>
  );
};

export default React.memo(KPIWidget);
