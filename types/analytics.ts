export type AnalyticsProviderState = {
  analyticsData: AnalyticsData[];
  totalPayout: number;
  currentDatePayout: number;
  dateWisetoalPayout: {
    date: Date;
    total: number;
  }[];
  categoryWisePayout: {
    category: string;
    total: number;
  }[];
  addAnalyticsData: (newData: AnalyticsData) => void;
};

export type AnalyticsData = {
  category: string;
  amount: number;
  date: Date;
};

