import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LogEntry } from './log.service';
export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry):
    Observable<boolean>
  abstract clear(): Observable<boolean>;
}
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