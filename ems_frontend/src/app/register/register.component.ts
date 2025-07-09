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

  managerList: any[] = [];

  roles = [
    { value: 'user', viewValue: 'User' },
    { value: 'manager', viewValue: 'Manager' },
    { value: 'admin', viewValue: 'Admin' }
  ];

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {

    this.RegisterForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      manager: ['']
    }, {updateOn: 'blur', validators: [CustomValidator.passwordMatch]})

    this.getManagers();

  }

  register() {

    console.log('Register Form Value:', this.RegisterForm.value);

    if (this.RegisterForm.valid) {

      const { userName, email, password, role, manager } = this.RegisterForm.value;
      this.registerService.register(userName, email, password, role, manager).subscribe({
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

  getManagers(){
    this.registerService.getManagers().subscribe({
      next: (managers) => {
        this.managerList = managers as any[];
        console.log('Managers fetched successfully', this.managerList);
      },
      error: (error) => {
        console.error('Failed to fetch managers', error);
        // Handle error in fetching managers
      }
    });
  }

}
