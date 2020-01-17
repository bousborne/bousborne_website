import { Component, OnInit } from '@angular/core';
import { NhlService } from '../shared/nhl-service/nhl.service'
import { HttpClient } from '@angular/common/http';
import { LogService } from '../shared/log-service/log.service';
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
  ovechkin_curr_career_goals;
  ovechkin_curr_season_pace;
  record_career_goals;
  ovechkin_curr_season;
  ovechkin_on_pace_season;
  ovechkin_career;
  capitals_schedule;

  constructor(private nhlService: NhlService, private http: HttpClient, private logger: LogService) {
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
      // this.logger.log("FART = ", JSON.stringify(response));
      // debugger
    });

    await this.nhlService.getOvechkinCareerGoals().then((response) => {
      this.ovechkin_curr_career_goals = response;
      // console.log("FART = ", this.capitals);
      // debugger
    });

    await this.nhlService.getOvechkinSeasonPace().then((response) => {
      this.ovechkin_curr_season_pace = response;
      // console.log("FART = ", this.capitals);
      // debugger
    });

    await this.nhlService.getOvechkinOnPace().then((response) => {
      this.ovechkin_on_pace_season = response;
      // this.logger.log("FART = ", JSON.stringify(response));
      // debugger
    });

    await this.nhlService.getOvechkinCareer().then((response) => {
      this.ovechkin_career = response;
      // console.log("FART = ", this.capitals);
      // debugger
    });

    await this.nhlService.getOvechkinSeason().then((response) => {
      this.ovechkin_curr_season = response;
      // console.log("FART = ", this.capitals);
      // debugger
    });

    // await this.nhlService.getSchedule().then((response) => {
    //   this.capitals_schedule = response;
    //   // console.log("FART = ", this.capitals);
    //   // debugger
    // });

    // await this.nhlService.getRecordGoals().then((response) => {
    //   this.record_career_goals = response;
    // });
  }

  async ngOnInit() {
    await this.initializeOvechkin();
    this.logger.log("OVI", this.ovechkin)
    this.logger.log("CAPS", this.capitals)
    this.logger.log("RECORD", this.record_career_goals)
    this.logger.log("PACE", this.ovechkin_curr_season_pace)



  }
}
