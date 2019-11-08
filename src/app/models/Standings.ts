interface Constructor {
  constructorID: string;
  name: string;
  nationality: string;
  url: string;
}

export interface DriverStandings {
  Constructors: Constructor[];
  Driver: {
    code: string;
    dateOfBirth: string;
    driverId: string;
    familyName: string;
    givenName: string;
    nationality: string;
    permanentNumber: string;
    url: string;
  };
  points: string;
  position: string;
  positionText: string;
  wins: string;
}

export interface DriverStandingsData {
  MRData: {
    StandingsTable: {
      StandingsLists: {
        0: {
          DriverStandings: DriverStandings[];
        };
      };
    };
  };
}

export interface DriverStandingsDataSource {
  position: string;
  driver: string;
  constructors: string;
  points: string;
  wins: string;
}
