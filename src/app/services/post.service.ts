import { Injectable } from '@angular/core';
//import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Firestore,
  collection,
  collectionData,
  addDoc, doc, updateDoc, deleteDoc, getDoc, getFirestore

} from '@angular/fire/firestore'

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotifyService } from './notify.service';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  //constructor() { }
  constructor(private afs: Firestore, private notifcation: NotifyService,
    private router: Router
    // private storage: AngularFireStorage
  ) { }

  loadData() {

    const collectionInstance = collection(this.afs, 'Posts');
    return collectionData(collectionInstance, { idField: 'id' }); // this returns an observable

  }

  uploadImg(postData: any) {

    const filePath = `/postImg/${Date.now()}`;
    // console.log(filePath);


  }

  addPost(postData: any, formStatus, id) {
    if (formStatus == 'Edit') {
      this.updateData(id, postData);
    } else {

      const collectionInstance = collection(this.afs, 'Posts');
      addDoc(collectionInstance, postData).then((val) => {  //its a promise method so once its resolved this callback func is executed
        // console.log('Data Save success', val);
        this.notifcation.showSuccess('Post added', "We've added that");
      })
        .catch((err) => {
          console.log(err);
        })


      this.router.navigate(['/posts'])
    }
  }

  loadOnePost(id: any) {

    const collectionInstance = collection(this.afs, 'Posts');
    return collectionData(collectionInstance, { idField: 'id' }); // this returns an observable

  }
  updateData(id, PostData) {
    const docInstance = doc(this.afs, 'Posts', id);

    updateDoc(docInstance, PostData).then((result) => {
      //console.log(result);
      this.notifcation.showSuccess("We did see that", 'Post Updated');
      this.router.navigate(['/posts']);
    })
      .catch((err) => {
        console.log(err)
      })
  }
  onDelPost(id) {
    const docInstance = doc(this.afs, 'Posts', id);
    deleteDoc(docInstance).then((val) => {
      this.notifcation.showWarning("Oops! That went to Bin", 'Post Deleted');
    })
      .catch((err) => {
        console.log(err)
      })
  }

  featureChange(id, status) {
    debugger;
    const docInstance = doc(this.afs, 'Posts', id);
    let updatedStatus = {
      isFeatured: status
    }
    updateDoc(docInstance, updatedStatus).then((result) => {
      // console.log("featurestatus", result);
      //this.notifcation.showSuccess("Well we show that in front page", 'Added to featured Posts');
      console.log("feature changed", status);

    })
      .catch((err) => {
        console.log(err)
      })
  }

}
