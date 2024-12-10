import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule  } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-management',
  imports: [MatTableModule, MatPaginatorModule,MatRippleModule,CommonModule,MatDialogModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent  implements OnInit{
  usersList: any[] = [];
  constructor(private feedbackService:FeedbackService,private toaster:ToastrService,private dialog:MatDialog){
  }

  displayedColumns: string[] = ['name', 'role', 'username', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  requestInProgress:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    // this.getUsersList();
    this.usersList = [{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    },{
      username:'Hello123',
      fullname:'onetwothree',
      roles:["ROLE_USER","ROLE_ADMIN"],
      password:null
    }];
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
  }

  addUser() {
    const dialog = this.dialog.open(AddUserComponent,{
      width: '400px',
      height : 'auto',
      maxWidth:'400px',
      panelClass :'panel-cls'
    });

    dialog.afterClosed().subscribe((result:any) => {
      if(result) {
        this.getUsersList();
      }
    })
  }

  deleteUser(user:any) {

  }

  getUsersList() {
    this.requestInProgress = true;
    this.feedbackService.fetchUsers().subscribe((data)=>{
      this.usersList = data.userList;
      this.dataSource = new MatTableDataSource(data.userList);
      this.dataSource.paginator = this.paginator;
      this.requestInProgress = false;
    },(error)=>{
      this.toaster.error("Eror Fetching User List!");
      this.requestInProgress = false;
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  fetchRoles(roles:[]) {
    const mapRoles :{[key:string]:string} ={
      ROLE_ADMIN:'Administartor',
      ROLE_USER:'User'
    }
    return roles.map(role => mapRoles[role] || role).join(' , ');
  }
}
