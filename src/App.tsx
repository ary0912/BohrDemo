import React, { Suspense } from "react";
import AppLayout from "./components/layout/AppLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// Fallback component for lazy loading
const Loader = () => (
  <div className="flex h-full w-full items-center justify-center bg-slate-50">
    <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Main Bohr Operations Command Center */}
          <Route 
            path="/" 
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;