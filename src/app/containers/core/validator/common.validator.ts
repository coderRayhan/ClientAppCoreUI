import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CommonValidator{

    static isContainsAnySpecialChar(value: any): boolean{
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return format.test(value);
    }

    static isContainsUpper(value: any): boolean{
        const format = /[A-Z]/;
        return format.test(value);
    }

    static isContainsLower(value: any): boolean{
        const format = /[a-z]/;
        return format.test(value);
    }

    static isContainsAlpha(value: any): boolean{
        const format = /[a-zA-Z]/;
        return format.test(value);
    }

    static isContainsNumeric(value: any): boolean{
        const format = /[0-9]/;
        return format.test(value);
    }

    static isContainsSequential(s: any): boolean{
        // Check for sequential numerical characters
        for ( const i in s) {
            if (+s[+i + 1] === +s[i] + 1 &&
                +s[+i + 2] === +s[i] + 2) {return false; }
        }
        // Check for sequential alphabetical characters
        for (const i in s){
            if (String.fromCharCode(s.charCodeAt(i) + 1) === s[+i + 1] &&
                String.fromCharCode(s.charCodeAt(i) + 2) === s[+i + 2]) {return false; }
        }

        return true;
    }




    // for check is negetive
    static isNegativeNumber(value: number): boolean{
        if (value < 0){
            return true;
        }
        return false;
    }


  static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn
  {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      // Get the control and matching control
      const control = formGroup.get(controlPath);
      const matchingControl = formGroup.get(matchingControlPath);

      // Return if control or matching control doesn't exist
      if ( !control || !matchingControl )
      {
        return null;
      }

      // Delete the mustMatch error to reset the error on the matching control
      if ( matchingControl.hasError('mustMatch') )
      {
        // @ts-ignore
        delete matchingControl.errors.mustMatch;
        matchingControl.updateValueAndValidity();
      }

      // Don't validate empty values on the matching control
      // Don't validate if values are matching
      if ( this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value )
      {
        return null;
      }

      // Prepare the validation errors
      const errors = {mustMatch: true};

      // Set the validation error on the matching control
      matchingControl.setErrors(errors);

      // Return the errors
      return errors;
    };
  }

  static isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }



}

