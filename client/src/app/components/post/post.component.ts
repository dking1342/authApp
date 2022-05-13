import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs.service';
import { BlogInterface } from 'types/types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private paramId: number = 0;
  public blogPost: BlogInterface = {userId:1,id:1,title:"",body:""};

  constructor(
    private blogs: BlogsService, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.paramId = +this.route.snapshot.paramMap.get('id')!;
    this.blogs.getPost(this.paramId).subscribe(res => {
      this.blogPost = res;
    })
  }

}
