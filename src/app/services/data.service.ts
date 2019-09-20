import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;
  private dataUri = '/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';

  constructor(private http: HttpClient) { }

  public fetchData() {
    return this.http.get(this.apiUrl + this.dataUri);
  }
}
