import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Login } from '../models/Login';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role!: string | null;
  loginForm!: FormGroup;
  errorMessage!: string;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role')
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const creds = new Login(this.loginForm.get('email')?.value.toString(), this.loginForm.get('password')?.value.toString())
    if (this.role === "user") {
      this.userLogin(creds);
    } else {
      this.adminLogin(creds);
    }
  }
  userLogin(creds: Login) {
    this.authService.userLogin(creds).subscribe(
      {
        next: data => {
          // console.log(data);
          if (data != null) {
            console.log(data);
            this.role = 'user'
            this.user = data
            if(this.user.password==creds.password){
            this.authService.saveLoggedInData(this.role, this.user);
            this.router.navigate(["/user/dashboard/work-items"])
            }
            else {
              this.errorMessage = "Invalid Credentials!"
            }
            
          } 
        },
        error: error => console.log(error)
      })
  }
  adminLogin(creds: Login) {
    this.authService.adminLogin(creds).subscribe(
      {
        next: data => {
          if (data != null) {
            console.log("Done");
            console.log(data.emailId)
            this.role = 'admin'
            this.authService.saveLoggedInData(this.role, data);
            this.router.navigate(["/admin/dashboard/terminals"])
          } else {
            this.errorMessage = data.message
          }
        },
        error: error => console.log(error)
      })
  }

}
