import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  form!: FormGroup;
  isEditMode:boolean = false;
  constructor(private fb: FormBuilder,public dialog:MatDialogRef<AddUserComponent>,private toasterService:ToastrService,private feedbackService:FeedbackService , @Inject(MAT_DIALOG_DATA) public data:any ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', Validators.required]
    });
    if(this.data) {
      this.isEditMode = this.data['mode'] === 'edit' ? true : false;
      if(this.isEditMode) {
        this.form.get('fullname')?.setValue(this.data.userData.fullname);
        this.form.get('username')?.setValue(this.data.userData.username);
        this.form.get('username')?.disable();
        this.form.get('password')?.setValue(this.data.userData.password);
        if(this.data.userData.roles.includes('ROLE_ADMIN')){
          this.form.get('role')?.setValue('ROLE_ADMIN');
        }
      }
    }
  }

  onSubmit(): void {
    if(!this.form.get('fullname')?.value || this.form.get('fullname')?.value.trim() === ''){
      this.toasterService.error("Please enter Fullname.");
      return;
    }
    if(!this.form.get('username')?.value || this.form.get('username')?.value.trim() === ''){
      this.toasterService.error("Please enter Username.");
      return;
    }
    if(!this.form.get('password')?.value || this.form.get('password')?.value.trim() === ''){
      this.toasterService.error("Please enter password.");
      return;
    }
    let body = {
      fullname: this.form.get('fullname')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      roles: this.form.get('role')?.value ? [this.form.get('role')?.value] : []
    }
    this.feedbackService.createUser(body).subscribe((data)=>{
      this.toasterService.success(data.message);
      this.dialog.close(true)
    },(error)=>{
      this.toasterService.error("Error adding User!");
    });
  }

  onEdit() {
    if(!this.form.get('fullname')?.value || this.form.get('fullname')?.value.trim() === ''){
      this.toasterService.error("Please enter Fullname.");
      return;
    }
    if(!this.form.get('password')?.value || this.form.get('password')?.value.trim() === ''){
      this.toasterService.error("Please enter password.");
      return;
    }
    let body = {
      fullname: this.form.get('fullname')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      id: this.data.userData.id,
      roles: this.form.get('role')?.value ? [this.form.get('role')?.value] : []
    }
    this.feedbackService.updateUser(body).subscribe((data)=>{
      this.toasterService.success(data.message);
      this.dialog.close(true)
    },(error)=>{
      this.toasterService.error("Error updating User!");
    });
  }

  onClose() {
    this.dialog.close();
  }
}
