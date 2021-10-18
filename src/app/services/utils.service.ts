import { Injectable } from '@angular/core';
import { PROPERTY_FAVORITES } from '../config/const';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getKeyLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  setKeyLocalStorage(key: string, val: any): void {
    localStorage.setItem(key, val);
  }

  clearLocalStorage(keys: Array<string>): void {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }

  isFavoriteMovie(name: string): boolean {
    const favorites = JSON.parse(this.getKeyLocalStorage(PROPERTY_FAVORITES));
    if (favorites) {
      return favorites.includes(name);
    } else {
      return false;
    }
  }

}
