import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  OVECHKIN = "/api/v1/people/8471214"

  currUrl;
  products = [];



  constructor(private http: HttpClient) { }
  uri = environment.apiUrlRoot +'/nhl';

  // public get(endpoint: string, query?: any): Promise<any> {
  // const url = `${this.baseUrl}${endpoint}`;

  // return get(url, { query }).then((response: any) => JSON.parse(response.body));
  getNHL() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })    
    };
    var nhlurl = this.NHL_URL + this.OVECHKIN;
    console.log("about to get getnhl")
    // var getnhlout = this
    //   .http
    //   .get(nhlurl, httpOptions).subscribe((res : any[])=>{
    //     console.log(res);
    //     this.products = res;
    //     });
    //   console.log("just got getnhl")

      // console.log(getnhlout)
      // debugger
      // return getnhlout
  }

  getTeams() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    var url = this.NHL_API_URL + 'teams';
    console.log("url: ", url)
    // return this
    //   .http
    //   .get<Post>(`${url}`, httpOptions);
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



    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });

    var nhlurl = this.NHL_URL + this.OVECHKIN;
    console.log("url: ", nhlurl)

    const httpOptions1 = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'nhlurl': nhlurl
      })
    };

    // return this.http.get(url, {
    //   headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
    // });

    console.log("about to get from ", nhlurl)
    console.log("about to post to ", `${this.uri}`)
 

    // return this
    //   .http
    //   .get(`${this.uri}/nhl`, httpOptions);

    // debugger

    // return this
    //   .http
    //   .get(`${this.uri}`, httpOptions);

    const nhlRequestInfo = {
      url: nhlurl
    }
    // return this
    // .http
    // .get(`${this.uri}`, httpOptions);
 
    console.log("gotsta send nhlRequustInfo reqbody = ", nhlRequestInfo.url)
    var json = this.http.post(`${this.uri}/nhlpost`, headers)
      .subscribe(res => console.log('Done', res));

      console.log("json = ", json)
  }

}
