import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  standalone: true,
})
export class SideBarComponent implements OnInit{
  constructor(private router:Router) {

  }
  userTabs:any = [];

  ngOnInit(): void {
    let userRole = 'admin';
    this.userTabs = userRole === 'admin' ? [
      {
        title: 'User Management',
        path:'/manage-user'
      },
      {
        title: 'Profile',
        path:'/profile'
      }
    ] : [
      {
        title: 'Feedback',
        path:'/feedback'
      },
      {
        title: 'Profile',
        path:'/profile'
      }
    ]
  }

  navigateToTab(tab:any) {
    console.log("tab",tab);
    this.router.navigate([tab.path]);
  }

}
