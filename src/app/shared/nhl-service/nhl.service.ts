import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface NhlSummary {
  playerName: string;
  teamName: string;
  season: string | null;
  seasonGoals: number | null;
  seasonGamesPlayed: number | null;
  goalsPerGame: number | null;
  careerGoals: number;
  scheduleAvailable: boolean;
  nextGame: {
    startTimeUTC: string;
    awayTeam: string;
    homeTeam: string;
  } | null;
}

@Injectable({ providedIn: 'root' })
export class NhlService {
  constructor(private http: HttpClient) { }

  getSummary(): Promise<NhlSummary> {
    return this.http.get<NhlSummary>(environment.apiUrlRoot + '/nhl/summary').toPromise();
  }
}
