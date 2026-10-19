// F-2-7 points table, Dec 2025 revision. Sources: koreainsiderpro.com, jobploy.kr (both agree).
// ponytail: plain tables, no framework. Edit numbers here when immigration revises them.
export const PASS = 80;
export const MIN_WAGE_ANNUAL = 25_900_000; // 2026: 10,320 won/h x 209h x 12

export const AGE = [[18, 24, 23], [25, 29, 25], [30, 34, 23], [35, 39, 20], [40, 44, 12], [45, 50, 8], [51, 200, 3]];
export const EDU = { phd_stem: 25, phd: 20, ms_stem: 20, ms: 17, ba_stem: 17, ba: 15, assoc_stem: 15, assoc: 10, none: 0 };
export const KOREAN = [0, 3, 5, 10, 15, 20]; // index = TOPIK/KIIP level, 5 covers TOPIK 6
export const INCOME = [[100e6, 60], [90e6, 58], [80e6, 56], [70e6, 53], [60e6, 50], [50e6, 45], [40e6, 40], [30e6, 30], [MIN_WAGE_ANNUAL, 10]];
export const BONUS_UNI = { top500_phd: 30, top500_ms: 20, top500_ba: 15, kr_phd: 10, kr_ms: 7, kr_ba: 5, none: 0 };
export const BONUS = { allied: 20, ministry: 20, kiip5: 10 };
export const VOLUNTEER = [0, 1, 5, 7]; // index = years, capped at 3
export const DED_IMMIGRATION = [0, -10, -20, -30];
export const DED_CRIMINAL = [0, -20, -30, -40];

export function score(a) {
  const age = (AGE.find(([lo, hi]) => a.age >= lo && a.age <= hi) || [0, 0, 0])[2];
  const edu = EDU[a.edu] ?? 0;
  const korean = KOREAN[a.korean] ?? 0;
  const income = (INCOME.find(([min]) => a.income >= min) || [0, 0])[1];
  let bonus = (BONUS_UNI[a.bonusUni] ?? 0) + VOLUNTEER[Math.min(a.volunteer ?? 0, 3)];
  for (const k of a.bonus ?? []) bonus += BONUS[k] ?? 0;
  bonus = Math.min(bonus, 40);
  const ded = Math.max(DED_IMMIGRATION[a.dedImm ?? 0] + DED_CRIMINAL[a.dedCrim ?? 0], -70);
  const total = age + edu + korean + income + bonus + ded;
  return { age, edu, korean, income, bonus, ded, total, pass: total >= PASS && (a.dedCrim ?? 0) < 3 };
}
