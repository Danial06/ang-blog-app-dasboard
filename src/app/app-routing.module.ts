import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductGuardService } from 'src/app/services/auth.guard'
const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [ProductGuardService] },
  { path: "login", component: LoginComponent },
  { path: "category", component: CategoriesComponent, canActivate: [ProductGuardService] },
  { path: "posts", component: AllPostComponent, canActivate: [ProductGuardService] },
  { path: "posts/new", component: NewPostComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
