import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private CategoryService: CategoriesService) { }


  //categoryList!: Array<object>;
  categoryList: any[] = [];
  formCategory: string;
  formStatus = 'Add';
  categoryID: string;
  ngOnInit(): void {

    this.CategoryService.loadData().subscribe(data => { //load data method returns an observable
      this.categoryList = data;
      console.log(this.categoryList);
    })

  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }
    if (this.formStatus == 'Add') {

      this.CategoryService.saveCategory(categoryData);
      formData.reset();
      //console.log(categoryData);

    } else if (this.formStatus == 'Edit') {
      this.CategoryService.OnUpdateCategory(this.categoryID, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }


  onEdit(id: any, category: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryID = id;
  }

  onDelete(id: any) {
    this.CategoryService.OnDeleteCategory(id);
  }

}





