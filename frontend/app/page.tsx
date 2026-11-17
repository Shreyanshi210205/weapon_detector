"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Detection = {
  label: string;
  confidence: number;
  timestamp: string;
};

const socket = io("https://weapon-detector-iqcm.onrender.com");

export default function Home() {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [connected, setConnected] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("detection", (data: Detection) => {
      setDetections((prev) => [data, ...prev].slice(0, 50));
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);

      // Beep alert
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.onended = () => ctx.close();
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("detection");
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      {/* Alert banner */}
      {alert && (
        <>
          <div
            role="alert"
            className="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-3 text-lg font-bold animate-pulse z-50"
          >
            ⚠ WEAPON DETECTED — ALERT TRIGGERED
          </div>
          <div aria-hidden="true" className="h-12" />
        </>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Smart Surveillance System</h1>
          <p className="text-gray-400 text-sm mt-1">Real-Time Weapon Detection Dashboard</p>
        </div>
        <div className="flex items-center gap-2" aria-live="polite">
          <div aria-hidden="true" className={`w-3 h-3 rounded-full ${connected ? "bg-green-400" : "bg-red-500"}`} />
          <span className="text-sm text-gray-400">{connected ? "Live" : "Disconnected"}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-gray-400 text-sm">Total Detections</p>
          <p className={`text-4xl font-bold mt-1 ${detections.length > 0 ? "text-red-400" : "text-white"}`}>
            {detections.length}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-gray-400 text-sm">Last Detected</p>
          <p className="text-xl font-semibold mt-1 text-white">
            {detections[0]
              ? new Date(detections[0].timestamp).toLocaleTimeString()
              : "—"}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <p className="text-gray-400 text-sm">System Status</p>
          <p className={`text-xl font-semibold mt-1 ${connected ? "text-green-400" : "text-red-400"}`}>
            {connected ? "Active" : "Offline"}
          </p>
        </div>
      </div>

      {/* Detection log */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold">Detection Log</h2>
          {detections.length > 0 && (
            <button
              onClick={() => setDetections([])}
              className="text-xs text-gray-400 hover:text-white rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500"
            >
              Clear
            </button>
          )}
        </div>

        {detections.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No detections yet</p>
            <p className="text-sm mt-1">Waiting for weapon detector feed...</p>
          </div>
        ) : (
          <ul role="log" aria-label="Detection events" className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto scrollbar-dark">
            {detections.map((d, i) => (
              <li
                key={`${d.timestamp}-${d.label}-${i}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div aria-hidden="true" className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="font-medium text-red-400 uppercase tracking-[0.05em]">{d.label}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap justify-end">
                  <span>
                    Confidence:{" "}
                    <span className="text-white">{(d.confidence * 100).toFixed(1)}%</span>
                  </span>
                  <span>{new Date(d.timestamp).toLocaleTimeString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
