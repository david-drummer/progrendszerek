import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { BookclubManagement } from './bookclub-management/bookclub-management';
import { CategoryManagement } from './category-management/category-management';
//import { RatingModeration } from './rating-moderation/rating-moderation';

const routes: Routes = [
  { path: '', component: AdminDashboard },
  { path: 'bookclubs', component: BookclubManagement },
  { path: 'categories', component: CategoryManagement }
  //{ path: 'ratings', component: RatingModeration },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AdminDashboard, BookclubManagement, CategoryManagement], //RecipeManagement, CategoryManagement, RatingModeration
})
export class AdminModule {}