import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { Leak } from "../../types/leak";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload && payload.length) {
    const ppm = Math.round(payload[0].value * 14.2);
    const isCritical = payload[0].value >= 5;
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-3 py-2.5 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`w-1.5 h-1.5 rounded-full ${isCritical ? "bg-red-500" : "bg-cyan-500"}`}
          />
          <span className="font-bold text-slate-700">Intensity</span>
        </div>
        <span className={`text-lg font-black ${isCritical ? "text-red-600" : "text-cyan-700"}`}>
          {ppm} <span className="text-xs font-medium text-slate-400">ppm</span>
        </span>
        {isCritical && (
          <p className="mt-1 text-[10px] font-bold text-red-500 uppercase tracking-wide">
            ⚠ Above Action Threshold
          </p>
        )}
      </div>
    );
  }
  return null;
};

const LeakChart = ({ leaks }: { leaks: Leak[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      gsap.fromTo(
        chartContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="bohr-panel bg-white p-4 sm:p-5 md:p-6 shadow-md relative overflow-hidden group border border-slate-200 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
        <div className="flex flex-col">
          <h3 className="text-label mb-1 text-slate-500">Real-time Telemetry</h3>
          <span className="text-title-sm text-slate-800">
            Methane{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Intensity (ppm)
            </span>
          </span>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" />
            <span className="text-hint text-cyan-700 font-bold">Live</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <div className="w-3 h-px bg-red-400 border-dashed border-t border-red-400" />
            <span>Action Threshold (70 ppm)</span>
          </div>
        </div>
      </div>

      <div className="h-40 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leaks} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#cbd5e1"
              opacity={0.5}
            />
            <XAxis dataKey="timestamp" hide />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 10]}
              tick={{ fill: "#64748b", fontWeight: 600 }}
              tickFormatter={(v) => `${v * 10}`}
              tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#94a3b8", strokeWidth: 1 }} />
            {/* Critical Action Threshold */}
            <ReferenceLine
              y={5}
              stroke="#f87171"
              strokeDasharray="5 3"
              strokeWidth={1.5}
              label={{
                value: "Action",
                position: "insideTopRight",
                fill: "#ef4444",
                fontSize: 9,
                fontWeight: 700,
              }}
            />
            <Area
              type="monotone"
              dataKey="severity"
              stroke="#0891b2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIntensity)"
              animationDuration={800}
              dot={false}
              activeDot={{ r: 4, fill: "#0891b2", stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(LeakChart);