import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../feedback.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  constructor(private feedbackService : FeedbackService){
    
  }
  ngOnInit(): void {
   
  }


  onLogin(){
    console.log("Username",this.userName);
    console.log("password",this.password);
    let submitData = {

    }
    this.feedbackService.loginUser(submitData).subscribe({

    })
  }
}
