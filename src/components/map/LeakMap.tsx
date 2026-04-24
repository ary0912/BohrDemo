import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import type { Leak } from "../../types/leak";
import React from "react";
import "leaflet/dist/leaflet.css";

const getColor = (severity: number) => {
  if (severity <= 2) return "var(--color-safe)";
  if (severity <= 4) return "var(--color-warn)";
  return "var(--color-alert)";
};

const LeakMap = ({ leaks }: { leaks: Leak[] }) => {
  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[51.4545, -2.5879]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; Bohr | Tectrac GeoSystems'
        />
        
        <ZoomControl position="bottomleft" />

        {leaks.map((leak) => (
          <CircleMarker
            key={leak.id}
            center={[leak.lat, leak.lng]}
            radius={8}
            pathOptions={{
              color: getColor(leak.severity),
              fillColor: getColor(leak.severity),
              fillOpacity: 0.25,
              weight: 2,
            }}
          >
            <Popup className="bohr-popup">
              <div className="p-3 bg-white rounded-xl ring-1 ring-slate-200 min-w-37.5 shadow-xl">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 border-b border-slate-100 pb-1.5 flex justify-between items-center">
                  <span>Sensor Metadata</span>
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Node ID</span>
                    <span className="text-[9px] font-mono font-bold text-slate-700 uppercase italic">#{leak.id.slice(0, 5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Concentration</span>
                    <span className="text-[10px] font-black" style={{ color: getColor(leak.severity) }}>
                       {leak.severity * 14} ppm
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      {/* Precision UI Overlays (Bottom left for map-first) */}
      <div className="absolute left-4 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:bottom-8 z-1000 pointer-events-none">
         <div className="bohr-panel p-3 sm:p-4 pointer-events-auto bg-white/90 border border-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8">
                {[
                  {l: "Nominal", c: "var(--color-safe)"}, 
                  {l: "Review", c: "var(--color-warn)"}, 
                  {l: "Action", c: "var(--color-alert)"}
                ].map(i => (
                  <div key={i.l} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full shadow-sm" style={{backgroundColor: i.c}} />
                      <span className="text-label text-slate-600 text-xs sm:text-sm">{i.l}</span>
                  </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default React.memo(LeakMap);