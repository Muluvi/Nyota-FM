import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Search, ChevronDown, ChevronUp, Scale, CheckCircle2 } from 'lucide-react';
import { TierBadge } from '../v2/TierBadge';

interface PolicyRule {
  id: string;
  num: string;
  title: string;
  summary: string;
  guideline: string;
  sanction: string;
  statutoryBasis: string;
}

const POLICY_RULES: PolicyRule[] = [
  {
    id: 'p-1',
    num: '01',
    title: 'Investigative Verification & Two-Source Rule',
    summary: 'No corruption allegation against county officials may air without two independent verified documents or audio receipts.',
    guideline: 'When investigating Bungoma or Kakamega County Assembly procurement tenders, journalists must tender formal questions to the County Secretary at least 48 hours before broadcast.',
    sanction: 'Immediate retraction on the same daypart plus internal editorial review.',
    statutoryBasis: 'Media Council Act 2013 Second Schedule §1',
  },
  {
    id: 'p-2',
    num: '02',
    title: 'Vernacular Moderation & Anti-Hate Speech Firewall',
    summary: 'Strict moderation of Bukusu and Luhya sub-dialect calls to eliminate ethnic stereotyping and incitement.',
    guideline: 'All live call-in shows (Kumekucha, Soko Nyota, Sauti ya Nchi) must route phone calls through a digital 7-second audio delay unit. Producers must dump calls violating harmony guidelines.',
    sanction: 'Immediate termination of on-air host privileges and notification to NCIC.',
    statutoryBasis: 'National Cohesion and Integration Act §13 & CA Kenya Code',
  },
  {
    id: 'p-3',
    num: '03',
    title: 'Commercial & Editorial Firewall (Separation of Church & State)',
    summary: 'Clear on-air acoustic separation between objective journalism and paid commercial sponsor content.',
    guideline: 'Presenters reading live mentions must introduce the segment with the audio chime: "Tangazo Maalum la Kibiashara." News bulletins may never be interrupted by presenter endorsements.',
    sanction: 'Forfeiture of presenter commission and corrective public announcement.',
    statutoryBasis: 'CA Kenya Programming Code Section 34',
  },
  {
    id: 'p-4',
    num: '04',
    title: 'Electoral Campaign Equitable Access & Impartiality',
    summary: 'Balanced airtime allocation for all certified IEBC candidates without editorial bias.',
    guideline: 'Station rate cards must be identical for all candidates. Political interviews on Sauti ya Nchi must alternate across coalition lines with equal questioning rigor.',
    sanction: 'CA statutory fine and mandatory granting of equal free airtime to aggrieved candidate.',
    statutoryBasis: 'Elections Act Section 108 & CA Section 46',
  },
  {
    id: 'p-5',
    num: '05',
    title: 'Protection of Minors, Victims & Gender Dignity',
    summary: 'Zero identification of juvenile crime victims or survivors of domestic violence in Western Kenya.',
    guideline: 'Names, schools, and homestead locations of minors in defilement or domestic violence cases must be withheld. Voice alteration software must be applied to all survivor testimonies.',
    sanction: 'Immediate suspension of reporter and legal review.',
    statutoryBasis: 'Children Act 2022 & Sexual Offences Act',
  },
];

export function EditorialPolicyHandbook() {
  const [expandedId, setExpandedId] = useState<string>('p-1');
  const [search, setSearch] = useState<string>('');

  const filtered = POLICY_RULES.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-hairline bg-ink-2 p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brass">
            <BookOpen size={14} />
            <span className="uppercase tracking-widest font-semibold">Governance & Editorial Integrity</span>
            <span className="text-sage-dim">·</span>
            <TierBadge tier={1} citation="Media Council of Kenya (MCK) Code of Conduct for the Practice of Journalism" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-paper mt-1">
            Nyota FM Code of Editorial Conduct & Fact-Checking Handbook
          </h3>
          <p className="text-xs sm:text-sm text-sage mt-1 max-w-2xl">
            Audit the strict journalistic policies that protect Nyota FM’s regional broadcast integrity, prevent defamation litigation, and enforce Media Council of Kenya statutory compliance.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-sage-dim" />
          <input
            type="text"
            placeholder="Search editorial policy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded bg-ink border border-hairline text-xs font-mono text-paper placeholder:text-sage-dim focus:outline-none focus:border-brass"
          />
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {filtered.map((rule) => {
          const isExpanded = expandedId === rule.id;
          return (
            <div
              key={rule.id}
              className="rounded-xl border border-hairline bg-ink transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? '' : rule.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-ink-2/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brass border border-brass/30 px-2 py-0.5 rounded bg-brass/10">
                    RULE {rule.num}
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-paper">{rule.title}</h4>
                    <span className="text-xs text-sage font-sans line-clamp-1">{rule.summary}</span>
                  </div>
                </div>

                <div className="text-sage-dim">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-hairline space-y-3 text-xs font-sans text-sage">
                  <div>
                    <strong className="text-paper block mb-0.5 font-mono text-[11px] uppercase tracking-wider">
                      Operational Guideline:
                    </strong>
                    <p className="leading-relaxed">{rule.guideline}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-hairline/60 font-mono text-[11px]">
                    <div>
                      <span className="text-rose-400 font-bold block">Sanction for Breach:</span>
                      <span className="text-paper">{rule.sanction}</span>
                    </div>
                    <div>
                      <span className="text-brass font-bold block">Statutory Legal Anchor:</span>
                      <span className="text-sage-dim">{rule.statutoryBasis}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
