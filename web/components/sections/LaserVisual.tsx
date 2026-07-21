import { laserSection } from "@/content/site";

/*
 * CSS-only mock of a laser wood-cleaning pass. The head carriage sweeps the
 * rail while a "cleaned wood" layer is revealed behind the beam — both driven
 * by the same 9s linear timeline (laser-sweep / laser-clean), so the reveal
 * edge always sits exactly under the beam.
 *
 * Static fallback (prefers-reduced-motion kills all animation): the inline
 * base styles freeze the scene mid-pass — head at 62%, board 64% cleaned.
 */

/** Head x-position of the frozen (reduced-motion) scene, in panel %. */
const STATIC_HEAD_LEFT = "62%";
/** Matching clip inset for the clean layer: (100 - (62-8)/84*100)%. */
const STATIC_CLEAN_CLIP = "inset(0 35.7% 0 0)";

/** Shared wood-grain streaks — identical geometry on both layers so the grain
 *  lines up; only the tint changes between weathered and cleaned wood. */
const GRAIN = (warmth: string) =>
  `repeating-linear-gradient(91deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 5px, ${warmth} 5px, ${warmth} 9px, transparent 9px, transparent 16px)`;

const KNOTS = (ink: string) =>
  `radial-gradient(ellipse 22px 10px at 24% 35%, ${ink}, transparent 70%), radial-gradient(ellipse 26px 11px at 76% 62%, ${ink}, transparent 70%)`;

const WEATHERED_WOOD = [
  KNOTS("rgba(30,22,14,0.5)"),
  GRAIN("rgba(255,220,170,0.02)"),
  "linear-gradient(90deg, #33281c, #3e3023 30%, #35291d 55%, #2c2318 80%, #362a1e)",
].join(", ");

const GRIME = [
  "radial-gradient(60px 24px at 30% 40%, rgba(96,88,78,0.28), transparent 70%)",
  "radial-gradient(80px 30px at 68% 70%, rgba(96,88,78,0.22), transparent 70%)",
  "repeating-linear-gradient(87deg, rgba(110,102,92,0.16) 0px, rgba(110,102,92,0.16) 14px, rgba(60,52,44,0.1) 14px, rgba(60,52,44,0.1) 30px, rgba(130,120,108,0.12) 30px, rgba(130,120,108,0.12) 44px)",
].join(", ");

const CLEAN_WOOD = [
  KNOTS("rgba(52,34,16,0.5)"),
  "linear-gradient(115deg, rgba(255,230,180,0.12), transparent 40%)",
  GRAIN("rgba(255,200,130,0.06)"),
  "linear-gradient(90deg, #6b4d2a, #7d5c34 35%, #6f5230 60%, #5f452a 85%, #6b4d2a)",
].join(", ");

const cornerBase = "absolute size-3 border-laser/30";

