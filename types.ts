
export interface RoomContribution {
  room: string;
  month_total: number;
  overall_total: number;
}

export interface Expense {
  id: string;
  date_added: string;
  description: string;
  amount: number;
}

export interface Announcement {
  message: string;
  is_important: boolean;
}

export interface MonthlySummary {
  month_name: string;
  total_contributions: number;
  total_expenses: number;
  balance: number;
}
