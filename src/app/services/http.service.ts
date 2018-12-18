import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpOptions = { headers: null };

  // private apiUrl = 'https://localhost:5000'; // TODO: use environment variables
  private apiUrl = 'http://192.168.1.10:5000'; // TODO: use environment variables

  constructor(private http: HttpClient,
    private storage: Storage) {
  }

  refreshHeadersWithToken(token: any) {
    this.httpOptions.headers = new HttpHeaders(
      token == null ?
        { 'Content-Type': 'application/json' } :
        {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
    );
  }

  getApiToken(): Observable<Headers> {
    return Observable.fromPromise(this.storage.get('jwt'));
  }

  get(endpoint) {
    return this.getApiToken().flatMap(token => {
      this.refreshHeadersWithToken(token);
      return this.http.get(this.apiUrl + endpoint, this.httpOptions);
    });
  }

  post(endpoint, data) {
    return this.getApiToken().flatMap(token => {
      this.refreshHeadersWithToken(token);
      return this.http.post(this.apiUrl + endpoint, data, this.httpOptions);
    });
  }

  put(endpoint, data) {
    return this.getApiToken().flatMap(token => {
      this.refreshHeadersWithToken(token);
      return this.http.put(this.apiUrl + endpoint, data, this.httpOptions);
    });
  }

  delete(endpoint) {
    return this.getApiToken().flatMap(token => {
      this.refreshHeadersWithToken(token);
      return this.http.delete(this.apiUrl + endpoint, this.httpOptions);
    });
  }

}
