import { Component, OnInit } from '@angular/core';
import { NhlService } from '../shared/nhl-service/nhl.service'
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
// import { PythonShell } from 'python-shell';
// import { PythonShell } from 'python-shell';

interface Post {
  title: string;
  body: string;
};

@Component({
  selector: 'app-nhl',
  templateUrl: './nhl.component.html',
  styleUrls: ['./nhl.component.css']
})
export class NhlComponent implements OnInit {
  teams: Post;
  ovechkin;
  capitals;
  ovechkin_curr_season_goals;

  constructor(private nhlService: NhlService, private http: HttpClient) {
    // this.initializeOvechkin();
  }

  public async initializeOvechkin() {
    await this.nhlService.getOvechkin().then((response) => {
      this.ovechkin = response;
      // console.log("FART = ", this.ovechkin);
      // debugger
    });

    await this.nhlService.getCapitals().then((response) => {
      this.capitals = response;
      // console.log("FART = ", this.capitals);
      // debugger
    });

    await this.nhlService.getOvechkinCurrGoals().then((response) => {
      this.ovechkin_curr_season_goals = response;
      // console.log("FART = ", this.capitals);
      // debugger
    });
  }

  async ngOnInit() {
    await this.initializeOvechkin();
    console.log("OVI", this.ovechkin)
    console.log("CAPS", this.capitals)

  }
}
