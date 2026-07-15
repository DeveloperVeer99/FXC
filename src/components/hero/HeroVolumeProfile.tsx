import React, { useEffect, useState, useMemo } from "react";

export default function HeroVolumeProfile(): React.JSX.Element {
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Set maximum density for complete edge-to-edge screen distribution
  const barCount = useMemo(() => {
    if (windowWidth < 640) return 100;   // Mobile
    if (windowWidth < 1024) return 180;  // Tablet
    return 320;                          // Desktop (Dense layout across 100% width)
  }, [windowWidth]);

  // Generate continuous high-density distribution (No zero-drops in the center)
  const baselineBars = useMemo(() => {
    const bars = [];
    
    // Key institutional nodes of the session
    const hvnLeft = barCount * 0.3;              // Left Accumulation Peak
    const hvnRight = barCount * 0.7;             // Right Accumulation Peak
    const centerPoint = Math.floor(barCount * 0.5); // Center High Volume Node (HVN)

    for (let i = 0; i < barCount; i++) {
      // 1. Broad continuous background volume (Ensures a solid baseline across the entire chart)
      const baseCurve = Math.exp(-Math.pow(i - centerPoint, 2) / (2 * Math.pow(barCount * 0.4, 2))) * 0.45;

      // 2. High-volume cluster peaks (Keep the center and sides filled beautifully)
      const leftPeak = Math.exp(-Math.pow(i - hvnLeft, 2) / (2 * Math.pow(barCount * 0.12, 2))) * 0.35;
      const rightPeak = Math.exp(-Math.pow(i - hvnRight, 2) / (2 * Math.pow(barCount * 0.12, 2))) * 0.4;
      const centerPeak = Math.exp(-Math.pow(i - centerPoint, 2) / (2 * Math.pow(barCount * 0.08, 2))) * 0.3;

      // Merge all peaks together for a continuous wave-like mountain distribution
      let rawVolume = baseCurve + leftPeak + rightPeak + centerPeak;

      // Localized micro-order variance (Adds realistic noise to individual price ticks)
      const tickNoise = (Math.sin(i * 1.6) * 0.06) + (Math.cos(i * 3.4) * 0.04);
      rawVolume = Math.max(0.12, Math.min(0.95, rawVolume + tickNoise)); // Base floor raised to 0.12 so it never drops to zero

      // Spread emerald green buying imbalance nodes dynamically
      const isEmerald = Math.random() < 0.12;

      bars.push({
        baseRatio: rawVolume,
        isEmerald,
      });
    }
    return bars;
  }, [barCount]);

  const [shifts, setShifts] = useState<number[]>([]);

  useEffect(() => {
    setShifts(new Array(barCount).fill(1));

    // Slow 8-second breathing animation mimicking passive limit orders updating on the order book
    const interval = setInterval(() => {
      setShifts(() => {
        return Array.from({ length: barCount }, () => {
          return 0.9 + Math.random() * 0.2; 
        });
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [barCount]);

  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-0 overflow-hidden">
      
      {/* Glow layers mapped to the baseline profile */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 w-full bg-gradient-to-t from-violet-950/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute left-1/2 bottom-0 -z-10 h-48 w-full -translate-x-1/2 bg-cyan-500/[0.03] blur-3xl" />

      {/* 100% Screen-Width Histogram Container
          - Uses flex-grow with zero margins and gap to touch both edges of the browser
          - Mask layer fades the very edges of the screen smoothly into the black canvas
      */}
      <div 
        className="relative flex items-end justify-center w-full h-80 gap-[1.5px] md:gap-[2px]"
        style={{
          maskImage: "linear-gradient(to right, transparent, white 2%, white 98%, transparent), linear-gradient(to top, white 10%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 2%, white 98%, transparent), linear-gradient(to top, white 10%, transparent 95%)"
        }}
      >
        {baselineBars.map((bar, index) => {
          const shiftModifier = shifts[index] || 1;
          const heightPct = Math.min(96, bar.baseRatio * shiftModifier * 100);

          return (
            <div
              key={index}
              style={{
                height: `${heightPct}%`,
              }}
              className={`
                flex-grow max-w-[5px] rounded-t-[0.5px] transition-all duration-[8000ms] ease-in-out
                ${
                  bar.isEmerald
                    ? "bg-gradient-to-t from-emerald-500/50 via-emerald-400/20 to-transparent"
                    : "bg-gradient-to-t from-violet-500/40 via-violet-400/15 to-transparent"
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
}