import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc, doc, updateDoc, deleteDoc
} from '@angular/fire/firestore'
import { NotifyService } from './notify.service';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: Firestore, private notifcation: NotifyService) { }

  saveCategory(categoryData: any) {
    const collectionInstance = collection(this.afs, 'Categories');
    addDoc(collectionInstance, categoryData).then((val) => {  //its a promise method so once its resolved this callback func is executed
      console.log('Data Save success', val);
      this.notifcation.showSuccess('Category added', "We've added that");
    })
      .catch((err) => {
        console.log(err);
      })

  }

  loadData() {

    const collectionInstance = collection(this.afs, 'Categories');
    return collectionData(collectionInstance, { idField: 'id' }); // this returns an observable

  }

  OnUpdateCategory(id: any, categoryData: any) {
    const docInstance = doc(this.afs, 'Categories', id);
    const updatedCategory = {
      category: categoryData.category
    }
    updateDoc(docInstance, updatedCategory).then((result) => {
      console.log(result);
      this.notifcation.showSuccess("We did see that", 'Category Updated');
    })
      .catch((err) => {
        console.log(err)
      })
  }

  OnDeleteCategory(id: any) {
    const docInstance = doc(this.afs, 'Categories', id);
    deleteDoc(docInstance).then((val) => {
      this.notifcation.showError("Oops! That went to Bin", 'Category Deleted');
    })
      .catch((err) => {
        console.log(err)
      })
  }
}
