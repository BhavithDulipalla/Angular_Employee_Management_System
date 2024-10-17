import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { GetDataService } from '../get-data.service';
import { UpdateUserService } from '../update-user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  currentUser : any;
  constructor(private api: GetDataService, private user: UpdateUserService) {
    this.currentUser = this.user.getUser();
  }

  menu_items : boolean = true;
  user_items : boolean = true;
  idWarning : string = '';
  employeeIdWarning : string = '';
  nameWarning : string = '';
  designationWarning : string = '';
  employeeData : any;
  employee : any = {};
  content : any;

  showMenu(){this.menu_items = false}
  hideMenu(){this.menu_items = true}
  showUser(){this.user_items = false}
  hideUser(){this.user_items = true}

  showContent(value : string){
    this.content = value;
    this.searchAndDelete.reset();
    this.employeeForm.reset();
    this.employee = {};
  }

  employeeForm = new FormGroup({
    id : new FormControl('',Validators.required),
    name : new FormControl('',Validators.required),
    designation : new FormControl('',Validators.required)
  })

  searchAndDelete = new FormGroup({
    employeeId : new FormControl('',Validators.required)
  })

  getAll() {
    this.idWarning = '';
    this.nameWarning = '';
    this.designationWarning = '';
    this.api.getEmployees().subscribe((response) => {
      this.employeeData = response;
    })
  }
  search() {
    if(this.searchAndDelete.value.employeeId === ''){
      this.employeeIdWarning = 'Employee Id is Required';
    }
    else{
      this.employeeIdWarning = '';
      this.api.searchEmployee(this.searchAndDelete.value.employeeId).subscribe((response) => {
        if (response === null){
          this.employeeIdWarning = 'Invalid Employee Id, No Employee found';
        }
        else{
          this.employee = response;
          this.searchAndDelete.reset();
        }
      })
    }
  }
  add() {
    if(!this.employeeForm.valid){
      this.employeeForm.value.id === '' ? this.idWarning = 'Employee Id is Required' : this.idWarning = '';
      this.employeeForm.value.name === '' ? this.nameWarning = 'Employee Name is Required' : this.nameWarning = '';
      this.employeeForm.value.name === '' ? this.designationWarning = 'Employee Designation is Required' : this.designationWarning = '';
    }
    else{
      const employee = {
        empId : this.employeeForm.value.id,
        empName : this.employeeForm.value.name,
        empDesignation : this.employeeForm.value.designation
      }
      this.api.setEmployee(employee).subscribe((response) => {
        alert('Employee Record Successfully Added')
      })
    }
  }
  update() {
    if(!this.employeeForm.valid){
      this.employeeForm.value.id === '' ? this.idWarning = 'Employee Id is Required' : this.idWarning = '';
      this.employeeForm.value.name === '' ? this.nameWarning = 'Employee Name is Required' : this.nameWarning = '';
      this.employeeForm.value.name === '' ? this.designationWarning = 'Employee Designation is Required' : this.designationWarning = '';
    }
    else{
      const employee = {
        empId : this.employeeForm.value.id,
        empName : this.employeeForm.value.name,
        empDesignation : this.employeeForm.value.designation
      }
      this.api.updateEmployee(employee).subscribe((response) => {
        if (response === null){
          this.idWarning = 'Invalid Employee Id, No Employee found';
        }
        else{
          alert('Employee Record Successfully Updated')
        }
      })
    }
  }
  remove() {
    if(this.searchAndDelete.value.employeeId === ''){
      this.employeeIdWarning = 'Employee Id is Required';
    }
    else{
      this.api.deleteEmployee(this.searchAndDelete.value.employeeId).subscribe((response) => {
        if (response === null){
          this.employeeIdWarning = 'Invalid Employee Id, No Employee found';
        }
        else{
          alert('Employee Record Successfully Removed')
        }
      })
    }
  }
}
