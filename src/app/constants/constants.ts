export const FIRST_SEASON = 1950;
export const CURRENT_SEASON = new Date().getFullYear();

const seasons: number[] = [];
for (let i = FIRST_SEASON; i <= CURRENT_SEASON + 1; i++) {
  seasons.push(i);
}
export const SEASONS = seasons;

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
  { id: 'tororosso', name: 'Toro Rosso' },
  { id: 'racingpoint', name: 'Racing Point' },
  { id: 'alfaromeo', name: 'Alfa Romeo' },
  { id: 'haas', name: 'Haas' },
  { id: 'williams', name: 'Williams' }
];

export const BASE_URL = 'https://ergast.com/api/f1';
