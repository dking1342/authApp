import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';
import { BlogInterface } from 'types/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blogArray: BlogInterface[] = [];

  constructor(private blogs: BlogsService) {}

  ngOnInit(): void { 
    this.blogs.getBlogs().subscribe(res => {
      this.blogArray = res;
    })
  }

  showItem(item:BlogInterface){
    console.log('show item',item)
    this.blogArray = this.blogArray.filter(b=> b.id === item.id);
  }

}
