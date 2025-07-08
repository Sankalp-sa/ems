import { FormGroup } from "@angular/forms";

export class CustomValidator {
    static passwordMatch(control: FormGroup) {

        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        if (password && confirmPassword && password !== confirmPassword) {
            
            control.get('confirmPassword')?.setErrors({passwordMismatch : true })
            return { passwordMismatch: true };
        }
        return null;
    }
}