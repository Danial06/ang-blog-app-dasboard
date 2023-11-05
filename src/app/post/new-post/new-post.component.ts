import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  constructor(private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postservice: PostService,
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(queryID => {
      //get query params from url and search the id in the firebase all posts
      this.docid = queryID.id;
      if (this.docid) {
        this.postservice.loadOnePost(queryID.id).subscribe(allPost => {

          const post = this.findThePost(queryID.id, allPost);
          console.log("from URL", post);
          this.post = post;

          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink, [Validators.required]],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, [Validators.required]],
            postImg: [this.post.postImgPath, [Validators.required]],
            content: [this.post.content, [Validators.required]]

          })
          this.imgSrcUrl = this.post.postImgPath;
          this.formStatus = "Edit";
        })
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', [Validators.required]],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', [Validators.required]],
          postImg: ['', [Validators.required]],
          content: ['', [Validators.required]]

        })
      }
    })
  }
  findThePost(id, res) {

    return res.find(item => item.id == id);

  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;

    })
  }
  postForm: FormGroup
  get fc() {
    //console.log(this.postForm.controls)
    return this.postForm.controls;
  }

  categories: any[] = [];
  titleForPermalink: string = '';
  imgSrcUrl: any = './assets/Placeholder.jpg';
  selectImg: any;
  post: any;
  formStatus = "Add new";
  docid: string;

  OnTitleChange(event: any) {

    let title = event.target.value;
    this.titleForPermalink = title.replace(/\s/g, '-');
  }
  showPreview(event) {

    // const reader = new FileReader();
    // reader.onload = (res) => {

    //   this.imgSrcUrl = res.target.result;

    // }
    // reader.readAsDataURL($event.target.files[0]);
    // this.selectImg = $event.target.files[0];
    // console.log(event.target.value);
    this.imgSrcUrl = event.target.value;

  }
  OnFormSubmit() {
    let CategorywId = this.postForm.value.category.split('-') //get category id with category name
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: CategorywId[0],
        category: CategorywId[1]
      },
      postImgPath: this.imgSrcUrl,
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(postData)

    this.postservice.addPost(postData, this.formStatus, this.docid);
    this.postForm.reset();
    this.imgSrcUrl = './assets/Placeholder.jpg';

  }

}
