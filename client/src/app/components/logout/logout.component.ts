import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.user.logout().subscribe(res => {
      if(res.success){
        localStorage.removeItem("user");
        this.router.navigate([''])
        this.auth.setLoggedIn(false);
      } else {
        window.alert('Error!')
      }
    })
  }

}
