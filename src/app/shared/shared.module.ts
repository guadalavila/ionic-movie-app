import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemMovieComponent } from '../components/item-movie/item-movie.component';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';
import { RateMovieComponent } from '../components/rate-movie/rate-movie.component';


@NgModule({
  exports: [
    ItemMovieComponent,
    SkeletonComponent,
    RateMovieComponent,
  ],
  declarations: [
    ItemMovieComponent,
    SkeletonComponent,
    RateMovieComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
