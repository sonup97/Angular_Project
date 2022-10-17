import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  updateMode: boolean = false;
  id!: any;
  successMessage!: string;
  errorMessage!:string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    this.fetchUserById();
  }

  fetchUserById() {
    this.userService.fetchUserById(this.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.user = data;
      }
    })
  }

  updateModeToggle() {
    this.updateMode = !this.updateMode
  }

  updateDetails(officeAddr: string, permAddr: string, mobileNo: string) {
    this.successMessage="";
    this.userService.updateUserById({ "mobileNumber": mobileNo, "permanentAddress": permAddr, "officeAddress": officeAddr }, this.id).subscribe(
      resp=>{},
      error=>{
        this.successMessage="User Details Updated Successfully!";
      })
  }

}
