import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DiscountManageComponent } from './discount-manage.component';

describe('DiscountManageComponent', () => {
  let component: DiscountManageComponent;
  let fixture: ComponentFixture<DiscountManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountManageComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
