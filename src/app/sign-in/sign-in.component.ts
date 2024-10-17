import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../user-account.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { UpdateUserService } from '../update-user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private user: UserAccountService, private router: Router, private updateUser: UpdateUserService){}
  userData : any;
  userNameWarning : string = '';
  passwordWarning : string = '';
  signInForm = new FormGroup({
    userName : new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  userNameCheck(){
    this.signInForm.value.userName === '' ? this.userNameWarning = 'Username cannot be empty!' : this.userNameWarning = '';
  }
  passwordCheck(){
    this.signInForm.value.password === '' ? this.passwordWarning = 'Password cannot be empty!' : this.passwordWarning = '';
  }

  handleSubmit() {
    if(!this.signInForm.valid){
      this.signInForm.value.userName === '' ? this.userNameWarning = 'Username cannot be empty!' : this.userNameWarning = '';
      this.signInForm.value.password === '' ? this.passwordWarning = 'Password cannot be empty!' : this.passwordWarning = '';
    }
    else{
      this.user.getUser(this.signInForm.value.userName).subscribe((response) => {
        this.userData = response;
        if( this.userData === null){
          this.userNameWarning = 'Incorrect Username, If you are a new User please SignUp to continue!';
        }
        else{
          if (this.userData.password == this.signInForm.value.password){
            this.passwordWarning = '';
            this.updateUser.setUser(this.signInForm.value.userName)
            this.router.navigate(['/data']);
          }
          else{
            this.passwordWarning = 'Incorrect Password, Please try again!'
          }
        }
      })
    }
    
  }
}
