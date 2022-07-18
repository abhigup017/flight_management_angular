
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form will be invalid when empty', () => {
    expect(component.registerModel.formRegisterGroup.valid).toBeFalsy();
  });

  it('Form will be valid when not empty', () => {
    expect(component.registerModel.formRegisterGroup.valid).toBeFalsy();
    component.registerModel.formRegisterGroup.controls['firstNameControl'].setValue('Abhishek');
    component.registerModel.formRegisterGroup.controls['lastNameControl'].setValue('Gupta');
    component.registerModel.formRegisterGroup.controls['emailIdControl'].setValue('abhishek@test.com');
    component.registerModel.formRegisterGroup.controls['userNameControl'].setValue('test@test.com');
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345678');
    expect(component.registerModel.formRegisterGroup.valid).toBeTruthy();
  });

  it('Form will be not valid when we set all required values and then make a value empty', () => {
    expect(component.registerModel.formRegisterGroup.valid).toBeFalsy();
    component.registerModel.formRegisterGroup.controls['firstNameControl'].setValue('Abhishek');
    component.registerModel.formRegisterGroup.controls['lastNameControl'].setValue('Gupta');
    component.registerModel.formRegisterGroup.controls['emailIdControl'].setValue('abhishek@test.com');
    component.registerModel.formRegisterGroup.controls['userNameControl'].setValue('test@test.com');
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345678');
    expect(component.registerModel.formRegisterGroup.valid).toBeTruthy();
    component.registerModel.formRegisterGroup.controls['firstNameControl'].setValue('');
    expect(component.registerModel.formRegisterGroup.valid).toBeFalsy();
  });

  it('Form will be valid when we set all required values and then make a value empty and set its value again', () => {
    expect(component.registerModel.formRegisterGroup.valid).toBeFalsy();
    component.registerModel.formRegisterGroup.controls['firstNameControl'].setValue('Abhishek');
    component.registerModel.formRegisterGroup.controls['lastNameControl'].setValue('Gupta');
    component.registerModel.formRegisterGroup.controls['emailIdControl'].setValue('abhishek@test.com');
    component.registerModel.formRegisterGroup.controls['userNameControl'].setValue('test@test.com');
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345678');
    expect(component.registerModel.formRegisterGroup.valid).toBeTruthy();
    component.registerModel.formRegisterGroup.controls['emailIdControl'].setValue('');
    expect(component.registerModel.formRegisterGroup.valid).toBeFalsy();
    component.registerModel.formRegisterGroup.controls['emailIdControl'].setValue('abhishek@test.com');
    expect(component.registerModel.formRegisterGroup.valid).toBeTruthy();
  });

  it('If password and confirm password do not match the flag isPasswordMatches should be false', () => {
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345');
    component.PasswordMatches();
    expect(component.isPasswordMatches).toBeFalsy();
  });

  it('If password and confirm password do match the flag isPasswordMatches should be true', () => {
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345678');
    component.PasswordMatches();
    expect(component.isPasswordMatches).toBeTruthy();
  });

  it('If password and confirm password match and if the values are changed and then set back to its original value the flag isPasswordMatches should be true', () => {
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345678');
    component.PasswordMatches();
    expect(component.isPasswordMatches).toBeTruthy();
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('123456');
    component.PasswordMatches();
    expect(component.isPasswordMatches).toBeFalsy();
    component.registerModel.formRegisterGroup.controls['passwordControl'].setValue('12345678');
    component.registerModel.formRegisterGroup.controls['confirmPasswordControl'].setValue('12345678');
    component.PasswordMatches();
    expect(component.isPasswordMatches).toBeTruthy();
  });
});
