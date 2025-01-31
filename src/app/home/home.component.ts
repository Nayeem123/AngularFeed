import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ SideBarComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router){
    
  }

  onLogout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userName')
    this.router.navigate(['/login']);
    console.log("LOGOUT")
  }
}
