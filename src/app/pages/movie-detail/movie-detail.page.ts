import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { PROPERTY_FAVORITES } from 'src/app/config/const';
import { Movie } from 'src/app/models/movie.model';
import { EventsService } from 'src/app/services/events.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  public movie: Movie;
  public isFavorite = false;
  private refreshMovie = false;

  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private utilsService: UtilsService,
    private moviesService: MoviesService,
    private helpersService: HelpersService,
    public event: EventsService
  ) {
    this.event.getObservable().subscribe((data) => {
      if (data === 'updateMovie') {
        this.refreshMovie = true;
      }
    });
  }

  ngOnInit() {
    this.movie = this.router.getCurrentNavigation().extras.state as Movie;
    this.isFavorite = this.utilsService.isFavoriteMovie(this.movie.name);
  }

  ionViewDidEnter() {
    if (this.refreshMovie) {
      this.moviesService.getMovie(this.movie.id).subscribe((res) => {
        this.movie = res as Movie;
      });
    }
  }

  public showMoreActions() {
    this.presentActionSheet();
  }

  public updateMovieRate(stars: number) {
    const movie: Movie = this.movie;
    movie.stars = stars;
    this.moviesService.updateMovie(movie.id, movie);
  }

  private async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Editar Pelicula',
          icon: 'pencil',
          handler: async () => {
            this.router.navigate(['/movies/detail/edit'], {
              state: { ...this.movie },
            });
          },
        },
        {
          text: this.isFavorite ? 'Eliminar de Favorito' : 'Agregar a Favorito',
          icon: 'heart',
          handler: () => this.addRemoveToFavorite(),
        },
        {
          text: 'Eliminar Pelicula',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.presentAlertDelete(),
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private async presentAlertDelete() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Está seguro que desea eliminar la pelicula?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: async () => {
            const loading = await this.helpersService.showLoading('Eliminando...');
            loading.present();
            this.moviesService.deleteMovie(this.movie.id).then(() => {
              loading.dismiss();
              this.router.navigateByUrl('/movies');
            }, () => {
              loading.dismiss();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private addRemoveToFavorite() {
    const favorites = JSON.parse(
      this.utilsService.getKeyLocalStorage(PROPERTY_FAVORITES)
    );
    if (favorites) {
      if (this.isFavorite) {
        const favoritesUpdate = favorites.filter((x) => x !== this.movie.name);
        this.utilsService.setKeyLocalStorage(
          PROPERTY_FAVORITES,
          JSON.stringify(favoritesUpdate)
        );
      } else {
        const favoritesUpdate = [...favorites, this.movie.name];
        this.utilsService.setKeyLocalStorage(
          PROPERTY_FAVORITES,
          JSON.stringify(favoritesUpdate)
        );
      }
    } else {
      this.utilsService.setKeyLocalStorage(
        PROPERTY_FAVORITES,
        JSON.stringify([this.movie.name])
      );
    }
    this.isFavorite ? (this.isFavorite = false) : (this.isFavorite = true);
  }

}
