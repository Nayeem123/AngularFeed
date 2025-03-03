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
    let isAdmin, userRole;
    if (isPlatformBrowser(this.platformId)) {
     isAdmin = JSON.parse(localStorage['isAdmin']) || false;
     userRole = localStorage['role'];
    }
    
    let adminRoutes = [
      {
        title: 'User Management',
        path:'/home/manage-user'
      },
      {
        title: 'Feedback',
        path:'/home/feedback'
      },
      {
        title: 'Profile',
        path:'/home/profile'
      },
      {
        title: 'Analytics',
        path:'home/analytics'
      }
    ];

    let supportRoutes = [
      {
        title: 'Feedback',
        path:'/home/support-dashboard'
      },
      {
        title: 'Profile',
        path:'/home/profile'
      }
    ];

    let userRoutes = [
      {
        title: 'Feedback',
        path:'/home/feedback'
      },
      {
        title: 'Profile',
        path:'/home/profile'
      }
    ];

    if(userRole == 'ROLE_ADMIN') {
      this.userTabs = adminRoutes;
    }
    else if(userRole == 'ROLE_SUPPORT') {
      this.userTabs = supportRoutes;
    }
    else {
      this.userTabs = userRoutes;
    }
  }

  navigateToTab(tab:any) {
    console.log("tab",tab);
    this.router.navigate([tab.path]);
  }

}
