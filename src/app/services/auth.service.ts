import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  constructor(private auth: Auth, private notify: NotifyService,
    private route: Router) { }

  login(email, pass) {
    signInWithEmailAndPassword(this.auth, email, pass).then(res => {
      this.getAuthFire(); //sets the username in localstorage
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.notify.showSuccess('Logged In Successfully', 'LOL');
      this.route.navigate(['/'])
    })
      .catch((error) => {
        this.notify.showWarning('BRO Who are you', 'LOL');
        console.log(error);
      })

  }

  //get User
  //get Authenticated user from firebase
  getAuthFire() {
    localStorage.setItem('user', JSON.stringify(this.auth.currentUser))
    return this.auth.currentUser;
  }
  //Logout
  Logout() {
    signOut(this.auth).then((res) => {
      this.notify.showSuccess("Logged out Successfully", "Bye bye")
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.route.navigate(['/login'])
    })


  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  //get Authenticated user from Local Storage
  // getAuthLocal() {
  //   const token = localStorage.getItem('user')
  //   const user = JSON.parse(token as string);
  //   return user;
  // }

  // loaduser() { 
  //   authState.subscribe(user => { 
  //     console.log(user);
  //   })
  // }

  // Login(email: string, password: string) {
  //   return signInWithEmailAndPassword(this.auth, email, password)
  //     .then((result: any) => {
  //       this.UserData = result.user;
  //       this.ngZone.run(() => {
  //         this.router.navigate(['/dashboard']);
  //       });
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }

}
