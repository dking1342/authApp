import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = "";
  password = "";
  cpassword = "";

  constructor(private Auth: AuthService,private router: Router) { }

  ngOnInit(): void { }

  registerUser(e:any){
    e.preventDefault();
    const errors = [];

    if(this.password != this.cpassword){
      errors.push("Password does not match");
      window.alert("Passwords do no match");
      const form = document.querySelector("#form") as HTMLFormElement;
      form.reset();
    }

    if(!errors.length){
      // error handler
      this.Auth.registerUser(this.username,this.password).subscribe((res:any) => {
        if(res.success){
          localStorage.setItem("user",this.username);
          this.router.navigate(['']);
          this.Auth.setLoggedIn(true);
        } else {
          localStorage.removeItem("user");
          this.Auth.setLoggedIn(false);
          const form = document.querySelector("#form") as HTMLFormElement;
          form.reset();
          window.alert("Register failed");
        }
      });
    }
    
  }
}
