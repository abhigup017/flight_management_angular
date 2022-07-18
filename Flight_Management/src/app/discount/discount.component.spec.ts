import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscountComponent } from './discount.component';

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
