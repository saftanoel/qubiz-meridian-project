import axios from 'axios';
import type {
  DashboardResponse,
  OnboardingTasksResponse,
  TaskUpdateResponse,
  Employee,
  SuggestedPerson,
  Resource,
  OfficeLocation,
  HrOverviewResponse,
  HrActionItem,
  TaskStatus,
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

// ── Dashboard ──

export async function getDashboard(): Promise<DashboardResponse> {
  const { data } = await client.get<DashboardResponse>('/dashboard');
  return data;
}

// ── Onboarding ──

export async function getOnboardingTasks(): Promise<OnboardingTasksResponse> {
  const { data } = await client.get<OnboardingTasksResponse>('/onboarding/tasks');
  return data;
}

export async function updateTaskStatus(taskId: number, status: TaskStatus): Promise<TaskUpdateResponse> {
  const { data } = await client.patch<TaskUpdateResponse>(`/onboarding/tasks/${taskId}/status`, { status });
  return data;
}

// ── Employees ──

export async function getEmployees(): Promise<Employee[]> {
  const { data } = await client.get<Employee[]>('/employees');
  return data;
}

export async function getEmployeeMatches(): Promise<SuggestedPerson[]> {
  const { data } = await client.get<SuggestedPerson[]>('/employees/matches');
  return data;
}

// ── Resources ──

export async function getResources(): Promise<Resource[]> {
  const { data } = await client.get<Resource[]>('/resources');
  return data;
}

export async function searchResources(query: string): Promise<Resource[]> {
  const { data } = await client.get<Resource[]>('/resources/search', { params: { q: query } });
  return data;
}

// ── Office ──

export async function getOfficeLocations(): Promise<OfficeLocation[]> {
  const { data } = await client.get<OfficeLocation[]>('/office-locations');
  return data;
}

// ── HR ──

export async function getHrOverview(): Promise<HrOverviewResponse> {
  const { data } = await client.get<HrOverviewResponse>('/hr/overview');
  return data;
}

export async function updateHrActionItem(actionItemId: number, status: string): Promise<HrActionItem> {
  const { data } = await client.patch<HrActionItem>(`/hr/action-items/${actionItemId}`, { status });
  return data;
}
