import React, { useMemo } from "react";
import { motion } from "framer-motion";
import type { Leak } from "../../types/leak";

interface KPIWidgetProps {
  leaks: Leak[];
}

const KPICard = ({
  label,
  value,
  sub,
  accent,
  delay,
}: {
  label: string;
  value: string | number;
  sub: string;
  accent: "cyan" | "red" | "amber";
  delay: number;
}) => {
  const accentMap = {
    cyan: {
      bg: "from-cyan-50 to-blue-50",
      border: "border-cyan-100",
      dot: "bg-gradient-to-r from-cyan-500 to-blue-500",
      text: "text-cyan-700",
      value: "text-slate-800",
    },
    red: {
      bg: "from-red-50 to-orange-50",
      border: "border-red-100",
      dot: "bg-gradient-to-r from-red-500 to-orange-400",
      text: "text-red-600",
      value: "text-slate-800",
    },
    amber: {
      bg: "from-amber-50 to-yellow-50",
      border: "border-amber-100",
      dot: "bg-gradient-to-r from-amber-500 to-yellow-400",
      text: "text-amber-700",
      value: "text-slate-800",
    },
  };

  const s = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`flex-1 bg-gradient-to-br ${s.bg} border ${s.border} rounded-xl p-3 flex flex-col gap-1.5 min-w-0`}
    >
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} aria-hidden="true" />
        <span className={`text-[10px] font-bold uppercase tracking-[0.07em] ${s.text} truncate`}>
          {label}
        </span>
      </div>
      <span className={`text-xl font-black leading-none ${s.value}`}>{value}</span>
      <span className="text-[10px] text-slate-400 font-medium truncate">{sub}</span>
    </motion.div>
  );
};

const KPIWidget = ({ leaks }: KPIWidgetProps) => {
  const stats = useMemo(() => {
    const total = leaks.length;
    const critical = leaks.filter((l) => l.severity >= 5).length;
    const avgPpm =
      total === 0
        ? 0
        : Math.round(leaks.reduce((acc, l) => acc + l.severity * 14.2, 0) / total);

    return { total, critical, avgPpm };
  }, [leaks]);

  return (
    <div className="flex gap-2 md:gap-3 w-full" role="region" aria-label="Key Performance Indicators">
      <KPICard
        label="Active Nodes"
        value={stats.total}
        sub="Sensor events total"
        accent="cyan"
        delay={0}
      />
      <KPICard
        label="Critical Alerts"
        value={stats.critical}
        sub="Severity ≥ 5 threshold"
        accent="red"
        delay={0.05}
      />
      <KPICard
        label="Avg Network PPM"
        value={`${stats.avgPpm}`}
        sub="Parts per million"
        accent="amber"
        delay={0.1}
      />
    </div>
  );
};

export default React.memo(KPIWidget);
