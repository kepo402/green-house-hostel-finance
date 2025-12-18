// types.ts
export interface RoomContribution {
  room: string;
  month_total: number;
  overall_total: number;
}

export interface Expense {
  id: string;
  date: string; // date_added from Django
  description: string;
  amount: number;
}

export interface Announcement {
  text: string;
  important: boolean;
}

export interface Summary {
  total_contributions: number;
  total_expenses: number;
  balance: number;
}

export interface DashboardResponse {
  month_name: string;
  monthly_summary: Summary;
  overall_summary: Summary;
  room_data: RoomContribution[];
  expenses_month: Expense[];
  expenses_all: Expense[];
  announcements: Announcement[];
}
