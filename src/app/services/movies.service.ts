import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private firestore: AngularFirestore) {}

  getMovies(){
    return this.firestore.collection('movies').snapshotChanges();
  }

  updateMovie(id: string, movie: Movie) {
    this.firestore.collection('movies').doc(id).update(movie)
      .then((res) => {
        console.log(res);
      }).catch(error => console.log(error));;
  }

  deleteMovie(id: string) {
    return this.firestore.collection('movies').doc(id).delete();
  }
}