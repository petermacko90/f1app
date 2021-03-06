export const FIRST_SEASON = 1950;
export const CURRENT_SEASON = new Date().getFullYear();

interface Team {
  id: string;
  name: string;
}
export const TEAMS: Team[] = [
  { id: 'mercedes', name: 'Mercedes' },
  { id: 'ferrari', name: 'Ferrari' },
  { id: 'redbull', name: 'Red Bull' },
  { id: 'mclaren', name: 'McLaren' },
  { id: 'renault', name: 'Renault' },
  { id: 'alphatauri', name: 'AlphaTauri' },
  { id: 'racingpoint', name: 'Racing Point' },
  { id: 'alfaromeo', name: 'Alfa Romeo' },
  { id: 'haas', name: 'Haas' },
  { id: 'williams', name: 'Williams' }
];

export const BASE_URL = 'https://ergast.com/api/f1';
