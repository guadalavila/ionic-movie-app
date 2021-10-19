import { Component, OnInit } from '@angular/core';
import { Discover } from 'src/app/models/discover';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  movies: Discover[] = [];
  loading = true;

  constructor(private moviesService: MoviesService, private helpers: HelpersService) { }

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
    }, async () => {
      const toast = await this.helpers.showToast({
        message: 'Ocurrio un error al recuperar las peliculas',
        type: 'error',
      });
      this.loading = false;
      toast.present();
    });
  }

}
