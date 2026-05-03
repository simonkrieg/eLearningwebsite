import type { Page } from './supabase';

export type PageSections = Record<string, Page>;

export function mapSections(rows: Page[] | null | undefined): PageSections {
  return (rows ?? []).reduce<PageSections>((acc, row) => {
    acc[row.section] = row;
    return acc;
  }, {});
}

export function pageText(section: Page | undefined, field: keyof Page, fallback: string) {
  const value = section?.[field];
  return typeof value === 'string' && value.trim() ? value : fallback;
}
