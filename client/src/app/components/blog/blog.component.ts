import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogInterface } from 'types/types';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  @Input() item!: BlogInterface;
  @Output() onShowItem: EventEmitter<BlogInterface> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onShow(item:BlogInterface){
    this.onShowItem.emit(item);
  }

}
