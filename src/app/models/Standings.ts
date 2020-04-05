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

interface DriverStandingsLists {
  DriverStandings: DriverStandings[];
}

export interface DriverStandingsData {
  MRData: {
    StandingsTable: {
      StandingsLists: DriverStandingsLists[];
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

export interface ConstructorStandings {
  Constructor: Constructor;
  points: string;
  position: string;
  positionText: string;
  wins: string;
}

interface ConstructorStandingsLists {
  ConstructorStandings: ConstructorStandings[];
}

export interface ConstructorStandingsData {
  MRData: {
    StandingsTable: {
      StandingsLists: ConstructorStandingsLists[];
    };
  };
}

export interface ConstructorStandingsDataSource {
  position: string;
  constructor: string;
  points: string;
  wins: string;
}
