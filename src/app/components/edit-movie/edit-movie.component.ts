import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {

  movie: Movie;
  ionicForm: FormGroup;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.movie = this.navParams.data as Movie;
    console.log(this.movie);
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  updateMovieRate(){

  }

  editMovie(){

  }

}
