import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TicketdetailsComponent } from './ticketdetails.component';

describe('TicketdetailsComponent', () => {
  let component: TicketdetailsComponent;
  let fixture: ComponentFixture<TicketdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketdetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
