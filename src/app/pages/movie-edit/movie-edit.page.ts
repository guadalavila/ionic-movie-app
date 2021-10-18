import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { EventsService } from 'src/app/services/events.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.page.html',
  styleUrls: ['./movie-edit.page.scss'],
})
export class MovieEditPage implements OnInit {
  movie: Movie;
  ionicForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private helperService: HelpersService,
    private movieService: MoviesService,
    public events: EventsService
  ) { }

  ngOnInit() {
    this.movie = this.router.getCurrentNavigation().extras.state as Movie;
    this.ionicForm = this.formBuilder.group({
      name: [
        this.movie.name,
        Validators.compose([Validators.minLength(1), Validators.required]),
      ],
      description: [
        this.movie.description,
        Validators.compose([Validators.minLength(10), Validators.required]),
      ],
      category: [
        this.movie.category,
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      year: [
        this.movie.year,
        Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.required]),
      ]
    });
  }


  public async editMovie() {
    if (this.ionicForm.valid) {
      const movieUpdate: Movie = { ...this.movie, ...this.ionicForm.value };
      const loading = await this.helperService.showLoading('Actualizando');
      loading.present();
      this.movieService.updateMovie(movieUpdate.id, movieUpdate).then(() => {
        this.movie = movieUpdate;
        this.events.publishEvent('updateMovie');
        loading.dismiss();
      });
    } else {
      this.showError();
    }
  }

  private async showError() {
    const toast = await this.helperService.showToast({
      header: 'Error',
      message: 'Algunos datos no son correctos',
      type: 'error'
    });
    toast.present();
  }

}
