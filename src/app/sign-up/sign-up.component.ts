import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../user-account.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private user: UserAccountService, private router: Router){}

  redirecting: boolean = false;
  userData : any;
  userNameWarning : string = '';
  emailWarning : string = '';
  passwordWarning : string = '';
  confirmPasswordWarning : string = '';
  check : boolean | undefined = false;

  signUpForm = new FormGroup({
    userName : new FormControl('',Validators.required),
    emailId : new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  });

  userNameCheck(){
    this.signUpForm.value.userName === '' ? this.userNameWarning = 'Username cannot be empty!' : this.userNameWarning = '';
  }
  emailCheck(){
    this.signUpForm.value.emailId === '' ? this.emailWarning = 'Email cannot be empty!' : this.emailWarning = '';
  }
  passwordCheck(){
    this.signUpForm.value.password === '' ? this.passwordWarning = 'Password cannot be empty!' : this.passwordWarning = '';
  }
  confirnPasswordCheck(){
    this.signUpForm.value.confirmPassword === '' ? this.confirmPasswordWarning = 'Enter the password again!' : this.confirmPasswordWarning = '';
  }

  handleSubmit() {
    if(!this.signUpForm.valid){
      this.signUpForm.value.userName === '' ? this.userNameWarning = 'Username cannot be empty!' : this.userNameWarning = '';
      this.signUpForm.value.emailId === '' ? this.emailWarning = 'Email cannot be empty!' : this.emailWarning = '';
      this.signUpForm.value.password === '' ? this.passwordWarning = 'Password cannot be empty!' : this.passwordWarning = '';
      this.signUpForm.value.confirmPassword === '' ? this.confirmPasswordWarning = 'Enter the password again!' : this.confirmPasswordWarning = '';

    }
    else{
      if(this.signUpForm.value.password === this.signUpForm.value.confirmPassword){
        this.user.setUser(this.signUpForm.value.userName,this.signUpForm.value.emailId,this.signUpForm.value.password).subscribe((response) => {
          this.userData = response;
          this.redirecting = true;
          setTimeout(() => {
            this.router.navigate(['']);
          },3000)
      })
      }
      else{
        this.confirmPasswordWarning = "Passwords dosen't match!";
      }
    }
  }

}
