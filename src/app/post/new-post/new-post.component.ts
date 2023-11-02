import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;

    })
  }
  categories: any[] = [];
  titleForPermalink: string = '';
  imgSrcUrl: any = './assets/Placeholder.jpg';
  selectImg: any;
  OnTitleChange(event: any) {

    let title = event.target.value;
    this.titleForPermalink = title.replace(/\s/g, '-');
  }
  showPreview($event) {

    const reader = new FileReader();
    reader.onload = (res) => {

      this.imgSrcUrl = res.target.result;
      console.log($event);
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectImg = $event.target.files[0];
  }
}
