import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { API_MOVIE_URL } from '../config/const';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.firestore.collection('movies').snapshotChanges();
  }

  getMovie(id: string): Observable<any> {
    return this.firestore.collection('movies').doc(id).valueChanges();
  }

  updateMovie(id: string, movie: Movie): Promise<void> {
    return this.firestore.collection('movies').doc(id).update(movie);
  }

  deleteMovie(id: string): Promise<void> {
    return this.firestore.collection('movies').doc(id).delete();
  }

  getDiscoverMovies(): Observable<any> {
    return this.http.get(API_MOVIE_URL);
  }
}
