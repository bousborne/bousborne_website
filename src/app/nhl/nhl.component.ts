import { Component, OnInit } from '@angular/core';
import { NhlService, NhlSummary } from '../shared/nhl-service/nhl.service';

@Component({
  selector: 'app-nhl',
  templateUrl: './nhl.component.html',
  styleUrls: ['./nhl.component.css']
})
export class NhlComponent implements OnInit {
  summary: NhlSummary;
  loading = true;
  error = '';

  constructor(private nhlService: NhlService) { }

  async ngOnInit() {
    try {
      this.summary = await this.nhlService.getSummary();
    } catch (error) {
      this.error = 'NHL statistics are temporarily unavailable. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
}
