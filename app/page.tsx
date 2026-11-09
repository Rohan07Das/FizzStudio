"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import PillNav from "@/components/PillNav";
import TextLoop from "@/components/TextLoop"; // adjust path if located in "@/components/TextLoop"
import { CountUp } from "@/components/CountUp";
import FluidGlass from "@/components/FluidGlass";
import { LiquidGlassButton } from '@/components/LiquidGlassButton';
import FlexCarousel from '@/components/FlexCarousel';
import LiquidGlassSlider from '@/components/LiquidGlassSlider';
import dynamic from 'next/dynamic';

const Folder = dynamic(() => import('@/components/Folder'), {
  ssr: false,
  loading: () => (
    <div className="w-[291px] h-[255px] rounded-2xl bg-cardMuted/30 animate-pulse flex items-center justify-center" />
  ),
});

const FOLDER_ITEMS = [
  { image: '/chair.jpg', title: 'Tactile Architecture' },
  { image: '/tag.png', title: 'brand tags' },
  { image: '/space.png', title: 'logo Engine' },
  { image: '/design.jpg', title: 'poster' },
  { image: '/lift.png', title: 'urban lift' },
  { image: '/format.png', title: 'logo format' },
];

const CAPABILITIES = [
  {
    num: "01",
    title: "Brand Strategy & Narrative",
    desc: "Positioning frameworks that move high-growth technology from category noise into definitive market leadership.",
    tags: ["Category Architecture", "Narrative Design", "Naming Systems", "Decks"],
  },
  {
    num: "02",
    title: "Tactile Flagships & UI/UX",
    desc: "Bespoke digital experiences built with fluid micro-physics, low latency, and distinct editorial gravity.",
    tags: ["Next.js App Router", "Design Architecture", "Interactive 3D", "Sub-50ms"],
  },
  {
    num: "03",
    title: "High-Frequency Engines",
    desc: "Acquisition funnels and launch directives built to turn passive impressions into verified paying accounts.",
    tags: ["Launch Acceleration", "Checkouts", "Telemetry", "CRO Sprints"],
  },
];

// Place this items array above your component or in a data file
const WORK_ITEMS = [
  {
    src: '/grass.jpg',
    alt: 'Directives 01',
    title: 'Organic Launch Campaign',
    subtitle: 'Sustainable Market Positioning'
  },
  {
    src: '/laptop.png',
    alt: 'Directives 02',
    title: 'High-Conversion SaaS Portal',
    subtitle: 'Product Demo & Acquisition Engine'
  },
  {
    src: '/pack.png',
    alt: 'Directives 03',
    title: 'Tactile CPG Packaging',
    subtitle: 'Unboxing Experience & Visual Identity'
  },
  {
    src: '/tag.png',
    alt: 'Directives 04',
    title: 'Direct-to-Consumer Apparel Tag',
    subtitle: 'Micro-Copy & Retail Touchpoints'
  },
  {
    src: '/cap.png',
    alt: 'Directives 05',
    title: 'Streetwear Drop Collateral',
    subtitle: 'Limited-Edition Merch & Lookbook'
  },
  {
    src: '/febric.png',
    alt: 'Directives 06',
    title: 'Material & Texture Narrative',
    subtitle: 'Premium Goods Art Direction'
  },
  {
    src: '/bag.png',
    alt: 'Directives 07',
    title: 'Luxury Leather Goods Campaign',
    subtitle: 'Seasonal Brand Editorial & Ads'
  },
  {
    src: '/road.png',
    alt: 'Directives 08',
    title: 'Out-of-Home Billboard Network',
    subtitle: 'High-Impact Transit Advertising'
  },
  {
    src: '/branch.jpg',
    alt: 'Directives 09',
    title: 'Ecosystem Growth Architecture',
    subtitle: 'Multi-Channel Narrative Strategy'
  },
  {
    src: '/chair.jpg',
    alt: 'Directives 10',
    title: 'Architectural Furniture Launch',
    subtitle: 'Spatial Identity & 3D Interactive Ads'
  }
];

const MARQUEE_CLIENTS = [
  "STRIPE CONNECT",
  "VERCEL PLATFORMS",
  "LINEAR LABS",
  "RAYCAST",
  "SUPABASE",
  "RAMP CAPITAL",
  "NOTION AI",
];

const FAQS = [
  {
    q: "How fast does a flagship directive take?",
    a: "Our core sprint takes 14 business days from kickoff to production deployment. You collaborate directly with principal designers and engineers.",
  },
  {
    q: "Do you use web templates or page builders?",
    a: "Zero templates. Everything is written by hand in Next.js, Tailwind CSS, TypeScript, and modern animation primitives with sub-50ms render performance.",
  },
  {
    q: "What is your engagement structure?",
    a: "We operate on fixed-scope Launch Sprints ($14,000–$28,000) or dedicated Quarterly Growth Retainers. We only onboard 1 partner per quarter to maintain craft focus.",
  },
  {
    q: "What telemetry is included post-launch?",
    a: "Every engagement includes 30 days of behavioral analytics, user session review, heatmapping, and conversion rate optimizations.",
  },
];

