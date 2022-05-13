import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(e:any){
    e.preventDefault();
    const target = e.target;
    // let username = target.querySelector("#username").value;
    // let password = target.querySelector("#password").value;

    this.Auth.getUserDetails(this.username, this.password).subscribe((data:any) => {
      if (data.success){
        localStorage.setItem("user",this.username);
        // redirect
        this.router.navigate(['admin']);
        this.Auth.setLoggedIn(true);
      } else {
        window.alert(data.message);
        this.Auth.setLoggedIn(false);
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
      }
    });
  }

}
