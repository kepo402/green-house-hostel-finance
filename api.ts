import { DashboardResponse } from './types';

export async function fetchDashboard(month: string) {
  const response = await fetch(`/api/dashboard/?month=${month}`); // use /api
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
