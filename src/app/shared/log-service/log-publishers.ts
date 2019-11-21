import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LogEntry } from './log.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry):
    Observable<boolean>
  abstract clear(): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return Observable.of(true);
  }
  clear(): Observable<boolean> {
    console.clear();
    return Observable.of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    console.log("Creating LogLocalStorage");
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "logging";
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    console.log("logging LogLocalStorage", this.location);

    try {
      // Get previous values from local storage
      values = JSON.parse(
        localStorage.getItem(this.location))
        || [];
      // Add new log entry to array
      values.push(entry);
      // Store array into local storage
      localStorage.setItem(this.location,
        JSON.stringify(values));
      console.log("did it good");

      //Figure out how to get to server side to log into real file.
      // debugger;
      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log("failed it", ex);
    }
    // debugger;
    return Observable.of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }
}
export class LogWebApi extends LogPublisher {
  constructor(private http: Http) {
    // Must call super() from derived classes
    super();
    console.log("Creating LogWebApi");
    // Set location
    this.location = environment.apiUrlRoot + "/api/log";
  }

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    let headers = new Headers(
      { 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
    });
    let options = new
      RequestOptions({ headers: headers });

    console.log("about to call return.this.http.post", entry, "loc:", this.location);
    var entryString = entry.buildLogString();
    console.log("string:", entryString)
    return this.http.post(this.location,
      entry, options)
      .map(response => response.json())
      .catch(this.handleErrors);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return Observable.of(true);
  }

  private handleErrors(error: any):
    Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " +
        error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}

class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}