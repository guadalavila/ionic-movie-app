import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { API_MUSIC_URL, API_MOVIE_URL } from '../config/const';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  getMovies() {
    return this.firestore.collection('movies').snapshotChanges();
  }

  getMovie(id: string) {
    return this.firestore.collection('movies').doc(id).valueChanges();
  }

  updateMovie(id: string, movie: Movie) {
    return this.firestore.collection('movies').doc(id).update(movie);
  }

  deleteMovie(id: string) {
    return this.firestore.collection('movies').doc(id).delete();
  }

  getNewReleases(): Promise<any> {
    return fetch(API_MUSIC_URL).then((res) => res.json());
  }

  getDiscoverMovies(): Observable<any> {
    return this.http.get(API_MOVIE_URL);
  }
}
