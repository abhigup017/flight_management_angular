import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class AddAirlineModel
{
    airlineName:string="";
    airlineLogo:string="";
    airlineContact:string="";
    airlineDescription:string="";
    airlineAddress:string=""
    formAirlineAddGroup:FormGroup;
    
    constructor() {
        var _builder = new FormBuilder();
        this.formAirlineAddGroup = _builder.group({});
        this.formAirlineAddGroup.addControl("airlineNameControl", new FormControl('', Validators.required));
        this.formAirlineAddGroup.addControl("airlineLogoControl", new FormControl('', Validators.required));
        this.formAirlineAddGroup.addControl("airlineContactControl", new FormControl('', Validators.required));
        this.formAirlineAddGroup.addControl("airlineAddressControl", new FormControl('', Validators.required));
    }
}