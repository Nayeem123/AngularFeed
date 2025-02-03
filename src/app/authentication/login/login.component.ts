import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../feedback.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalserviceService } from '../../service/globalservice.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  constructor(
    private feedbackService: FeedbackService,
    private toasterService: ToastrService,
    private router: Router,
    private globalService :GlobalserviceService
  ) {}
  ngOnInit(): void {}

  onLogin() {
    console.log('Username', this.userName);
    console.log('password', this.password);
    let submitData = {
      username: this.userName,
      password: this.password,
    };
    this.feedbackService.loginUser(submitData).subscribe(
      (response) => {
        localStorage.setItem('userName', submitData.username);
        if (
          response &&
          response.user &&
          response.user.roles &&
          response.user.roles.includes('ROLE_ADMIN')
        ) {
          localStorage['isAdmin'] = true;
          this.globalService.isAdmin = true;
        } else {
          localStorage['isAdmin'] = false;
          this.globalService.isAdmin = false;
        }
        if (response.user.roles && response.user.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/home/manage-user']);
        } else {
          this.router.navigate(['/home/feedback']);
        }
      },
      (err) => {
        this.toasterService.error('Login Failed!');
      }
    );
  }
}
