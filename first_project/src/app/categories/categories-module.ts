import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoryList } from './category-list/category-list';

const routes: Routes = [
  { path: '', component: CategoryList }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoryList
  ]
})
export class CategoriesModule {}