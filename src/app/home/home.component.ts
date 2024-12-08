import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  imports: [ SideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
