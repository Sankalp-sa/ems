import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class CustomValidators {
  static dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;

    const start = new Date(group.get('startDate')?.value);
    const end = new Date(group.get('endDate')?.value);

    if (!start || !end) return null;

    if(start> end)
    {
        group.get('endDate')?.setErrors({ dateRangeInvalid: true });
        return { dateRangeInvalid: true };
    }

   else
   {
        group.get('endDate')?.setErrors(null)
        return null;

   }
  }


}
