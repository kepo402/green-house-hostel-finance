
import { RoomContribution, Expense, Announcement } from './types';

export const mockAnnouncements: Announcement[] = [
  { message: "🚀 New generator fuel contribution due this Friday!", is_important: true },
  { message: "Cleaning schedule updated for the East Wing.", is_important: false },
  { message: "Welcome to our new resident in Room 302!", is_important: false },
  { message: "🚨 Emergency repair fund established for the water pump.", is_important: true }
];

export const mockRooms: RoomContribution[] = [
  { room: "Room 101", month_total: 15000, overall_total: 180000 },
  { room: "Room 102", month_total: 15000, overall_total: 180000 },
  { room: "Room 201", month_total: 12500, overall_total: 150000 },
  { room: "Room 202", month_total: 0, overall_total: 140000 },
  { room: "Room 301", month_total: 15000, overall_total: 180000 },
  { room: "Room 302", month_total: 15000, overall_total: 15000 },
];

export const mockExpenses: Expense[] = [
  { id: '1', date_added: '2023-10-05', description: 'Diesel Purchase (50L)', amount: 45000 },
  { id: '2', date_added: '2023-10-12', description: 'Electrician Callout', amount: 8000 },
  { id: '3', date_added: '2023-10-15', description: 'Cleaning Supplies', amount: 3500 },
  { id: '4', date_added: '2023-10-20', description: 'Security Guard Stipend', amount: 20000 },
  { id: '5', date_added: '2023-09-25', description: 'Plumbing Repair', amount: 12000 },
  { id: '6', date_added: '2023-08-10', description: 'Internet Subscription', amount: 15000 },
];
