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


  constructor(private nhlService: NhlService, private http: HttpClient) { }

  ngOnInit() {

    // import { PythonShell } from 'python-shell';

    // PythonShell.run('my_script.py', null, function (err) {
    //   if (err) throw err;
    //   console.log('finished');
    // });
    // var PythonShell = require('python-shell');
    // //you can use error handling to see if there are any errors
    // PythonShell.run('my_script.py', null, function (err, results) {
    //   if (err) throw err;
    //   console.log('finished');
    // });
    //your code

    // fetch('https://statsapi.web.nhl.com/api/v1/people/8471214', { mode: 'no-cors' }
    // ).then((resp) => console.log("resp= ", resp))
    //   .then(function (data) {
    //     console.log("data retrieved");
    //   }).catch(function (error) {
    //     console.log(error);
    //   });


    // var test1 = this.http.get<Object>('https://statsapi.web.nhl.com/api/v1/people/8471214').subscribe(res => console.log("test1 = ", res))
    // console.log("nhl teams1= ", test1)
    var nhltest = this.nhlService.getNHL()

    var test = this.nhlService.getOvechkin()

    // .subscribe((data: Post) => this.teams = { ...data });
    console.log("nhl teams= ", test)
    console.log("nhl nhlteams= ", nhltest)

  }

  // python() {
  //   PythonShell.run('nhl-python.py', null, function (err) {
  //     if (err) throw err;
  //     console.log('finished');
  //   });
  // }
}