export function LaserVisual() {
  return (
    <div
      aria-hidden
      className="relative aspect-[16/12] overflow-hidden rounded-media border border-laser/18 bg-laser-screen shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_0_60px_rgba(85,217,255,0.04)]"
    >
      {/* Blueprint grid + HUD frame */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(85,217,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(85,217,255,0.045)_1px,transparent_1px)] bg-size-[34px_34px] [mask-image:radial-gradient(120%_100%_at_50%_40%,#000,transparent_82%)]" />
      <span className={`${cornerBase} top-2.5 left-2.5 border-t border-l`} />
      <span className={`${cornerBase} top-2.5 right-2.5 border-t border-r`} />
      <span className={`${cornerBase} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${cornerBase} right-2.5 bottom-2.5 border-r border-b`} />

      {/* Ruler */}
      <div className="absolute inset-x-[8%] top-4 h-2 bg-[repeating-linear-gradient(90deg,rgba(150,170,188,0.4)_0,rgba(150,170,188,0.4)_1px,transparent_1px,transparent_11px)] opacity-60" />
      <div className="absolute inset-x-[8%] top-4 h-3.5 bg-[repeating-linear-gradient(90deg,rgba(150,170,188,0.5)_0,rgba(150,170,188,0.5)_1px,transparent_1px,transparent_55px)] opacity-60" />
      <span className="absolute top-8 left-[8%] font-mono text-[10.5px] text-[#8a9aab]">
        {laserSection.rulerStart}
      </span>
      <span className="absolute top-8 right-[8%] font-mono text-[10.5px] text-[#8a9aab]">
        {laserSection.rulerEnd}
      </span>

      {/* Gantry rail — extruded profile with end blocks */}
      <div className="absolute inset-x-[5%] top-[26%] h-2.5 rounded-[3px] border border-[rgba(150,170,188,0.28)] bg-[linear-gradient(180deg,#46525f,#232c35_45%,#39434e_55%,#161d24)] shadow-[0_3px_10px_rgba(0,0,0,0.5)]" />
      <div className="absolute top-[calc(26%-5px)] left-[3.5%] h-5 w-2.5 rounded-[2px] border border-[rgba(150,170,188,0.3)] bg-[linear-gradient(180deg,#3c4854,#1b232b)]" />
      <div className="absolute top-[calc(26%-5px)] right-[3.5%] h-5 w-2.5 rounded-[2px] border border-[rgba(150,170,188,0.3)] bg-[linear-gradient(180deg,#3c4854,#1b232b)]" />

      {/* Board — weathered wood base + grime, cleaned layer revealed on top */}
      <div className="absolute inset-x-[8%] top-[52%] bottom-[13%] overflow-hidden rounded-[5px] border border-black/40 shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0" style={{ background: WEATHERED_WOOD }} />
        <div className="absolute inset-0" style={{ background: GRIME }} />
        <div
          className="absolute inset-0 animate-laser-clean"
          style={{ background: CLEAN_WOOD, clipPath: STATIC_CLEAN_CLIP }}
        />
        {/* Board thickness (front edge) — constant, sits above both faces */}
        <div className="absolute inset-x-0 bottom-0 h-[7px] bg-[linear-gradient(180deg,rgba(0,0,0,0.38),rgba(0,0,0,0.6))]" />
      </div>

      {/* Head assembly — zero-width anchor travelling with laser-sweep */}
      <div
        className="absolute inset-y-0 w-0 animate-laser-sweep"
        style={{ left: STATIC_HEAD_LEFT }}
      >
        {/* Position guide: ruler → carriage */}
        <div className="absolute top-[9%] bottom-[76%] left-0 w-px -translate-x-1/2 bg-laser/15" />

        {/* Carriage on the rail */}
        <div className="absolute top-[calc(26%-10px)] left-0 h-[27px] w-[46px] -translate-x-1/2 rounded-[5px] border border-[rgba(150,170,188,0.4)] bg-[linear-gradient(180deg,#55636f,#2b3540_55%,#1d252d)] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="absolute top-1.25 left-1.25 size-1 rounded-full bg-[#141a20] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.12)]" />
          <span className="absolute top-1.25 right-1.25 size-1 rounded-full bg-[#141a20] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.12)]" />
          <span className="absolute right-1.5 bottom-1.25 size-1 rounded-full bg-laser shadow-[0_0_5px] shadow-laser" />
        </div>

        {/* Neck + tapered nozzle + lens */}
        <div className="absolute top-[calc(26%+17px)] left-0 h-3.5 w-2.5 -translate-x-1/2 border-x border-[rgba(150,170,188,0.3)] bg-[linear-gradient(180deg,#333e48,#1a2129)]" />
        <div
          className="absolute top-[calc(26%+31px)] left-0 h-[20px] w-[22px] -translate-x-1/2 bg-[linear-gradient(180deg,#3e4a56,#232c35_70%,#101418)]"
          style={{ clipPath: "polygon(18% 0, 82% 0, 64% 100%, 36% 100%)" }}
        />
        <span className="absolute top-[calc(26%+49px)] left-0 size-1 -translate-x-1/2 rounded-full bg-[#d8f6ff] shadow-[0_0_6px_2px_rgba(85,217,255,0.8)]" />

        {/* Focus cone + beam core, nozzle tip → board surface */}
        <div
          className="absolute left-0 w-[26px] -translate-x-1/2 bg-linear-to-b from-laser/4 to-laser/14"
          style={{
            top: "calc(26% + 51px)",
            height: "calc(26% - 51px)",
            clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute left-0 w-[2px] -translate-x-1/2 animate-beam-flicker bg-[linear-gradient(180deg,rgba(216,246,255,0.95),rgba(85,217,255,0.55))] shadow-[0_0_8px_rgba(85,217,255,0.9),0_0_20px_rgba(85,217,255,0.45)]"
          style={{ top: "calc(26% + 51px)", height: "calc(26% - 51px)" }}
        />

        {/* Contact point on the board surface: flare + halos + white-hot core */}
        <div className="absolute top-[calc(52%-1px)] left-1/2 h-[2px] w-[90px] bg-[linear-gradient(90deg,transparent,rgba(85,217,255,0.55)_18%,#d8f6ff_50%,rgba(85,217,255,0.55)_82%,transparent)] blur-[0.5px] [transform:translateX(-50%)]" />
        <div className="absolute top-[calc(52%-7px)] left-1/2 h-3.5 w-[70px] rounded-full bg-radial from-laser/35 to-transparent to-70% [transform:translateX(-50%)]" />
        <div className="absolute top-[calc(52%-11px)] left-1/2 size-[22px] animate-glow-pulse rounded-full bg-radial from-white/95 via-laser/65 via-30% to-transparent to-70%" />
        <span className="absolute top-[calc(52%-2.5px)] left-1/2 size-[5px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.85)]" />

        {/* Sparks + smoke drifting over the cleaned side */}
        <span className="absolute top-[calc(52%-4px)] left-0 size-[3px] animate-spark-l rounded-full bg-[#d8f6ff] opacity-0 shadow-[0_0_5px] shadow-laser" />
        <span className="absolute top-[calc(52%-3px)] left-1 size-0.5 animate-spark-r rounded-full bg-white opacity-0 shadow-[0_0_5px] shadow-laser" />
        <span
          className="absolute top-[calc(52%-5px)] -left-1 size-0.5 animate-spark-l rounded-full bg-[#8be7ff] opacity-0 shadow-[0_0_5px] shadow-laser"
          style={{ animationDelay: "0.6s", animationDuration: "1.1s" }}
        />
        <span
          className="absolute top-[calc(52%-10px)] -left-2 size-4 animate-smoke-rise rounded-full bg-[radial-gradient(circle,rgba(190,200,210,0.5),transparent_70%)] opacity-0 blur-[3px]"
        />
        <span
          className="absolute top-[calc(52%-8px)] -left-4 size-3 animate-smoke-rise rounded-full bg-[radial-gradient(circle,rgba(190,200,210,0.4),transparent_70%)] opacity-0 blur-[3px]"
          style={{ animationDelay: "1.4s" }}
        />
      </div>

      {/* Readouts */}
      <span className="absolute bottom-3.5 left-[8%] font-mono text-[10.5px] tracking-[0.14em] text-laser opacity-85">
        {laserSection.visualMode}
      </span>
      <span className="absolute right-[8%] bottom-3.5 font-mono text-[10.5px] tracking-[0.14em] text-[#8a9aab]">
        {laserSection.visualParams}
      </span>
    </div>
  );
}
