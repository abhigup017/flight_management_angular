import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class AddDiscountModel {
    discountCode:string="";
    discountExpiryDate:any;
    discountValue:string="";
    formAddDiscountGroup:FormGroup;

    constructor() {
        var numericValidators = [];
        numericValidators.push(Validators.required);
        numericValidators.push(Validators.pattern("^[0-9]+$"));
        var _builder = new FormBuilder();
        this.formAddDiscountGroup = _builder.group({});
        this.formAddDiscountGroup.addControl("discountCodeControl", new FormControl('', Validators.required));
        this.formAddDiscountGroup.addControl("discountExpiryDateControl", new FormControl('', Validators.required));
        this.formAddDiscountGroup.addControl("discountValueControl", new FormControl('', Validators.compose(numericValidators)));
    }
}