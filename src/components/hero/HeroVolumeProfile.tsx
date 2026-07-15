import React, { useMemo } from "react";

export default function HeroVolumeProfile(): React.JSX.Element {
  // Ultra-dense count for pure edge-to-edge resolution coverage
  const barCount = 260;

  const baselineBars = useMemo(() => {
    const bars = [];
    const hvnLeft = barCount * 0.28;
    const hvnRight = barCount * 0.72;
    const centerPoint = Math.floor(barCount * 0.5);

    for (let i = 0; i < barCount; i++) {
      const baseCurve = Math.exp(-Math.pow(i - centerPoint, 2) / (2 * Math.pow(barCount * 0.36, 2))) * 0.45;
      const leftPeak = Math.exp(-Math.pow(i - hvnLeft, 2) / (2 * Math.pow(barCount * 0.1, 2))) * 0.38;
      const rightPeak = Math.exp(-Math.pow(i - hvnRight, 2) / (2 * Math.pow(barCount * 0.1, 2))) * 0.42;
      const centerPeak = Math.exp(-Math.pow(i - centerPoint, 2) / (2 * Math.pow(barCount * 0.08, 2))) * 0.35;

      let rawVolume = baseCurve + leftPeak + rightPeak + centerPeak;
      
      const tickNoise = (Math.sin(i * 1.9) * 0.06) + (Math.cos(i * 3.8) * 0.04);
      rawVolume = Math.max(0.15, Math.min(0.96, rawVolume + tickNoise));

      // Asymmetric sequence to distribute professional order indicators cleanly
      const isEmerald = (i % 6 === 0 || i % 11 === 0);

      bars.push({
        baseRatio: rawVolume,
        isEmerald,
      });
    }
    return bars;
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full min-w-full pointer-events-none select-none z-0 overflow-hidden">
      
      {/* Structural ambient backdrop nodes */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 w-full bg-gradient-to-t from-violet-950/20 via-transparent to-transparent blur-2xl pointer-events-none" />
      <div className="absolute left-1/2 bottom-0 -z-10 h-36 w-full -translate-x-1/2 bg-cyan-500/[0.02] blur-3xl pointer-events-none" />

      {/* - justify-stretch ko replace kiya grid layout se.
        - explicit fixed grid tracking column widths (`minmax(3px,1fr)`) system sets uniform sizing.
        - px-0 ensure lines run flush to 100% monitor margins.
      */}
      <div 
        className="relative grid w-full h-80 px-0 items-end"
        style={{
          gridTemplateColumns: `repeat(${barCount}, minmax(2px, 1fr))`,
          columnGap: '3px', // Explicit premium division layout gap
          contain: 'layout style paint',
          maskImage: "linear-gradient(to right, transparent, white 4%, white 96%, transparent), linear-gradient(to top, white 15%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 4%, white 96%, transparent), linear-gradient(to top, white 15%, transparent 95%)"
        }}
      >
        {baselineBars.map((bar, index) => {
          const heightPct = Math.min(96, bar.baseRatio * 100);

          return (
            <div
              key={index}
              style={{
                height: `${heightPct}%`,
              }}
              className={`
                w-full rounded-t-[1.5px] h-full transition-all duration-300
                ${
                  bar.isEmerald
                    ? "bg-gradient-to-t from-emerald-500/55 via-emerald-400/20 to-transparent"
                    : "bg-gradient-to-t from-violet-500/45 via-violet-400/15 to-transparent"
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
}