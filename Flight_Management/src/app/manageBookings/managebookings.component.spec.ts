import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ManagebookingsComponent } from './managebookings.component';

describe('ManagebookingsComponent', () => {
  let component: ManagebookingsComponent;
  let fixture: ComponentFixture<ManagebookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebookingsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
