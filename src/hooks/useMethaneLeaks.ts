import { useEffect, useState } from "react";
import { initialLeaks, generateNewLeak } from "../services/mockData";
import type { Leak } from "../types/leak";

export const useMethaneLeaks = () => {
  const [leaks, setLeaks] = useState<Leak[]>(initialLeaks);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaks((prev) => [...prev, generateNewLeak()]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return leaks;
};