import { Component, OnInit } from '@angular/core';
import { Discover } from 'src/app/models/discover';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  movies: Discover[] = [];
  loading = true;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getDiscoverMovies();
  }

  private async getDiscoverMovies() {
    this.moviesService.getDiscoverMovies().subscribe(res => {
      this.movies = res?.results?.map((movie) => ({
        name: movie.title,
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
      }));
      this.loading = false;
    }, (err) => {
      this.loading = false;
      console.log(err.message);
    });
  }

}
