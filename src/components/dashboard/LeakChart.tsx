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
    <div ref={chartContainerRef} className="bohr-panel p-4 sm:p-5 md:p-6 h-55 shadow-xl relative overflow-hidden group">
      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
        <div className="flex flex-col">
          <h3 className="text-label mb-1 text-cyan-400/70">Real-time Telemetry</h3>
          <span className="text-title-sm">
            Intensity <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">(ppm)</span>
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 ring-1 ring-inset ring-cyan-500/20 px-3 py-1.5 rounded-full">
          <div className="w-1 h-1 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse" />
          <span className="text-hint text-cyan-400 font-bold">Live</span>
        </div>
      </div>
      
      <div className="h-40 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leaks}>
            <defs>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="#1e293b" 
              opacity={0.2}
            />
            <XAxis dataKey="timestamp" hide />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 10]}
              tick={{ fill: '#94a3b8', fontWeight: 600 }}
              tickFormatter={(v) => `${v * 10}`}
              tickCount={3}
            />
            <Tooltip 
              cursor={{ stroke: '#1e293b', strokeWidth: 1 }}
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                borderColor: 'rgba(6, 182, 212, 0.3)', 
                borderRadius: '12px', 
                fontSize: '12px',
                color: '#f1f5f9',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              labelStyle={{ display: 'none' }}
              itemStyle={{ color: '#06b6d4', padding: 0 }}
              formatter={(value: number | any) => [`${value * 10} ppm`, "Current"]}
            />
            <Area 
              type="monotone" 
              dataKey="severity" 
              stroke="#06b6d4" 
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