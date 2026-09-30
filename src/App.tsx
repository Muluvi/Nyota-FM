import React from 'react';
import { Header } from './components/ledger/Header';
import { BackToTop } from './components/ledger/BackToTop';
import { ChapterSection } from './components/ledger/ChapterSection';
import { Reveal } from './components/ledger/Reveal';
import { VisionInfographic } from './components/ledger/VisionInfographic';

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper font-body selection:bg-brass selection:text-ink pb-20">
      <Header />
      
      <main className="max-w-[640px] mx-auto px-4 md:px-0 pt-16">
        
        {/* Hero Section Placeholder */}
        <section id="hero" className="py-24 border-b border-hairline">
          <Reveal>
            <div className="text-eyebrow text-sage-dim mb-6">Investment Proposal</div>
            <h1 className="font-display text-paper leading-[1.1] mb-8">
              Nyota FM's Digital Leap
            </h1>
            <p className="font-body text-sage text-lg mb-8">
              A Complete Social Media & BTL Investment Blueprint for Western Kenya's Community Heartbeat.
            </p>
            {/* Add more hero content in future prompts */}
          </Reveal>
        </section>

        {/* Chapters Placeholders */}
        <ChapterSection id="summary" number="01" title="Executive Summary">
          <Reveal delay={40}>
            <p className="text-sage mb-6">
              The "Twang'aa" transformation positions Nyota FM as the undisputed #1 digital and on-ground broadcast powerhouse across Western Kenya.
            </p>
            <VisionInfographic />
          </Reveal>
        </ChapterSection>

        <ChapterSection id="landscape" number="02" title="The Digital Landscape">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for The Digital Landscape...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="personas" number="03" title="Your Listeners">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Your Listeners...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="platforms" number="04" title="Platform Deep Dive">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Platform Deep Dive...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="equipment" number="05" title="Studio Transformation">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Studio Transformation...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="roadmap" number="06" title="Implementation Roadmap">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Implementation Roadmap...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="monetization" number="07" title="Monetization & Measuring Success">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Monetization...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="conclusion" number="08" title="Conclusion & The Ask">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Conclusion...</p>
          </Reveal>
        </ChapterSection>

        <ChapterSection id="appendix" number="AP" title="Appendix">
          <Reveal delay={40}>
            <p className="text-sage mb-6">Content placeholder for Appendix...</p>
          </Reveal>
        </ChapterSection>

      </main>
      
      <footer className="max-w-[640px] mx-auto px-4 md:px-0 py-12 flex items-center justify-between">
        <div className="text-eyebrow text-sage-dim">
          © 2026 NYOTA FM • CONFIDENTIAL
        </div>
        <img 
          src="https://res.cloudinary.com/da5j0zjok/image/upload/v1786407396/Horizontal_logo_clear_png_v0cjbd.png" 
          alt="Firefly Management" 
          className="h-4 w-auto object-contain brightness-0 invert opacity-30 hover:opacity-100 transition-opacity" 
        />
      </footer>

      <BackToTop />
    </div>
  );
}
