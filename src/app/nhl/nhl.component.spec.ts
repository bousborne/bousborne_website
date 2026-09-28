import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlComponent } from './nhl.component';
import { NhlService } from '../shared/nhl-service/nhl.service';

describe('NhlComponent', () => {
  let component: NhlComponent;
  let fixture: ComponentFixture<NhlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhlComponent ],
      providers: [{ provide: NhlService, useValue: {
        getSummary: () => Promise.resolve({ playerName: 'Alex Ovechkin', teamName: 'Washington Capitals',
          season: null, careerGoals: 894, nextGame: null, scheduleAvailable: true })
      } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders when there is no next game or season data', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('No upcoming Capitals game');
      expect(fixture.nativeElement.textContent).toContain('Season statistics have not been published');
    });
  }));

  it('shows a useful message when the API fails', async(() => {
    spyOn(TestBed.get(NhlService), 'getSummary').and.returnValue(Promise.reject(new Error('offline')));
    component.summary = null;
    component.ngOnInit().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('temporarily unavailable');
      expect(component.loading).toBe(false);
    });
  }));
});
