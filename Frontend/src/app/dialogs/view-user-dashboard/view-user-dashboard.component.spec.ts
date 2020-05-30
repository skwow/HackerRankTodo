import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserDashboardComponent } from './view-user-dashboard.component';

describe('ViewUserDashboardComponent', () => {
  let component: ViewUserDashboardComponent;
  let fixture: ComponentFixture<ViewUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
