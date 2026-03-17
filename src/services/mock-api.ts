import {
  Cemetery,
  Grave,
  Burial,
  AdminUser,
  MonthlyBurialStat,
} from "@/data/types";
import { cemeteries } from "@/data/cemeteries";
import { graves } from "@/data/graves";
import { burials, adminUsers, monthlyBurialStats } from "@/data/burials";

// Simulate network delay
const delay = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));

// ---------- Cemetery Services ----------

export async function getCemeteries(city?: string): Promise<Cemetery[]> {
  await delay();
  if (city && city !== "all") {
    return cemeteries.filter(
      (c) => c.city.toLowerCase() === city.toLowerCase(),
    );
  }
  return cemeteries;
}

export async function getCemeteryById(
  id: string,
): Promise<Cemetery | undefined> {
  await delay();
  return cemeteries.find((c) => c.id === id);
}

export function getCemeteryCities(): string[] {
  return [...new Set(cemeteries.map((c) => c.city))].sort();
}

// ---------- Grave Services ----------

export async function searchGraves(params: {
  firstName?: string;
  surname?: string;
  maidenName?: string;
  idNumber?: string;
  dateOfDeath?: string;
  cemeteryId?: string;
}): Promise<Grave[]> {
  await delay(500);

  return graves.filter((g) => {
    if (
      params.firstName &&
      !g.firstName.toLowerCase().includes(params.firstName.toLowerCase())
    )
      return false;
    if (
      params.surname &&
      !g.surname.toLowerCase().includes(params.surname.toLowerCase())
    )
      return false;
    if (
      params.maidenName &&
      g.maidenName &&
      !g.maidenName.toLowerCase().includes(params.maidenName.toLowerCase())
    )
      return false;
    if (params.idNumber && g.idNumber && !g.idNumber.includes(params.idNumber))
      return false;
    if (params.dateOfDeath && g.dateOfDeath !== params.dateOfDeath)
      return false;
    if (
      params.cemeteryId &&
      params.cemeteryId !== "all" &&
      g.cemeteryId !== params.cemeteryId
    )
      return false;
    return true;
  });
}

/**
 * Full-text search used by the hero quick-search bar.
 * Splits the query into words and checks that EVERY word appears
 * in at least one of: firstName, surname, or maidenName.
 * Handles multi-word Afrikaner surnames like "Van De Kerk".
 */
export async function quickSearchGraves(query: string): Promise<Grave[]> {
  await delay(500);

  const trimmed = query.trim();
  if (!trimmed) return [];

  const words = trimmed.toLowerCase().split(/\s+/);

  return graves.filter((g) => {
    // Build a combined string of all name fields for this grave
    const namePool = [g.firstName, g.surname, g.maidenName || ""]
      .join(" ")
      .toLowerCase();

    // Every search word must appear somewhere in the name pool
    return words.every((word) => namePool.includes(word));
  });
}

export async function getGraveById(id: string): Promise<Grave | undefined> {
  await delay();
  return graves.find((g) => g.id === id);
}

export async function getGravesByCemetery(
  cemeteryId: string,
): Promise<Grave[]> {
  await delay();
  return graves.filter((g) => g.cemeteryId === cemeteryId);
}

// ---------- Burial Services ----------

export async function getBurials(): Promise<Burial[]> {
  await delay();
  return burials;
}

export async function getRecentBurials(limit: number = 5): Promise<Burial[]> {
  await delay();
  return [...burials]
    .sort(
      (a, b) =>
        new Date(b.dateOfBurial).getTime() - new Date(a.dateOfBurial).getTime(),
    )
    .slice(0, limit);
}

// ---------- Admin Services ----------

export async function getAdminUsers(): Promise<AdminUser[]> {
  await delay();
  return adminUsers;
}

export async function getMonthlyBurialStats(): Promise<MonthlyBurialStat[]> {
  await delay();
  return monthlyBurialStats;
}

// ---------- Dashboard Stats ----------

export async function getDashboardStats() {
  await delay();
  const totalCemeteries = cemeteries.length;
  const totalGraves = cemeteries.reduce((sum, c) => sum + c.totalGraves, 0);
  const burialsThisMonth = burials.filter((b) => {
    const burialDate = new Date(b.dateOfBurial);
    const now = new Date();
    return (
      burialDate.getMonth() === now.getMonth() &&
      burialDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return {
    totalCemeteries,
    totalGraves,
    burialsThisMonth,
    totalUsers: adminUsers.length,
  };
}
