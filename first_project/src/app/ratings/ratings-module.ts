import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RatingComponent } from './rating/rating';

const routes: Routes = [
  {
    path: '',
    component: RatingComponent
  }
];

@NgModule({
  imports: [
    RatingComponent,
    RouterModule.forChild(routes)
  ]
})
export class RatingsModule {}