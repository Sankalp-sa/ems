import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  RegisterForm!: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {

    this.RegisterForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {updateOn: 'blur', validators: [CustomValidator.passwordMatch]})

  }

  register() {
    if (this.RegisterForm.valid) {

      const { userName, email, password } = this.RegisterForm.value;
      this.registerService.register(userName, email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Handle successful registration, e.g., navigate to login page or show a success message
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle registration error, e.g., show an error message
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
