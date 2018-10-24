import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpOptions = { headers: null };

  private apiUrl = 'https://localhost:5000'; // TODO: use environment variablse

  constructor(private http: HttpClient,
    private storage: Storage) {
    this.refreshHeaders();
  }

  refreshHeaders() {
    this.storage.get('jwt').then(token => {
      this.httpOptions.headers = new HttpHeaders(
        token == null ?
          { 'Content-Type': 'application/json' } :
          {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
      );
    });
  }

  get(endpoint) {
    this.refreshHeaders();
    return this.http.get(this.apiUrl + endpoint, this.httpOptions);
  }

  post(endpoint, data) {
    this.refreshHeaders();
    return this.http.post(this.apiUrl + endpoint, data, this.httpOptions);
  }

  put(endpoint, data) {
    this.refreshHeaders();
    return this.http.put(this.apiUrl + endpoint, data, this.httpOptions);
  }

  delete(endpoint) {
    this.refreshHeaders();
    return this.http.delete(this.apiUrl + endpoint, this.httpOptions);
  }

}
