import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  constructor(private postservice: PostService) { }

  postArray: Array<object>
  ngOnInit(): void {
    this.postservice.loadData().subscribe((val) => {

      this.postArray = val;
      console.log(this.postArray)
    })
  }
  OnDelPost(id) {
    this.postservice.onDelPost(id)
  }
  onFeatured(postId, featureStatus) {
    this.postservice.featureChange(postId, featureStatus);
  }
}
