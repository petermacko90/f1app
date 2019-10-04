export interface Race {
  Circuit: {
    Location: {
      country: string;
      lat: string;
      locality: string;
      long: string;
    },
    circuitId: string;
    circuitName: string;
    url: string;
  };
  date: string;
  raceName: string;
  round: string;
  season: string;
  time?: string;
  url: string;
}

export interface RaceData {
  MRData: {
    RaceTable: {
      Races: Race[];
    };
  };
}

export interface RaceDataSource {
  round: string;
  location: string;
  date: string;
  time: string;
  isUpcoming: boolean;
}
