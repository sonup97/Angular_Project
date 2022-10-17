import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      passportNumber: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
      personalIdentificationNumber: ['', [Validators.required, Validators.min(100000000000), Validators.max(999999999999)]],
      permanentAddress: ['', [Validators.required]],
      officeAddress: ['', [Validators.required]],
    });
  }

  registerVendor() {

    this.errorMessage = ""

    let user = new User();
    user.password = this.registerForm.get('password')?.value?.toString()

    if (user.password !== this.registerForm.get('confirmPassword')?.value?.toString()) {
      this.errorMessage = "Passwords are not matching!"
      return
    }

    user.firstName = this.registerForm.get('firstName')?.value?.toString()
    user.lastName = this.registerForm.get('lastName')?.value?.toString()
    user.emailId = this.registerForm.get('email')?.value?.toString()
    user.mobileNumber = this.registerForm.get('mobileNumber')?.value
    user.nationality = this.registerForm.get('nationality')?.value?.toString()
    user.passportNumber = this.registerForm.get('passportNumber')?.value?.toString()
    user.personalIdentificationNumber = this.registerForm.get('personalIdentificationNumber')?.value?.toString()
    user.permanentAddress = this.registerForm.get('permanentAddress')?.value?.toString()
    user.officeAddress = this.registerForm.get('officeAddress')?.value?.toString()

    this.authService.registerVendor(user).subscribe({
      next: data => {
        if (data.userId) {
          alert(`Registration Successful. Your User Id is: ${data.userId}.  Please login to continue`)
          this.router.navigate(['/login/user'])
        }
        this.errorMessage = data.message
      },
      error: error => console.log(error)
    })
  }

}
