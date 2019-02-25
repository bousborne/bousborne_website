import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface Post {
  title: string;
  body: string;
};

@Injectable({
  providedIn: 'root'
})



export class NhlService {
  // uri = "https://statsapi.web.nhl.com/api/v1";

  // NHL_API_URL = "https://statsapi.web.nhl.com/api/v1/"
  NHL_API_URL = "/nhlapi/api/v1/"
  NHL_URL = "https://statsapi.web.nhl.com"
  OVECHKIN = "/nhlapi/api/v1/people/8471214"

  currUrl;



  constructor(private http: HttpClient) { }

  // public get(endpoint: string, query?: any): Promise<any> {
  // const url = `${this.baseUrl}${endpoint}`;

  // return get(url, { query }).then((response: any) => JSON.parse(response.body));
  getNHL() {
    return this
      .http
      .get(`${this.NHL_API_URL}`);
  }

  getTeams() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
      })
    };
    var url = this.NHL_API_URL + 'teams';
    console.log("url: ", url)
    return this
      .http
      .get<Post>(`${url}`, httpOptions);
  }

  getOvechkin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        // 'Accept-Language': 'en-US,en;q=0.5',
        // 'Upgrade-Insecure-Requests': '1',
        // 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0'
      })
    };

    const httpOptions1 = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*'
      })
    };

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });

    var url = this.OVECHKIN;
    console.log("url: ", url)

    // return this.http.get(url, {
    //   headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
    // });

    console.log("about to get")
    return this
      .http
      .get('https://statsapi.web.nhl.com/api/v1/people/8471214.text', { responseType: 'text' }).subscribe(res => { console.log("got it: ", res); });
  }

}
