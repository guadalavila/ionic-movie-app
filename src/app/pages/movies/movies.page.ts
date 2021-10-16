import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movieList: Movie[] =[];
  loading = true;

  constructor(private router: Router, private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies().subscribe(res =>{
      this.movieList = res.map((movie) =>({
            id: movie.payload.doc.id,
            ...movie.payload.doc.data() as Movie
          }));
      this.loading = false;
      console.log(this.movieList);
    });
  }

  goToDetail(currentMovie: Movie) {
    this.router.navigate(['/movies/detail'], { state: {...currentMovie } });
  }
}
