import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  standalone: true,
})
export class SideBarComponent implements OnInit{
  constructor(private router:Router,@Inject(PLATFORM_ID) private platformId: Object) {

  }
  userTabs:any = [];

  ngOnInit(): void {
    let isAdmin;
    if (isPlatformBrowser(this.platformId)) {
     isAdmin = JSON.parse(localStorage['isAdmin']) || false;
    }
    this.userTabs = (isAdmin) ? [
      {
        title: 'User Management',
        path:'/home/manage-user'
      },
      {
        title: 'Profile',
        path:'/home/profile'
      }
    ] : [
      {
        title: 'Feedback',
        path:'/home/feedback'
      },
      {
        title: 'Profile',
        path:'/home/profile'
      }
    ]
  }

  navigateToTab(tab:any) {
    console.log("tab",tab);
    this.router.navigate([tab.path]);
  }

}
