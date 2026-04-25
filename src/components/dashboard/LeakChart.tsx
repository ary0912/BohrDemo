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
import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Leak }[];
}) => {
  if (active && payload && payload.length) {
    const leak = payload[0].payload;
    const isCritical = leak.severity >= 5;
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2.5 text-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className={`w-1.5 h-1.5 rounded-full ${isCritical ? "bg-red-500" : "bg-cyan-500"}`}
          />
          <span className="font-semibold text-slate-700">{leak.address}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-lg font-black ${isCritical ? "text-red-600" : "text-cyan-700"}`}>
            {leak.concentration_ppb}
          </span>
          <span className="text-[10px] font-medium text-slate-400">ppb</span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
          <span>{leak.flow_rate_gh} g/h</span>
          <span>{leak.detector_type}</span>
        </div>
        {isCritical && (
          <p className="mt-1.5 text-[10px] font-bold text-red-500 uppercase tracking-wider">
            Above action threshold
          </p>
        )}
      </div>
    );
  }
  return null;
};

const LeakChart = ({ leaks }: { leaks: Leak[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartData = useMemo(() => {
    return leaks.slice(-20).map((leak, idx) => ({
      ...leak,
      index: idx + 1,
    }));
  }, [leaks]);

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
      className="bg-white p-4 sm:p-5 border border-slate-200 rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
            Real-time Telemetry
          </h3>
          <span className="text-sm font-bold text-slate-800">
            Methane Concentration{" "}
            <span className="text-cyan-600">(ppb)</span>
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full">
            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-cyan-700">Live</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <div className="w-3 h-px border-t border-dashed border-red-400" />
            <span>Action threshold (70 ppb)</span>
          </div>
        </div>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="colorConcentration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e2e8f0"
              opacity={0.7}
            />
            <XAxis
              dataKey="index"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontWeight: 500 }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontWeight: 500 }}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }} />
            <ReferenceLine
              y={70}
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
              dataKey="concentration_ppb"
              stroke="#0891b2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorConcentration)"
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
