import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class UserModel
{
    userName:string="";
    password:string="";
    formLoginGroup:FormGroup;

    constructor() {
        var _builder = new FormBuilder();
        this.formLoginGroup = _builder.group({});
        this.formLoginGroup.addControl('userNameControl', new FormControl('', Validators.required));
        this.formLoginGroup.addControl('passwordControl', new FormControl('', Validators.required));
        
    }
}