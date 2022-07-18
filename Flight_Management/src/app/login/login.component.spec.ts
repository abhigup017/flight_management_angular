import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserModel } from '../sharedModels/userModel';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('User name control invalid when empty', () => {
    let userNameControl = component.loginModel.formLoginGroup.controls['userNameControl'];
    expect(userNameControl.valid).toBeFalsy();
  });

  it('Password control invalid when empty', () => {
    let passwordControl = component.loginModel.formLoginGroup.controls['passwordControl'];
    expect(passwordControl.valid).toBeFalsy();
  });

  it('form invalid when empty', () => {
    expect(component.loginModel.formLoginGroup.valid).toBeFalsy();
  });

  it('User name control valid when not empty', () => {
    let userNameControl = component.loginModel.formLoginGroup.controls['userNameControl'];
    userNameControl.setValue("abhishek@test.com");
    expect(userNameControl.valid).toBeTruthy();
  });

  it('Password control valid when not empty', () => {
    let passwordControl = component.loginModel.formLoginGroup.controls['passwordControl'];
    passwordControl.setValue("12345678");
    expect(passwordControl.valid).toBeTruthy();
  });

  it('Form is valid when Username and password is set', () => {
    let userNameControl = component.loginModel.formLoginGroup.controls['userNameControl'];
    userNameControl.setValue("abhishek@test.com");
    let passwordControl = component.loginModel.formLoginGroup.controls['passwordControl'];
    passwordControl.setValue("12345678");
    expect(component.loginModel.formLoginGroup.valid).toBeTruthy();
  });

  it('Emitted values from form should match with model values', () => {
    expect(component.loginModel.formLoginGroup.valid).toBeFalsy();
    component.loginModel.formLoginGroup.controls['userNameControl'].setValue("abhishek@test.com");
    component.loginModel.formLoginGroup.controls['passwordControl'].setValue("12345678");
    component.Login()
    expect(component.loginModel.formLoginGroup.valid).toBeTruthy();
    expect(component.loginModel.userName).toBe("abhishek@test.com");
    expect(component.loginModel.password).toBe("12345678");
  });

});
