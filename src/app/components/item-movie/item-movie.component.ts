import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-item-movie',
  templateUrl: './item-movie.component.html',
  styleUrls: ['./item-movie.component.scss'],
})
export class ItemMovieComponent implements OnInit {

  @Input()
  movie: Movie;

  stars: string[] =[];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= this.movie.stars; i++) {
      this.stars.push('star');
    }
    for (let i = this.movie.stars; i < 5; i++) {
      this.stars.push('star-outline');
    }
  }

}