function MagneticButton({
  children,
  className = "",
  href = "#contact",
  onClick,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition:
          pos.x === 0
            ? "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            : "transform 0.08s ease-out",
      }}
      className={`inline-flex items-center justify-center cursor-pointer select-none active:scale-95 duration-150 ${className}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [clocks, setClocks] = useState({ paris: "--:--", tokyo: "--:--", nyc: "--:--" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subscribed, setSubscribed] = useState(false);
  const [budgetVal, setBudgetVal] = useState<number>(20);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const [hoveredFaq, setHoveredFaq] = useState<number | null>(null);
  const [pinnedFaq, setPinnedFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 740);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const toggleFaq = (index: number) => {
    const isCurrentlyOpen = pinnedFaq === index || hoveredFaq === index;
    if (isCurrentlyOpen) {
      setPinnedFaq(null);
      setHoveredFaq(null);
    } else {
      setPinnedFaq(index);
      setHoveredFaq(index);
    }
  };

  const manifestoText =
    "When everybody else looks identical, being sensible is financial suicide. FIZZ turns lukewarm marketing into cultural resonance through razor-sharp positioning, tactile digital interactions, and campaigns people actually share.";

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const updateTime = () => {
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
      setClocks({
        paris: new Date().toLocaleTimeString("en-GB", { ...opts, timeZone: "Europe/Paris" }),
        tokyo: new Date().toLocaleTimeString("en-GB", { ...opts, timeZone: "Asia/Tokyo" }),
        nyc: new Date().toLocaleTimeString("en-US", { ...opts, timeZone: "America/New_York" }),
      });
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (manifestoRef.current) {
            const rect = manifestoRef.current.getBoundingClientRect();
            const winH = window.innerHeight;
            if (rect.top < winH && rect.bottom > 0) {
              const words = manifestoRef.current.querySelectorAll(".reveal-word");
              const progress = Math.min(1, Math.max(0, (winH * 0.75 - rect.top) / (rect.height * 0.85)));
              const activeIndex = Math.floor(progress * words.length);
              words.forEach((el, idx) => {
                if (idx <= activeIndex) el.classList.add("active");
                else el.classList.remove("active");
              });
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(clockInterval);
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);
  const [stickersVisible, setStickersVisible] = useState(false);
  const doctrineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hysteresis: Enter when at least 25% is visible, exit only when less than 8% remains
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setStickersVisible(true);
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.08) {
          setStickersVisible(false);
        }
      },
      { 
        threshold: [0.08, 0.25]
      }
    );

    if (doctrineRef.current) observer.observe(doctrineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-canvas text-ink min-h-screen selection:bg-fizzOrange selection:text-white font-chillax w-full overflow-x-hidden">
      {/* FLOATING PILLNAV */}
      <header className="fixed top-4 lg:top-6 inset-x-0 z-50 flex justify-center items-center lg:justify-start lg:items-start pointer-events-none px-4 lg:px-26">
        <div className="pointer-events-auto w-full max-w-[92vw] md:w-auto md:max-w-none rounded-full flex justify-center">
          <PillNav
            className="w-full md:w-auto"
            logo={
              <span className="flex items-center gap-2 pl-2">
                <span
                  className="text-[20px] sm:text-[24px] tracking-tight text-ink font-semibold select-none"
                  style={{
                    fontFamily: 'var(--font-chillax)',
                    fontFeatureSettings: '"liga" 1, "calt" 1, "dlig" 1',
                  }}
                >
                  fizz
                </span>
              </span>
            }
            logoAlt="FIZZ Studio"
            items={[
              { label: "Home", href: "#" },
              { label: "Services", href: "#services" },
              { label: "Works", href: "#work" },
              { label: "Estimator", href: "#estimator" },
              { label: "Contact", href: "#contact" },
            ]}
            activeHref="#"
            theme="light"
            layout="joined"
            surface="glass"
            collapse={isMobile ? "always" : "never"}
            highlightColor="linear-gradient(180deg, rgba(239, 104, 36, 0.85) 0%, rgba(255, 91, 34, 0.62) 100%)"
            highlightTextColor="#FFFFFF"
            barColor="rgba(255, 255, 255, 0.35)"
            itemStyle="plain"
            hoverEffect="glide"
            indicator="pill"
            size="lg"
            bounce={0.74}
            stretch={0.68}
            intro
            style={{
              ['--pn-pill-shadow' as any]:
                'inset 1.5px 3.5px 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1.5px 1px 0 rgba(255, 255, 255, 0.95), 0 8px 24px -4px rgba(250, 69, 8, 0.45)',
            }}
          />
        </div>
      </header>

      <main className="w-full">
{/* HERO SECTION */}
    <section className="relative overflow-hidden w-full pt-2 pb-16">
      
      {/* Inner Content Container */}
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Core Content Grid */}
        <div className="relative z-20 py-16 lg:py-16 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column (7 cols): Tag, Glass Text Headline, & Description */}
            <div className="lg:col-span-7 pt-4 flex flex-col justify-start relative">
              
              {/* 1. Status Tag */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 mt-6 sm:mt-6 mb-4 sm:-mb-4 rounded-full text-fizzOrange text-[11px] uppercase tracking-wider font-semibold w-fit select-none backdrop-blur-md transition-all duration-300"
                style={{
                  border: '1px double rgba(51, 51, 51, 0.08)',
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(250, 248, 245, 0.45) 100%)',
                  boxShadow: `
                    inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
                    inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
                    inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
                    inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
                    inset 0 0 2px rgba(0, 0, 0, 0.5),
                    0 8px 20px -4px rgba(0, 0, 0, 0.12)
                  `,
                }}
              >
                <span>Zero Dull Marketing</span>
              </div>

              {/* 2. FluidGlass Headline Container (Scoped like the footer) */}
              <div className="relative w-full h-[190px] sm:h-[240px] -mt-6 sm:mt-2 mb-0 sm:mb-4 select-none pointer-events-none">
                <div className="absolute -left-20 sm:-left-33 w-[130%] -inset-y-80">
                  <FluidGlass
                    text={"We inject momentum\n  into ambitious brands."}
                    src="/hero.jpg"
                    shape="pill"
                    size={200}
                    refraction={1}
                    dispersion={0.25}
                    interaction="follow"
                    frost={0}
                    color="#84cc16"
                    tint={0.6}
                    reflection={0}
                    shadow={0.5}
                    elevation={0}
                    smoothness={0.5}
                    wobble={0.5}
                    spin={1.75}
                    idle
                    morphOnClick={false}
                    intro
                  />
                </div>
              </div>

              {/* 3. Subtitle Paragraph */}
              <p className="text-lg sm:text-lg text-ink/70 -mt-6 sm:-mt-12 leading-relaxed font-normal max-w-xl relative z-30">
                Algorithmic sameness kills conversion. FIZZ creates high-velocity launch campaigns, tactile identities, and interactive software engineered for exponential market attention.
              </p>
            </div>

            {/* Right Column (5 cols): Only this side is pushed down via pt-14 */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start select-none gap-8 pt-8 lg:pt-8">
              
              {/* Bare Floating Folder (Shifted Left) */}
              <div className="w-full flex items-center justify-center lg:justify-center relative min-h-[300px] lg:translate-x-2 transform-gpu">
                <Folder
                  label="Photos"
                  items={FOLDER_ITEMS}
                  mode="flap"
                  variant="glass"
                  layout="spread"
                  color="#f97316"
                  paperColor="#ffffff"
                  tabPosition="right"
                  openOn="click"
                  size={1.5}
                  frost={0.35}
                  tilt={0.5}
                  speed={1}
                  bounce={0.6}
                  peek
                  intro
                  draggable
                  zoomOnClick
                  theme="dark"
                  onItemClick={(item, index) => console.log(item, index)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-end lg:-translate-x-10 w-full">
                {/* 1. VIEW WORKS (Frosted Liquid Glass) */}
                <LiquidGlassButton
                  href="#work"
                  variant="frosted"
                >
                  View Works
                </LiquidGlassButton>

                {/* 2. START A PROJECT (Liquid Glass Orange) */}
                <LiquidGlassButton
                  href="#contact"
                  variant="orange"
                >
                  Start A Project
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Bar */}
        <div id="metrics" className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-0 pb-2 relative z-20">
          {/* 1. Generated Pipeline */}
          <div className="p-6 rounded-2xl bg-white/70 border border-hairline shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-ink/20 hover:shadow-xs">
            <span className="text-xs text-ink/50 uppercase tracking-wider block mb-1 font-semibold">
              Generated Pipeline
            </span>
            <span className="text-3xl font-semibold text-ink tracking-tight font-sans">
              <CountUp to={148} prefix="$" suffix="M+" duration={3.4} />
            </span>
          </div>

          {/* 2. Conversion Uplift */}
          <div className="p-6 rounded-2xl bg-white/70 border border-hairline shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-fizzOrange/30 hover:shadow-xs">
            <span className="text-xs text-ink/50 uppercase tracking-wider block mb-1 font-semibold">
              Conversion Uplift
            </span>
            <span className="text-3xl font-semibold text-fizzOrange tracking-tight font-sans">
              <CountUp to={46.2} decimals={1} prefix="+" suffix="% Avg" duration={3.6} />
            </span>
          </div>

          {/* 3. Execution Speed */}
          <div className="p-6 rounded-2xl bg-white/70 border border-hairline shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-ink/20 hover:shadow-xs">
            <span className="text-xs text-ink/50 uppercase tracking-wider block mb-1 font-semibold">
              Execution Speed
            </span>
            <span className="text-3xl font-semibold text-ink tracking-tight font-sans">
              <CountUp to={14} suffix="-Day Sprint" duration={2.8} />
            </span>
          </div>

          {/* 4. Global Reach */}
          <div className="p-6 rounded-2xl bg-white/70 border border-hairline shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xs">
            <span className="text-xs text-ink/50 uppercase tracking-wider block mb-1 font-semibold">
              Global Reach
            </span>
            <span className="text-3xl font-semibold text-emerald-600 tracking-tight font-sans">
              <CountUp to={3.8} decimals={1} suffix="M Active" duration={2.5} />
            </span>
          </div>
        </div>

      </div>
    </section>
        {/* TEXTLOOP RIBBON MARQUEE */}
        <section className="relative w-full overflow-hidden bg-cardMuted/20 flex items-center justify-center h-[72px] transform-gpu will-change-transform [contain:paint]">
          <TextLoop
            text="STRIPE ✦ VERCEL ✦ LINEAR ✦ RAYCAST ✦ SUPABASE ✦ RAMP"
            shape="line"
            speed={100}
            direction="forward"
            separator="✦"
            curviness={0}
            tilt={0}
            cross={false}
            fontSize={36}
            fontWeight={600}
            letterSpacing={1}
            uppercase
            ribbon
            ribbonColor="#FF5500"
            ribbonWidth={72}
            edgeFade={0}
            draggable={false}
            scrollBoost={1}
            outline={false}
            pauseOnHover
            outlineWidth={1.5}
            color="#FAF8F5"
          />
        </section>

        {/* MANIFESTO / DOCTRINE */}
        <section
          id="doctrine"
          ref={doctrineRef}
          className="py-18 w-full bg-cardMuted/20 overflow-hidden"
        >
          {/* Inner Content Container: Preserves exact text & sticker coordinates */}
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Typography */}
              <div className="lg:col-span-7">
                <span className="text-xs uppercase tracking-wider text-fizzOrange block mb-8 font-semibold">
                  // THE FIZZ DOCTRINE
                </span>
                <p ref={manifestoRef} className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-ink tracking-tight flex flex-wrap">
                  {manifestoText.split(" ").map((w, i) => (
                    <span key={i} className="reveal-word inline-block mr-[0.3em]">
                      {w}
                    </span>
                  ))}
                </p>
              </div>

              {/* Right Column: 10-Sticker Smooth Burst Cluster */}
              <div className="lg:col-span-5 flex items-center justify-center w-full py-2 sm:py-0">
                <div className="relative w-full max-w-[390px] sm:max-w-[480px] h-[480px] sm:h-[520px] select-none">
                  
                  {/* Diffused ambient background aura */}
                  <div 
                    className={`absolute inset-4 sm:inset-10 bg-fizzOrange/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
                      stickersVisible ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />

                  {/* Sticker 1: Top Left - LinkedIn */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '60ms' : '0ms',
                    }}
                    className={`absolute top-6 left-2 sm:top-8 sm:left-6 z-15 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : 'translate-x-24 translate-y-[380px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:rotate-6 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-2 rounded-2xl bg-[#0A66C4] shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(10,102,196,0.25)] -rotate-12 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/linkedin.webp" alt="LinkedIn" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 2: Top Center - YouTube */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '40ms' : '0ms',
                    }}
                    className={`absolute top-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-44 z-20 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-y-0 scale-100 opacity-100'
                        : 'translate-y-[390px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:-rotate-4 cursor-pointer active:scale-95">
                      <div className="w-22 h-22 sm:w-24 sm:h-24 p-4.5 rounded-3xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(255,0,0,0.18)] rotate-6 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/youtube.png" alt="YouTube" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 3: Top Right - Gemini */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '80ms' : '0ms',
                    }}
                    className={`absolute top-12 right-2 sm:top-16 sm:right-10 z-10 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : '-translate-x-20 translate-y-[370px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:-rotate-6 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-4 rounded-3xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.08)] rotate-12 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/gemini.svg" alt="Gemini" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 4 [Slot 8]: Middle Left - Perplexity */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '100ms' : '0ms',
                    }}
                    className={`absolute top-40 left-1 sm:top-44 sm:left-4 z-20 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : 'translate-x-24 translate-y-[260px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:rotate-6 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-1 rounded-3xl bg-[#1F1F1F] shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.18)] -rotate-6 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/perplexity.svg" alt="Perplexity" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Center Hero Focal Badge - Fizz */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '120ms' : '0ms',
                    }}
                    className={`absolute top-40 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-38 z-25 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-y-0 scale-100 opacity-100'
                        : 'translate-y-[280px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-4 hover:scale-110 hover:rotate-4 cursor-pointer active:scale-95">
                      <div className="w-26 h-26 sm:w-28 sm:h-28 p-0 rounded-[28px] bg-[#FF5500] shadow-[0_8px_22px_rgba(255,85,0,0.20)] hover:shadow-[0_22px_36px_rgba(255,85,0,0.38)] -rotate-3 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/fizz_logo.png" alt="fizz" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 5: Middle Right - GitHub */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '140ms' : '0ms',
                    }}
                    className={`absolute top-44 right-1 sm:top-48 sm:right-16 z-15 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : '-translate-x-16 translate-y-[240px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:-rotate-4 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-2 rounded-2xl bg-black shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)] -rotate-8 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/github-white.svg" alt="GitHub" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 6 [Slot 10]: Far Bottom-Left - Blender */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '160ms' : '0ms',
                    }}
                    className={`absolute top-84 left-0 sm:top-92 sm:-left-2 z-15 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : 'translate-x-28 translate-y-[80px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:-rotate-6 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-3 rounded-2xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(235,119,0,0.2)] -rotate-8 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/Blender_logo.svg" alt="Blender" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 7 [Slot 6]: Bottom Left - VS Code */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '150ms' : '0ms',
                    }}
                    className={`absolute top-72 left-22 sm:top-80 sm:left-24 z-20 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : 'translate-x-12 translate-y-[120px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:rotate-6 cursor-pointer active:scale-95">
                      <div className="w-22 h-22 sm:w-24 sm:h-24 p-2.5 rounded-3xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(0,122,204,0.2)] rotate-6 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/vs_code.svg" alt="VS Code" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 8 [Slot 9]: Bottom Gap - Figma */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '180ms' : '0ms',
                    }}
                    className={`absolute top-76 left-48 sm:top-82 sm:left-52 lg:left-56 z-15 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : '-translate-x-8 translate-y-[110px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:rotate-6 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-4 rounded-3xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.08)] 8deg flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/Figma-logo.svg" alt="Figma" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                  {/* Sticker 9 [Slot 7]: Bottom Right - Notion */}
                  <div
                    style={{
                      transitionDelay: stickersVisible ? '200ms' : '0ms',
                    }}
                    className={`absolute bottom-4 right-1 sm:bottom-16 sm:right-12 z-20 transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      stickersVisible
                        ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
                        : '-translate-x-20 translate-y-[80px] scale-50 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="transition-all duration-300 ease-out hover:z-30 hover:-translate-y-3 hover:scale-105 hover:-rotate-4 cursor-pointer active:scale-95">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 p-3 rounded-3xl bg-white shadow-[0_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_30px_rgba(0,0,0,0.12)] -rotate-12 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/Notion-logo.svg" alt="Notion" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      {/* SERVICES / PILLARS */}
        <section id="services" className="scroll-mt-18 lg:scroll-mt-18 py-10 px-6 sm:px-12 lg:px-16 max-w-[1400px] w-full mx-auto bg-canvas">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 pb-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-fizzOrange block mb-2 font-semibold">
                // CORE PILLARS
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-ink">What We Master</h2>
            </div>
            <span className="text-xs text-ink/50 font-medium">[ 03 DISCIPLINES ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer select-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 245, 0.85) 100%)',
                  boxShadow: `
                    inset 6px -8px 1.5px 2px rgba(255, 255, 255, 0.9),
              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
              inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
              inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
              inset 1px 0 2px rgba(0, 0, 0, 0.5),
              0 4px 20px -4px rgba(0, 0, 0, 0.12)
                  `,
                }}
              >
                <div>
                  <span className="text-xs text-fizzOrange block mb-5 font-semibold tracking-wider">
                    {cap.num} // ARCHITECTURE
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-ink mb-3 group-hover:text-fizzOrange transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed font-normal mb-8">
                    {cap.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-5 border-t border-hairline">
                  {cap.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white select-none transition-all duration-200 hover:scale-105"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(239, 104, 36, 0.85) 0%, rgba(255, 91, 34, 0.62) 100%)',
                        boxShadow:
                          'inset 1.5px 3.5px 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1.5px 1px 0 rgba(255, 255, 255, 0.95), 0 4px 14px -3px rgba(250, 69, 8, 0.45)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO WORKS (FULL-BLEED FLEX CAROUSEL) */}
        <section id="work" className="scroll-mt-18 lg:scroll-mt-18 py-8 w-full bg-cardMuted/20 overflow-hidden">
          {/* Constrained Header Container */}
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16">
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 pb-0 ">
              <div>
                <span className="text-xs uppercase tracking-wider text-fizzOrange block mb-2 font-semibold">
                  // SELECTED COMMISSIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-ink">Recent Work</h2>
              </div>
              <span className="text-xs text-ink/50 font-medium">[ 2025 — 2026 ARCHIVE ]</span>
            </div>
          </div>

          {/* Full-Bleed Viewport Canvas */}
          <div className="w-full mt-0 h-[520px] sm:h-[600px] lg:h-[640px] relative select-none">
            <FlexCarousel
              items={WORK_ITEMS}
              preset="liquid"
              intro="rise"
              cardHeight={0.52}
              gap={16}
              squeeze={0.15}
              focusOnClick
              captions
              radius={16}
              lensWidth={0.92}
              lensHeight={1.05}
              tilt={35}
              roundness={0.65}
              bend={0.18}
              reach={0.24}
              curl="twist"
              dispersion={0.25}
              liquid={0}
              followCursor={false}
              autoplay={false}
              interval={4}
              captureWheel
            />
          </div>
        </section>
        {/* SPRINT ESTIMATOR & 3D FOLDER */}
        <section id="estimator" className="scroll-mt-18 lg:scroll-mt-18 py-14 px-6 sm:px-12 lg:px-16 max-w-[1400px] w-full mx-auto bg-canvas">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Estimator Card (7 cols) */}
            <div
              className="lg:col-span-7 rounded-3xl p-8 sm:p-10 lg:p-12 transition-all duration-300 select-none"
              style={{
                border: '1px double rgba(51, 51, 51, 0.08)',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 245, 0.85) 100%)',
                boxShadow: `
                  inset 6px -8px 1.5px 2px rgba(255, 255, 255, 0.9),
                  inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
                  inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
                  inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
                  inset 1px 0 2px rgba(0, 0, 0, 0.5),
                  0 4px 20px -4px rgba(0, 0, 0, 0.12)
                `,
              }}
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-fizzOrange block mb-2 font-semibold">
                  // INTERACTIVE ESTIMATOR
                </span>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-2">
                  Sprint Valuation Dial
                </h2>
                <p className="text-ink/65 text-sm font-normal mb-8">
                  Slide to approximate project scope and preview estimated production turnaround.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-baseline text-sm text-ink font-semibold">
                    <span>ESTIMATED BUDGET</span>
                    <span className="text-3xl font-semibold text-fizzOrange">${budgetVal},000 USD</span>
                  </div>

                  {/* Liquid Glass Interactive Slider */}
                  <LiquidGlassSlider
                    min={14}
                    max={45}
                    value={budgetVal}
                    onChange={setBudgetVal}
                  />

                  <div className="flex justify-between text-xs text-ink/50 font-medium">
                    <span>$14k (14-Day Sprint)</span>
                    <span>$45k+ (Full Ecosystem Redesign)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-hairline text-xs">
                <div>
                  <span className="text-ink/50 uppercase block mb-1 font-semibold">Turnaround SLA</span>
                  <span className="text-base font-semibold text-ink">
                    {budgetVal <= 20 ? '14 Business Days' : '21-28 Days'}
                  </span>
                </div>
                <div>
                  <span className="text-ink/50 uppercase block mb-1 font-semibold">Scope</span>
                  <span className="text-base font-semibold text-ink">
                    {budgetVal <= 20 ? 'Flagship + Next.js' : 'Full Platform Suite'}
                  </span>
                </div>
                <div>
                  <span className="text-ink/50 uppercase block mb-1 font-semibold">Dedicated Team</span>
                  <span className="text-base font-semibold text-fizzOrange">1 Lead Eng + 1 Principal</span>
                </div>
              </div>
            </div>

            {/* Right Column: Bare Floating Folder (5 cols, zero card wrapper) */}
            <div className="lg:col-span-5 flex items-center justify-center relative select-none min-h-[360px] py-4">
              <Folder
  label="Documents"
  items={FOLDER_ITEMS}
  mode="book"
  variant="glass"
  layout="spread"
  color="#f97316"
  paperColor="#ffffff"
  tabPosition="right"
  openOn="click"
  size={1.6}
  frost={0.35}
  tilt={0.5}
  speed={1}
  bounce={0.6}
  peek
  intro
  draggable
  zoomOnClick
  theme="dark"
  onItemClick={(item, index) => console.log(item, index)}
