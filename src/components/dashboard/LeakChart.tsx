import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Leak } from "../../types/leak";
import { useEffect, useRef } from "react";
import gsap from "gsap";

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
    <div ref={chartContainerRef} className="bohr-panel bg-white p-4 sm:p-5 md:p-6 h-55 shadow-md relative overflow-hidden group border border-slate-200 rounded-xl">
      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
        <div className="flex flex-col">
          <h3 className="text-label mb-1 text-slate-500">Real-time Telemetry</h3>
          <span className="text-title-sm text-slate-800">
            Intensity <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">(ppm)</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 px-3 py-1.5 rounded-full shadow-sm">
          <div className="w-1 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" />
          <span className="text-hint text-cyan-700 font-bold">Live</span>
        </div>
      </div>
      
      <div className="h-40 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leaks}>
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
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
              tick={{ fill: '#64748b', fontWeight: 600 }}
              tickFormatter={(v) => `${v * 10}`}
              tickCount={3}
            />
            <Tooltip 
              cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderColor: 'rgba(6, 182, 212, 0.2)', 
                borderRadius: '12px', 
                fontSize: '12px',
                color: '#1e293b',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: '#0891b2', padding: 0 }}
              formatter={(value: number | any) => [`${value * 10} ppm`, "Current"]}
            />
            <Area 
              type="monotone" 
              dataKey="severity" 
              stroke="#0891b2" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorIntensity)" 
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeakChart;