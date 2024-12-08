import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, data);
  }

  updateData(id: string | number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, data);
  }

  deleteData(id: string | number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

}