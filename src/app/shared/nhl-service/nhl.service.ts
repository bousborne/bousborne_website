import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface Post {
  title: string;
  body: string;
};

@Injectable({
  providedIn: 'root'
})

export class NhlService {
  // NHL_API_URL = "https://statsapi.web.nhl.com/api/v1/"
  NHL_API_URL = "/nhlapi/api/v1/"
  NHL_BASE_URL = "https://statsapi.web.nhl.com"
  OVECHKIN_URL = "/api/v1/people/8471214"
  CAPITALS_URL = "/api/v1/teams/15"
  CURRENT_SEASON = "20182019";
  NEXT_SEASON = "20192020";
  ON_TRACK_FOR_PLAYER_MODIFIER = "/stats?stats=onPaceRegularSeason&season=" + this.NEXT_SEASON;
  SINGLE_SEASON_STATS_MODIFIER = "/stats/?stats=statsSingleSeason&season=" + this.CURRENT_SEASON;

  constructor(private http: HttpClient) { }
  // uri = environment.apiUrlRoot +'/nhl';

  getTeams() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    var url = this.NHL_API_URL + 'teams';
    console.log("url: ", url)
  }

  getOvechkin() {
    var oviURL = this.NHL_BASE_URL + this.OVECHKIN_URL;

    const fetchOvechkin = async () => {
      try {
        let player = await fetch(oviURL);
        let jsonPlayer = await player.json();
        console.log("main", jsonPlayer);
        return jsonPlayer.people[0]
      } catch(err) {
        return {
          fullName: 'error'
        };
      }

    }
    let jsonOut = fetchOvechkin();
    //These below currently do nothing.
    console.log("jsonOut = ", jsonOut)

    return jsonOut
  }

  getCapitals() {
    var oviURL = this.NHL_BASE_URL + this.CAPITALS_URL;

    const fetchCapitals = async () => {
      try {
        let team = await fetch(oviURL);
        let jsonTeam = await team.json();
        console.log("main", jsonTeam);
        return jsonTeam.teams[0];
      } catch(err) {
        return {
          name: 'error'
        };
      }

    }
    let jsonOut = fetchCapitals();
    //These below currently do nothing.
    console.log("jsonOut = ", jsonOut)

    return jsonOut
  }

  getOvechkinCurrGoals() {
    var oviSeasonURL = this.NHL_BASE_URL + this.OVECHKIN_URL + this.SINGLE_SEASON_STATS_MODIFIER;

    console.log("This url = ", oviSeasonURL)
    const fetchCapitals = async () => {
      try {
        let team = await fetch(oviSeasonURL);
        let jsonTeam = await team.json();
        console.log("main", jsonTeam);
        return jsonTeam.stats[0].splits[0].stat.goals
      } catch(err) {
        return {
          name: 'error'
        };
      }

    }
    let jsonOut = fetchCapitals();
    //These below currently do nothing.
    console.log("jsonOut = ", jsonOut)

    return jsonOut
  }
}
