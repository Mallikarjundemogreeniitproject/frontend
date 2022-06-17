import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Post } from './post';
   
@Injectable({
  providedIn: 'root'
})
export class PostService {
   
  private apiURL =  "http://localhost:8000/api";
   
  httpOptions = {
    headers: new HttpHeaders(
      /*
      {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : '*',
      'X-Requested-With': 'XMLHttpRequest'
    }
    */)
  }

  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL+'/orders/',  this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(post: any): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/orders/', post)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id: string | number): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/orders/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id: string | number, post: any): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + '/orders/' + id, post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id: string | number){
    return this.httpClient.delete<Post>(this.apiURL + '/orders/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}