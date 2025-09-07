export interface PortfolioResponse {
  [sector: string]:
    | {
        stocks: Stock[];
        summary: SectorSummary;
      }
    | PortfolioSummary;
}

export interface Stock {
  particulars: string;
  symbol: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: string;
  exchange: string;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossColor: "green" | "red";
  peRatio: number;
  latestEarnings: number;
}

export interface SectorSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossColor: "green" | "red";
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossColor: "green" | "red";
}
