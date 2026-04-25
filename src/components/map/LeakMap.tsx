import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import type { Leak } from "../../types/leak";
import { getSeverityConfig } from "../../types/leak";
import React from "react";
import "leaflet/dist/leaflet.css";

const statusLabels: Record<string, string> = {
  detected: "Detected",
  investigating: "Investigating",
  confirmed: "Confirmed",
  repaired: "Repaired",
};

const detectorLabels: Record<string, string> = {
  AMLD: "AMLD (Mobile)",
  handheld: "Handheld",
  fixed_sensor: "Fixed Sensor",
};

const LeakMap = ({ leaks }: { leaks: Leak[] }) => {
  return (
    <div className="h-full w-full relative" role="region" aria-label="Methane leak map">
      <MapContainer
        center={[51.4545, -2.5879]}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> | Bohr Ops'
        />

        <ZoomControl position="bottomleft" />

        {leaks.map((leak) => {
          const config = getSeverityConfig(leak.severity);
          const isCritical = leak.severity >= 5;
          return (
            <CircleMarker
              key={leak.id}
              center={[leak.lat, leak.lng]}
              radius={isCritical ? 10 : 7}
              pathOptions={{
                color: config.color,
                fillColor: config.color,
                fillOpacity: isCritical ? 0.4 : 0.25,
                weight: isCritical ? 2.5 : 1.5,
              }}
            >
              <Popup className="bohr-popup">
                <div className="p-3.5 bg-white rounded-xl min-w-[220px]">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Leak Report
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                      style={{ color: config.color, backgroundColor: config.bg }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <PopupRow label="ID" value={leak.id} />
                    <PopupRow label="Location" value={leak.address} />
                    <PopupRow
                      label="Concentration"
                      value={`${leak.concentration_ppb} ppb`}
                      valueColor={config.color}
                    />
                    <PopupRow label="Flow Rate" value={`${leak.flow_rate_gh} g/h`} />
                    <PopupRow label="Detector" value={detectorLabels[leak.detector_type] ?? leak.detector_type} />
                    <PopupRow label="Status" value={statusLabels[leak.status] ?? leak.status} />
                    <PopupRow label="Survey" value={leak.survey_id} />
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div
        className="absolute left-3 sm:left-4 bottom-12 sm:bottom-14 pointer-events-none"
        style={{ zIndex: 1000 }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-slate-200 shadow-sm pointer-events-auto">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Severity
          </span>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Nominal (≤2)", color: "#059669" },
              { label: "Review (3–4)", color: "#d97706" },
              { label: "Action (≥5)", color: "#dc2626" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PopupRow = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <div className="flex justify-between items-center gap-3">
    <span className="text-[10px] font-semibold text-slate-400 uppercase shrink-0">{label}</span>
    <span
      className="text-[11px] font-bold text-right"
      style={{ color: valueColor ?? "#334155" }}
    >
      {value}
    </span>
  </div>
);

export default React.memo(LeakMap);
