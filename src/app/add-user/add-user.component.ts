import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private fb: FormBuilder,public dialog:MatDialogRef<AddUserComponent>,private toasterService:ToastrService,private feedbackService:FeedbackService ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['user', Validators.required]
    });
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
    if(!this.form.get('role')?.value || this.form.get('role')?.value.trim() === ''){
      this.toasterService.error("Please select role.");
      return;
    }
    let body = {
      fullname: this.form.get('fullname')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
      role: this.form.get('role')?.value
    }
    this.feedbackService.createUser(body).subscribe((data)=>{
      this.toasterService.success(data.message);
      this.dialog.close(true)
    },(error)=>{
      this.toasterService.error("Error adding User!");
    })
  }

  onClose() {
    this.dialog.close();
  }
}
