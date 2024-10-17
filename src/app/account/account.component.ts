import { Component } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { UpdateUserService } from '../update-user.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  currentUser : any;
  constructor(private user: UserAccountService, private userName: UpdateUserService, private router: Router){
    this.currentUser = this.userName.getUser();
  }

  currentView : string = 'changePassword';
  showContent(view : string){
    this.currentView = view;
  }

  emailWarning : string = '';
  passwordWarning : string = '';
  confirmPasswordWarning : string = '';
  userData : any;

  updateForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  })

  emailCheck(){
    this.updateForm.value.email === '' ? this.emailWarning = 'Email cannot be empty!' : this.emailWarning = '';
  }
  passwordCheck(){
    this.updateForm.value.password === '' ? this.passwordWarning = 'Password cannot be empty!' : this.passwordWarning = '';
  }
  confirnPasswordCheck(){
    this.updateForm.value.confirmPassword === '' ? this.confirmPasswordWarning = 'Enter the password again!' : this.confirmPasswordWarning = '';
  }

  submit(){
    if(!this.updateForm.valid){
      this.updateForm.value.email === '' ? this.emailWarning = 'Email cannot be empty!' : this.emailWarning = '';
      this.updateForm.value.password === '' ? this.passwordWarning = 'Password cannot be empty!' : this.passwordWarning = '';
      this.updateForm.value.confirmPassword === '' ? this.confirmPasswordWarning = 'Enter the password again!' : this.confirmPasswordWarning = '';
    }
    else{
      this.user.getUser(this.currentUser).subscribe((response) => {
        this.userData = response;
      })
      if(this.userData.emailId === this.updateForm.value.email){
        if(this.updateForm.value.password === this.updateForm.value.confirmPassword){
          this.user.updateUser(this.currentUser,this.updateForm.value.email,this.updateForm.value.password).subscribe(() => {
            alert('Password Updated Successfully');
            this.updateForm.reset();
        })
        }
        else{
          this.confirmPasswordWarning = "Passwords dosen't match!";
        }
      }
      else{
        this.emailWarning = "Email Id dosen't match with registered Email Id"
      }
    }
  }

  deleteAccount() {
    this.user.deleteUser(this.currentUser).subscribe(() => {
      this.router.navigate(['']);
    })
  }
}
