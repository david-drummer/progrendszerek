import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookclubList } from './bookclub-list/bookclub-list';
import { BookclubDetail } from './bookclub-detail/bookclub-detail';

const routes: Routes = [
  { path: '', component: BookclubList },
  { path: ':id', component: BookclubDetail }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    BookclubList,
    BookclubDetail
  ]
})
export class BookclubsModule {}