export interface Cemetery {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  totalGraves: number;
  availablePlots: number;
  established: string;
  image: string;
  lat: number;
  lng: number;
  description: string;
}

export interface Grave {
  id: string;
  cemeteryId: string;
  cemeteryName: string;
  firstName: string;
  surname: string;
  maidenName?: string;
  idNumber?: string;
  dateOfBirth: string;
  dateOfDeath: string;
  dateOfBurial: string;
  section: string;
  graveNumber: string;
  lat: number;
  lng: number;
  photos: string[];
}

export interface Burial {
  id: string;
  graveId: string;
  deceasedName: string;
  cemeteryName: string;
  section: string;
  graveNumber: string;
  dateOfBurial: string;
  burialType: "standard" | "cremation" | "reburial";
  status: "completed" | "scheduled" | "pending";
  registeredBy: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "clerk" | "viewer";
  municipality: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export interface MonthlyBurialStat {
  month: string;
  burials: number;
}
