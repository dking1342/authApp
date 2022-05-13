import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LogoutComponent } from './components/logout/logout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsService } from './services/blogs.service';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    LogoutComponent,
    DashboardComponent,
    RegisterComponent,
    HeaderComponent,
    BlogComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"register",
        component:RegisterComponent
      },
      {
        path:"admin",
        component:AdminComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"dashboard",
        component:DashboardComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"logout",
        component:LogoutComponent
      },
      {
        path:"post/:id",
        component:PostComponent
      },
      {
        path:"",
        component:HomeComponent
      }
    ])
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    BlogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
