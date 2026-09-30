import React, { useState } from 'react';
import { LedgerCard } from './LedgerCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function LetterToOwnership() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <LedgerCard className="p-6 md:p-8 border-brass/50 bg-ink-2/90 my-8">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer border-b border-hairline pb-4"
      >
        <div>
          <div className="text-eyebrow text-brass">Strategic Memorandum • May 2026</div>
          <h2 className="font-display text-paper text-xl md:text-2xl mt-1">A Letter to the Ownership of Nyota FM</h2>
        </div>
        <button 
          type="button"
          className="text-brass p-1 rounded hover:bg-ink transition-colors"
          aria-label={isOpen ? "Collapse letter" : "Expand letter"}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 space-y-4 font-body text-sage text-[15px] sm:text-[16px] leading-relaxed">
          <p className="font-medium text-paper">Dear Members of the Ownership,</p>
          
          <p>
            Western Kenya is speaking, singing and organising in more languages, on more screens and at greater volume than at any point in its history. Yet its airwaves remain fragmented — a crowded chorus in which no single voice has yet claimed the role of cultural and civic anchor for the five counties that share the Luhya story. That gap is not a weakness in the market. It is an opening, and it belongs to whoever moves first with conviction and craft.
          </p>

          <p>
            Nyota FM is uniquely placed to take it. You already hold the frequency, the goodwill and a tagline that says exactly the right thing at exactly the right moment: <em className="text-paper not-italic font-medium">Hapa Tulipo, Twang’aa</em> — right here, where we are, we shine. This document is our argument for how that promise becomes the defining media brand of Western Kenya by 2028.
          </p>

          <p>
            We have written it as a partner, not a supplier. You will find no Firefly fees, retainers or margins in these pages; those belong in a separate engagement letter. What you will find is a complete, board-ready transformation thesis — brand, studio, programming, digital architecture and commercial diversification — sequenced over twenty-four months and mapped, chapter by chapter, against five objectives you have set for the station.
          </p>

          <p>
            Every figure here is illustrative and openly flagged as such, pending an audited baseline we recommend commissioning early. We have chosen honesty over false precision because the decision before you deserves it.
          </p>

          <p className="pt-2 text-paper">We would be privileged to build this with you.</p>

          <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-sage-dim gap-2">
            <div>
              <span className="text-paper font-semibold block text-sm">Firefly Management</span>
              <span>Lead Strategist, on behalf of the Strategy Directorate</span>
            </div>
            <div className="sm:text-right">
              <span className="text-brass block">STRICTLY CONFIDENTIAL</span>
              <span>Prepared for Nyota FM Ownership</span>
            </div>
          </div>
        </div>
      )}
    </LedgerCard>
  );
}
