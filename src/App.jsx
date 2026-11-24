import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  ArrowRight,
  Mail,
  Zap,
  Play,
  Layers,
  ShieldCheck,
  Check,
  Filter,
} from 'lucide-react';
import { allProjectsData, curatedProjects, experienceMetrics, processRoadmap } from './data';

// Animation Presets
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStep, setActiveStep] = useState(0);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const categories = [
    'All',
    'Automotive & Tech',
    'OTT & Entertainment',
    'Clothing & Fashion',
    'Beauty & Personal Care',
    'FMCG, Food & Health',
  ];

  const filteredProjects = allProjectsData.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Automotive & Tech')
      return (
        p.category.includes('Automotive') ||
        p.category.includes('Tech') ||
        p.category.includes('Mobile') ||
        p.brand === 'Bajaj' ||
        p.brand === 'Xiaomi'
      );
    if (activeCategory === 'OTT & Entertainment')
      return p.category.includes('OTT') || p.category.includes('Entertainment') || p.brand === 'JioHotstar';
    if (activeCategory === 'Clothing & Fashion')
      return (
        p.category.includes('Clothing') ||
        p.category.includes('Fashion') ||
        p.category.includes('Streetwear') ||
        p.category.includes('Menswear') ||
        p.brand === 'Snitch' ||
        p.brand === 'Bewakoof' ||
        p.brand === 'FabIndia' ||
        p.brand === 'Rare Rabbit'
      );
    if (activeCategory === 'Beauty & Personal Care')
      return (
        p.category.includes('Beauty') ||
        p.category.includes('Personal Care') ||
        p.category.includes('Skincare') ||
        p.category.includes('Fragrance') ||
        p.category.includes('Grooming') ||
        p.category.includes('Cosmetics') ||
        p.brand === 'The Pink Foundry' ||
        p.brand === 'ClayCo' ||
        p.brand === 'Denver' ||
        p.brand === 'The Man Company' ||
        p.brand === 'Suroskie'
      );
    if (activeCategory === 'FMCG, Food & Health')
      return (
        p.category.includes('Food') ||
        p.category.includes('FMCG') ||
        p.category.includes('Nutrition') ||
        p.category.includes('Eco-Friendly') ||
        p.category.includes('E-commerce') ||
        p.brand === 'Beco' ||
        p.brand === 'Flipkart' ||
        p.brand === 'Johnson & Johnson' ||
        p.brand === 'Steadfast Nutrition' ||
        p.brand === 'Licious' ||
        p.brand === "Domino's"
      );
    return true;
  });

  const scrollToHero = (e) => {
    e.preventDefault();
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#061315] text-[#AAB8B8] selection:bg-[#008F8C] selection:text-[#F6F0E5] overflow-x-hidden font-sans">
      {/* 1. TOP INTERACTIVE SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F8C] via-[#FFD67A] to-[#E5A43A] origin-left z-[70]"
        style={{ scaleX }}
      />

      {/* 2. LUXURY STICKY NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#061315]/85 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#hero" onClick={scrollToHero} className="flex items-center gap-3 group cursor-pointer">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              className="w-11 h-11 rounded-xl bg-[#061315] border border-[#008F8C]/50 group-hover:border-[#FFD67A] p-1.5 flex items-center justify-center shadow-[0_0_20px_rgba(0,143,140,0.3)] transition-colors"
            >
              <img
                src="/uniquomedia-logo.png"
                alt="Uniqo Media Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-heading text-xl font-black text-[#F6F0E5]">
                <span>Uniqo</span>
                <span className="text-gradient-gold">Media</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#008F8C] font-semibold flex items-center gap-1">
                <span>A Division of</span>
                <span className="text-[#FFD67A]">Aayup Technologies</span>
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#featured" className="text-[#AAB8B8] hover:text-[#FFD67A] transition-colors">
              Case Studies
            </a>
            <a href="#metrics" className="text-[#AAB8B8] hover:text-[#FFD67A] transition-colors">
              Impact Data
            </a>
            <a href="#process" className="text-[#AAB8B8] hover:text-[#FFD67A] transition-colors">
              Our Methodology
            </a>
            <a href="#contact" className="text-[#AAB8B8] hover:text-[#FFD67A] transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/919170471804"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008F8C]/15 border border-[#008F8C]/40 hover:border-[#FFD67A] text-xs font-bold text-[#F6F0E5] hover:text-[#FFD67A] transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>+91 91704 71804</span>
            </motion.a>
          </div>
        </div>
      </header>

      {/* 3. DYNAMIC FLOATING AMBIENT LIGHTS */}
      <div className="absolute top-28 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[#008F8C]/10 rounded-full blur-[170px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#E5A43A]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* 4. HERO SECTION — EDITORIAL WITH LUXURY ON-SCROLL REVEAL */}
      <section id="hero" className="relative pt-36 pb-20 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Pill Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#FFD67A] text-[11px] font-bold tracking-[0.22em] uppercase mb-6 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD67A] animate-spin" />
              <span>PROVEN CLIENT TRAJECTORIES & CASE STUDIES</span>
            </motion.div>

            {/* Editorial Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#F6F0E5] tracking-tight leading-[1.08] mb-6"
            >
              Work That Transformed Brand Trajectories.{' '}
              <span className="font-serif italic font-normal text-gradient-gold block sm:inline">
                Real Data. Real ROAS.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-xl text-[#AAB8B8] max-w-2xl leading-relaxed font-normal mb-8"
            >
              Explore verified case studies from consumer labels and industry leaders who scaled
              with Uniqo Media's creator and performance engines under{' '}
              <strong className="text-[#FFD67A] font-semibold">Aayup Technologies</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#featured"
                className="px-7 py-4 rounded-full bg-gradient-to-r from-[#008F8C] to-[#00A8A4] hover:from-[#FFD67A] hover:to-[#E5A43A] text-[#061315] font-black text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,143,140,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <span>View Verified Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919170471804"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#F6F0E5] font-bold text-sm transition-colors flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#FFD67A]" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 5. HERO METRIC CARDS (ON-SCROLL ANIMATION) */}
          <motion.div
            id="metrics"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mt-16 border border-white/10 shadow-2xl"
          >
            {experienceMetrics.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ backgroundColor: '#0B2124', y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-[#081719] transition-colors flex flex-col justify-center"
              >
                <span className="text-3xl sm:text-5xl font-black font-heading text-[#F6F0E5] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008F8C] mt-2 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5.5 BRAND TRUST LOGO TICKER MARQUEE (EXACT REAL LOGOS FROM WEBSITE) */}
      <section className="py-8 bg-[#040E10] border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#AAB8B8]/70">
            TRUSTED BY INDUSTRY TITANS & HIGH-GROWTH BRANDS
          </span>
        </div>
        <div className="flex overflow-hidden select-none gap-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex shrink-0 items-center justify-around gap-12 min-w-full animate-marquee">
            {allProjectsData.map((brand, i) => (
              <div
                key={`b1-${i}`}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 hover:border-[#FFD67A]/50 transition-colors"
              >
                <img
                  src={brand.logo}
                  alt={brand.brand}
                  className="h-6 w-auto max-w-[90px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-bold text-[#F6F0E5] tracking-wide border-l border-white/15 pl-2.5">
                  {brand.brand}
                </span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-around gap-12 min-w-full animate-marquee" aria-hidden="true">
            {allProjectsData.map((brand, i) => (
              <div
                key={`b2-${i}`}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0 hover:border-[#FFD67A]/50 transition-colors"
              >
                <img
                  src={brand.logo}
                  alt={brand.brand}
                  className="h-6 w-auto max-w-[90px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-bold text-[#F6F0E5] tracking-wide border-l border-white/15 pl-2.5">
                  {brand.brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CURATED EDITORIAL CASE STUDIES (FEWER, DEEPER, MASSIVE VISUAL IMPACT) */}
      <section id="featured" className="py-28 relative bg-[#061315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FFD67A] mb-3 block">
                ✦ CURATED BENCHMARKS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#F6F0E5] tracking-tight">
                Featured Case Studies.{' '}
                <span className="font-serif italic font-normal text-gradient-gold block sm:inline">
                  Deep Impact.
                </span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#008F8C] text-[#061315] shadow-[0_0_20px_rgba(0,143,140,0.4)]'
                      : 'bg-[#081719] border border-white/10 text-[#AAB8B8] hover:text-[#F6F0E5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6 High-Impact Visual Cards with Deep Storytelling & Real Logos */}
          <div className="space-y-16">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-[#081719] border border-white/15 hover:border-[#FFD67A]/60 overflow-hidden shadow-2xl transition-all duration-500 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Media Column (Left) */}
                    <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.brand}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Official Client Logo Badge Top-Left */}
                      <div className="absolute top-5 left-5 z-20 px-3.5 py-2 rounded-xl bg-[#061315]/90 border border-white/20 backdrop-blur-md shadow-xl flex items-center gap-3">
                        <img
                          src={project.logo}
                          alt={project.brand}
                          className="h-6 w-auto object-contain max-w-[100px]"
                        />
                        <span className="text-xs font-bold text-white border-l border-white/20 pl-2">
                          {project.brand}
                        </span>
                      </div>

                      {/* High-Result Badge Bottom-Left */}
                      <div className="absolute bottom-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-[#008F8C] text-[#061315] font-black text-xs shadow-lg">
                        {project.badge}
                      </div>
                    </div>

                    {/* Content Column (Right) */}
                    <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                      <div>
                        {/* Type & Category */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFD67A]">
                            {project.category}
                          </span>
                          <span className="text-[10px] font-mono text-[#AAB8B8]/80 bg-white/5 px-2.5 py-1 rounded-full">
                            VERIFIED CAMPAIGN
                          </span>
                        </div>

                        {/* Impact Headline */}
                        <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#F6F0E5] leading-tight mb-4 group-hover:text-[#FFD67A] transition-colors">
                          {project.headline}
                        </h3>

                        {/* Executive Summary */}
                        <p className="text-sm text-[#AAB8B8] leading-relaxed mb-6 font-normal">
                          {project.summary}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                          {project.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-[#F6F0E5]/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4 Quantitative Data Blocks (Akhouri Metric Architecture) */}
                      <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {project.stats.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 rounded-xl bg-black/40 border border-white/5 text-center group-hover:border-[#FFD67A]/30 transition-colors"
                          >
                            <span className="text-base sm:text-lg font-heading font-black text-[#F6F0E5] block">
                              {st.value}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-[#AAB8B8] block mt-0.5 font-medium leading-tight">
                              {st.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. METHODOLOGY TIMELINE (INTERACTIVE SCROLL & STEPPER) */}
      <section id="process" className="py-28 relative bg-[#071719] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Header */}
            <div className="lg:col-span-5 sticky top-28">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FFD67A] mb-3 block">
                OUR METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#F6F0E5] tracking-tight mb-4">
                How We Run{' '}
                <span className="font-serif italic font-normal text-gradient-gold">
                  a Campaign.
                </span>
              </h2>
              <p className="text-sm text-[#AAB8B8] leading-relaxed mb-8">
                From discovery and anti-bot audience audits to viral scriptwriting, pacing, and Meta/Google Spark
                amplification — every campaign adheres to a battle-tested sprint.
              </p>

              {/* Step Navigation */}
              <div className="space-y-2">
                {processRoadmap.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      activeStep === idx
                        ? 'bg-[#008F8C] text-[#061315] font-black shadow-lg'
                        : 'bg-black/30 border border-white/5 text-[#AAB8B8] hover:text-[#F6F0E5] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold opacity-75">{step.step}</span>
                      <span className="text-xs font-bold">{step.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Detailed Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 sm:p-12 rounded-3xl bg-[#081719] border border-[#008F8C]/40 shadow-2xl relative overflow-hidden glow-teal"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <span className="text-xs font-mono font-bold text-[#FFD67A] tracking-wider uppercase">
                      STEP {processRoadmap[activeStep].step} OF 06
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#008F8C]/20 border border-[#008F8C]/40 text-[#FFD67A] text-xs font-mono font-bold">
                      {processRoadmap[activeStep].metric}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#F6F0E5] mb-4">
                    {processRoadmap[activeStep].title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#AAB8B8] leading-relaxed mb-8">
                    {processRoadmap[activeStep].desc}
                  </p>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-[#AAB8B8]">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Quantitative Quality Assurance</span>
                    </span>
                    <span className="text-[#FFD67A] font-bold">Aayup Technologies Framework</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER CALL-TO-ACTION (DIRECT CONVERSIONS) */}
      <footer id="contact" className="py-24 relative bg-[#061315] border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FFD67A] mb-3 block">
            READY TO SCALE?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F6F0E5] tracking-tight mb-6">
            Whether It's 10 Creators or 10,000 —{' '}
            <span className="font-serif italic font-normal text-gradient-gold">
              Let's Engineer It.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#AAB8B8] max-w-xl mx-auto mb-10">
            Get a tailored creator shortlist, content strategy, and projected ROAS forecast for your
            brand within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/919170471804"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#008F8C] hover:bg-[#FFD67A] text-[#061315] font-black text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,143,140,0.3)] flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us: +91 91704 71804</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:business@uniqomedia.com"
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#F6F0E5] font-bold text-sm transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#FFD67A]" />
              <span>business@uniqomedia.com</span>
            </motion.a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#AAB8B8] gap-4">
            <p>© 2026 Uniqo Media — All Rights Reserved.</p>
            <p className="text-[#FFD67A]">
              Official Digital Marketing Division of{' '}
              <a
                href="https://aayuptechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Aayup Technologies
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
