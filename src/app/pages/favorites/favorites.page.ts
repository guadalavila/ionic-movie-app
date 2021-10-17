import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  albums: Album[] = [];

  constructor(private moviesService: MoviesService, private helperService: HelpersService) {}

  ngOnInit() {
    this.getNews();
  }

  ionViewDidEnter() {
  }

  async getNews() {
    const loading = await this.helperService.showLoading('Cargando...');
    loading.present();
    this.moviesService.getNewReleases().then(
      (res) => {
        this.albums =res.albums?.items.map((release) => ({
            name: release.name,
            artist: release.artists[0].name,
            image: release.images[0].url
          }));
          loading.dismiss();
      },
      (err) => {
        loading.dismiss();
        console.log(err);
      }
    );
  }
}
