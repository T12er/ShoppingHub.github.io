import { FormControl, ValidationErrors } from "@angular/forms";

export class FormShopValidators {

    //whitespace validattion

    static notOnlyWhitespace(control : FormControl) : ValidationErrors{


        //check if string only has white space

        if((control.value !=null)  && (control.value.trim().minLength===0)){

            //invalid , return the error object
            return {'notOnlyWhitespace': true}
        }

       else{
           return null;
       
        
    }
}
}
