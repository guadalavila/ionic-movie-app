import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemMovieComponent } from './item-movie/item-movie.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { RateMovieComponent } from './rate-movie/rate-movie.component';
import { LoadingComponent } from './loading/loading.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';

@NgModule({
  exports: [
    ItemMovieComponent,
    SkeletonComponent,
    RateMovieComponent,
    LoadingComponent,
    EditMovieComponent,
  ],
  declarations: [
    ItemMovieComponent,
    SkeletonComponent,
    RateMovieComponent,
    LoadingComponent,
    EditMovieComponent,
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}
