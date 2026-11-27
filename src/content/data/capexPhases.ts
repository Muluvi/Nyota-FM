import type { FigureId } from '../figures'

/** Studio phases (Part 6.2). Totals render through the figure registry. */
export interface CapexPhase {
  id: 'p1' | 'p2' | 'p3'
  label: string
  name: string
  months: string
  figure: FigureId
  items: string[]
}

export const capexPhases: CapexPhase[] = [
  {
    id: 'p1',
    label: 'Phase 1',
    name: 'Visual radio foundation',
    months: 'Months 1–4',
    figure: 'capex-p1',
    items: ['2× PTZ Camera KTUH86 (NDI/HDMI)', 'ATEM Television Studio HD', 'VISICO LED-50A 3-Lights Kit', 'Acoustic Treatment (20 m² panels)', 'Hardware Streaming Encoder', 'Cables, wall mounts & installation'],
  },
  {
    id: 'p2',
    label: 'Phase 2',
    name: 'Multi-cam live production',
    months: 'Months 5–10',
    figure: 'capex-p2',
    items: ['4× Additional PTZ Cameras', 'ATEM Television Studio HD8', 'vMix / OBS Production Workstation PC', 'Studio Talk-Back Intercom System', 'Dedicated Control Room Build-Out', 'Overhead Lighting Truss & Grid'],
  },
  {
    id: 'p3',
    label: 'Phase 3',
    name: 'Full multi-platform hub',
    months: 'Months 11–18',
    figure: 'capex-p3',
    items: ['Secondary Studio (podcast, voicework & pre-records)', 'DAM System (server & indexing)', 'Archive Infrastructure (NAS + offsite cloud backup)', 'Automation & AI Tooling (auto-clipping, transcription, captioning)'],
  },
]