/>
          </div>
          </div>
        </section>
        {/* FAQ SECTION */}
        <section id="faq" className="py-20 px-6 sm:px-12 lg:px-16 max-w-[1400px] w-full mx-auto bg-cardMuted/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <span className="text-xs uppercase tracking-wider text-fizzOrange block mb-2 font-semibold">// CLARITY</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-ink leading-tight">Common Directives</h2>
              <p className="text-ink/65 text-sm mt-3 font-normal max-w-sm">
                Everything you need to know before initiating a project sprint with our team.
              </p>
            </div>

            <div className="md:col-span-7 divide-y divide-hairline border-y border-hairline">
              {FAQS.map((faq, index) => {
                const isOpen = pinnedFaq === index || (hoveredFaq === index && pinnedFaq === null);

                return (
                  <div
                    key={index}
                    className="py-5 cursor-pointer select-none group transition-colors duration-200"
                    onMouseEnter={() => {
                      if (pinnedFaq === null) setHoveredFaq(index);
                    }}
                    onMouseLeave={() => {
                      if (pinnedFaq === null) setHoveredFaq(null);
                    }}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={`text-base sm:text-lg font-medium tracking-tight transition-colors duration-300 ${
                          isOpen ? 'text-fizzOrange' : 'text-ink group-hover:text-fizzOrange'
                        }`}
                      >
                        {faq.q}
                      </h3>

                      {/* Tactile Liquid Glass Toggle Button */}
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFaq(index);
                        }}
                        className={`w-8 h-8 flex items-center justify-center rounded-full shrink-0 transform-gpu cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-90 active:translate-y-0.5 ${
                          isOpen ? 'text-fizzOrange' : 'text-ink/70 group-hover:text-fizzOrange'
                        }`}
                        style={{
                          border: '1px double rgba(51, 51, 51, 0.08)',
                          background:
                            'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 245, 0.88) 100%)',
                          boxShadow: isOpen
                            ? `
                              inset 1px 2px 2px rgba(0, 0, 0, 0.15),
                              inset 0 0 4px rgba(239, 104, 36, 0.2),
                              0 2px 6px -2px rgba(0, 0, 0, 0.08)
                            `
                            : `
                              inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
                              inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
                              inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
                              inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
                              inset 0 0 2px rgba(0, 0, 0, 0.5),
                              0 6px 16px -4px rgba(0, 0, 0, 0.12)
                            `,
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform duration-300 ease-out"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <line
                            x1="12"
                            y1="5"
                            x2="12"
                            y2="19"
                            className={`transition-all duration-300 origin-center ${
                              isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
                            }`}
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Smooth Grid Accordion Drawer */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 pt-3'
                          : 'grid-rows-[0fr] opacity-0 pt-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'translate-y-0 filter-none' : '-translate-y-2 blur-[1px]'
                          }`}
                        >
                          <p className="text-sm text-ink/75 leading-relaxed font-normal pl-3.5 border-l-2 border-fizzOrange">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
            </section>

        {/* FOOTER */}
        <footer id="contact" className="scroll-mt-18 lg:scroll-mt-18 relative overflow-hidden w-full bg-canvas">
          
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-16 relative z-20 pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 relative">
                
                {/* 1. Status Indicator Tag */}
                <div className="flex items-center pl-14 gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider text-fizzOrange font-semibold">
                    Q1 ENGAGEMENT OPEN
                  </span>
                </div>

                {/* 2. FluidGlass Container Scoped Specifically to Headline Slot */}
                <div className="relative w-full h-[180px] sm:h-[220px] mb-8 select-none pointer-events-none">
                  <div className="absolute -inset-x-8 -inset-y-40">
                    <FluidGlass
                      text={"Ready to turn noise\ninto momentum?"}
                      src="/hero.jpg"
                      shape="pill"
                      size={200}
                      refraction={1}
                      dispersion={0.25}
                      interaction="follow"
                      frost={0}
                      color="#84cc16"
                      tint={0}
                      reflection={0}
                      shadow={0.5}
                      elevation={0}
                      smoothness={0.5}
                      wobble={0.5}
                      spin={1.75}
                      idle
                      morphOnClick={false}
                      intro
                    />
                  </div>
                </div>

               {/* 3. Button Placed Cleanly Below */}
                <div className="relative z-30 -mt-6 sm:-mt-8 mb-4 pointer-events-auto flex justify-center lg:justify-start lg:left-58">
                  <LiquidGlassButton
                    href="mailto:hello@fizz.studio"
                    variant="orange"
                  >
                    Initiate Sprint
                  </LiquidGlassButton>
                </div>
              </div>

              {/* Right Column: Tactile Skeuomorphic Pillar Card */}
              <div
                className="lg:col-span-5 rounded-3xl p-8 sm:p-10 flex flex-col justify-between select-none transition-all duration-300 relative mt-6 z-30"
                style={{
                  border: '1px double rgba(51, 51, 51, 0.08)',
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 248, 245, 0.85) 100%)',
                  boxShadow: `
                    inset 6px -8px 1.5px 2px rgba(255, 255, 255, 0.9),
                    inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
                    inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
                    inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
                    inset 1px 0 2px rgba(0, 0, 0, 0.5),
                    0 4px 20px -4px rgba(0, 0, 0, 0.12)
                  `,
                }}
              >
                <div>
                  <span className="text-xs tracking-wider text-fizzOrange uppercase block mb-2 font-semibold">
                    [ THE FIZZ DISPATCH ]
                  </span>
                  <h3 className="text-2xl font-medium tracking-tight text-ink mb-2">
                    Unconventional Growth Tactics
                  </h3>
                  <p className="text-sm text-ink/65 leading-relaxed mb-6 font-normal">
                    Bi-weekly breakdown of high-converting micro-interactions and design direction. Zero spam.
                  </p>
                </div>

                {subscribed ? (
                  <div
                    className="py-3.5 px-6 rounded-full text-xs font-semibold text-emerald-800 select-none flex items-center gap-2"
                    style={{
                      border: '1px double rgba(51, 51, 51, 0.08)',
                      background:
                        'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(250, 248, 245, 0.1) 100%)',
                      boxShadow: `
                        inset 2px -2px 1px -1px rgba(255, 255, 255, 0.9),
                        inset -2px 2px 1px -1px rgba(255, 255, 255, 0.9),
                        inset 6px -6px 1px -6px rgba(255, 255, 255, 0.55),
                        inset -6px 6px 1px -6px rgba(255, 255, 255, 0.55),
                        inset 0 0 2px rgba(0, 0, 0, 0.5),
                        0 8px 20px -4px rgba(0, 0, 0, 0.12)
                      `,
                    }}
                  >
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Dispatch linked. Welcome to the cohort.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubscribed(true);
                    }}
                    className="relative flex items-center p-1.5 pl-5 bg-white/90 rounded-full transition-all duration-300 focus-within:ring-2 focus-within:ring-fizzOrange/30 focus-within:bg-white"
                    style={{
                      border: '1px double rgba(51, 51, 51, 0.08)',
                      boxShadow: `
                        inset 0 2px 4px rgba(0, 0, 0, 0.05),
                        inset 0 -1px 2px rgba(255, 255, 255, 0.9),
                        0 2px 8px -2px rgba(0, 0, 0, 0.06)
                      `,
                    }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="founder@company.com"
                      className="w-full bg-transparent outline-none text-xs text-ink placeholder:text-ink/40 font-normal pr-2"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider select-none transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer shrink-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(239, 104, 36, 0.9) 0%, rgba(255, 91, 34, 0.72) 100%)',
                        boxShadow: `
                          inset 1.5px 3px 1.5px 1px rgba(255, 255, 255, 0.95),
                          inset 0 -1.5px 1px 0 rgba(255, 255, 255, 0.85),
                          0 4px 12px -2px rgba(239, 104, 36, 0.45)
                        `,
                      }}
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

          {/* FULL-WIDTH ORANGE FOOTER BAND */}
          <div
            className="w-full text-white select-none relative z-20"
            style={{ backgroundColor: '#FF5500' }}
          >
            <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16 pt-14 pb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/20 text-xs font-medium">
                <div>
                  <span className="text-white/60 uppercase tracking-wider block mb-3 font-semibold">[ DIRECTIVES ]</span>
                  <ul className="space-y-2 text-white/90">
                    <li><a href="#work" className="hover:text-white transition-colors">Campaign Archive</a></li>
                    <li><a href="#doctrine" className="hover:text-white transition-colors">The Doctrine</a></li>
                    <li><a href="#services" className="hover:text-white transition-colors">Capabilities</a></li>
                    <li><a href="#faq" className="hover:text-white transition-colors">Sprint Terms</a></li>
                  </ul>
                </div>
                <div>
                  <span className="text-white/60 uppercase tracking-wider block mb-3 font-semibold">[ SOCIAL ARCHIVE ]</span>
                  <ul className="space-y-2 text-white/90">
                    <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X / Twitter ↗</a></li>
                    <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a></li>
                    <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Engine ↗</a></li>
                    <li><a href="https://are.na" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Are.na Channel ↗</a></li>
                  </ul>
                </div>
                <div>
                  <span className="text-white/60 uppercase tracking-wider block mb-3 font-semibold">[ ATELIER HUBS ]</span>
                  <ul className="space-y-1.5 text-white/90">
                    <li className="text-white font-semibold">NYC: Soho Flagship</li>
                    <li>Paris: Rue de Turenne</li>
                    <li>Tokyo: Shibuya-ku</li>
                    <li className="text-white/60 pt-1 font-normal">Remote worldwide</li>
                  </ul>
                </div>
                <div>
                  <span className="text-white/60 uppercase tracking-wider block mb-3 font-semibold">[ SYSTEM STATUS ]</span>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-white font-semibold">All Systems Operational</span>
                  </div>
                  <p className="text-white/75 leading-relaxed text-[11px] font-normal">
                    Built on Next.js + Tailwind CSS. Hosted on Edge with sub-50ms latency.
                  </p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60 font-medium">
                <span>© 2026 FIZZ STUDIO INC. ALL RIGHTS RESERVED.</span>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                  <a href="#" className="hover:text-white transition-colors">TERMS OF COMMISSION</a>
                  <a href="#" className="hover:text-white transition-colors">SECURITY</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}