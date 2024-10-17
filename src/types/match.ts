type Match = {
  match_id: number;
  match_date: string; // "YYYY-MM-DD"
  kick_off: string; // "HH:mm:ss.SSS"
  competition: {
    competition_id: number;
    country_name: string;
    competition_name: string;
  };
  season: {
    season_id: number;
    season_name: string;
  };
  home_team: HomeTeam;
  away_team: AwayTeam;
  home_score: number;
  away_score: number;
  match_status: string;
  match_status_360: string | null;
  last_updated: string;
  last_updated_360: string | null;
  metadata: {
    data_version: string;
    shot_fidelity_version: string;
    xy_fidelity_version: string;
  };
  match_week: number;
  competition_stage: {
    id: number;
    name: string;
  };
  stadium: {
    id: number;
    name: string;
    country: Country;
  };
  referee: {
    id: number;
    name: string;
    country: Country;
  };
};

type HomeTeam = {
  home_team_id: number;
  home_team_name: string;
  home_team_gender: string;
  home_team_group: string | null;
  country: Country;
  managers: Manager[];
};

type AwayTeam = {
  away_team_id: number;
  away_team_name: string;
  away_team_gender: string;
  away_team_group: string | null;
  country: Country;
  managers: Manager[];
};

type Manager = {
  id: number;
  name: string;
  nickname: string | null;
  dob: string; // "YYYY-MM-DD"
  country: Country;
};

type Country = {
  id: number;
  name: string;
};

export default Match;
