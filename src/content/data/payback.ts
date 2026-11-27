// Moved verbatim from src/components/website/CapexWaterfallSimulator.tsx.

export type WaterfallScenario = 'conservative' | 'base' | 'accelerated';

export const capexWaterfall = {
  conservative: {
    initialCapex: -627299,
    monthlyNetProfit: [45000, 60000, 75000, 90000, 110000, 130000, 150000, 165000, 180000, 195000, 210000, 230000],
    breakEvenMonth: 'Month 7',
    twelveMonthRoi: '+164%',
  },
  base: {
    initialCapex: -627299,
    monthlyNetProfit: [65000, 95000, 125000, 160000, 190000, 220000, 250000, 275000, 300000, 320000, 340000, 365000],
    breakEvenMonth: 'Month 5',
    twelveMonthRoi: '+332%',
  },
  accelerated: {
    initialCapex: -627299,
    monthlyNetProfit: [90000, 140000, 190000, 240000, 280000, 320000, 360000, 390000, 420000, 450000, 480000, 510000],
    breakEvenMonth: 'Month 4',
    twelveMonthRoi: '+517%',
  },
};

export const waterfallMonths = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
