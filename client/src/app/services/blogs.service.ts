import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogInterface } from 'types/types';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getBlogs(){
    return this.http.get<BlogInterface[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPost(id:number){
    return this.http.get<BlogInterface>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
