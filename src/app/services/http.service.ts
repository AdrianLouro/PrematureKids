import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl = 'http://localhost:8000/premature-kids/'; // TODO: use environment variablse

  constructor(private http: HttpClient) { }

  get(endpoint) {
    return this.http.get(this.apiUrl + endpoint, this.httpOptions);
  }

  post(endpoint, data) {
    return this.http.post(this.apiUrl + endpoint, data, this.httpOptions);
  }

  put(endpoint, data) {
    return this.http.put(this.apiUrl + endpoint, data, this.httpOptions);
  }

  delete(endpoint, data) {
    return this.http.delete(this.apiUrl + endpoint, this.httpOptions);
  }


}
