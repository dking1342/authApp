import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message = "Loading..."
  username = "";

  constructor(private user: UserService,private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("user") || "";
    
    this.user.getUserData(this.username).subscribe(res=>{
      this.message = res.message;

      if(!res.success){
        localStorage.removeItem("user");
        this.router.navigate(['login']);
      }
    })

    // this.user.getData().subscribe(res => {
    //   this.message = res.message;
      
    //   // using localstorage
    //   // if(!res.success){
    //   //   localStorage.removeItem('loggedIn');
    //   // }
    // })
  }

}
