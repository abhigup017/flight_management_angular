import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class RegisterModel {
    firstName:string="";
    lastName:string="";
    genderId:number=0;
    emailId:string="";
    userName:string="";
    password:string="";
    confirmPassword:string="";
    formRegisterGroup:FormGroup;

    
    constructor() {
        let _builder = new FormBuilder();
        this.formRegisterGroup = _builder.group({});
        this.formRegisterGroup.addControl('firstNameControl', new FormControl('', Validators.required));
        this.formRegisterGroup.addControl('lastNameControl', new FormControl('', Validators.required));
        this.formRegisterGroup.addControl('emailIdControl', new FormControl('', Validators.required));
        this.formRegisterGroup.addControl('userNameControl', new FormControl('', Validators.required));
        this.formRegisterGroup.addControl('passwordControl', new FormControl('', Validators.required));
        this.formRegisterGroup.addControl('confirmPasswordControl', new FormControl('', Validators.required));
    }
}