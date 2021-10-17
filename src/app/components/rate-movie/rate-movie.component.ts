import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.scss'],
})
export class RateMovieComponent implements OnInit {
  @Input()
  stars: number;

  @Output()
  updateMovie = new EventEmitter<any>();

  icons: string[] = [];

  constructor() { }

  ngOnInit() {
    this.generateRate();
  }

  generateRate() {
    this.icons = [];
    for (let i = 1; i <= this.stars; i++) {
      this.icons.push('star');
    }
    for (let i = this.stars; i < 5; i++) {
      this.icons.push('star-outline');
    }
  }

  updateRateFilm(updateStar: number) {
    if (this.stars !== updateStar) {
      this.stars = updateStar;
      this.updateMovie.emit(this.stars);
      this.generateRate();
    }
  }
}
