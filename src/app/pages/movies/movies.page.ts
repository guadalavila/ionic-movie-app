import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movieList: Movie[] = [];
  loading = true;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private authService: AuthService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  public goToDetail(currentMovie: Movie) {
    this.router.navigate(['/movies/detail'], {
      state: { ...currentMovie },
    });
  }

  public async logOut() {
    const alert = await this.helpersService.showAlertConfirm(
      'Cerrar Sesión',
      '¿Confirma que desea cerrar sesión?',
      true,
      () => this.signout(),
    );
    alert.present();
  }

  private signout() {
    this.authService.signoutUser().then((res) => {
      this.router.navigateByUrl('/login');
    }, () => { }
    );
  }

  private getMovies() {
    this.moviesService.getMovies().subscribe(
      (res) => {
        this.movieList = res.map((movie) => ({
          id: movie.payload.doc.id,
          ...(movie.payload.doc.data() as Movie),
        }));
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
