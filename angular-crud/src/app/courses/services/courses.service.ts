import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { Observable, delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  private readonly API = 'http://localhost:8080/api/courses'
  // private readonly API = "/assets/courses.json"

  constructor(private httpClient: HttpClient) { 

  }

  list(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      //take(1), operadores do módulo rxjs
      first(),
      delay(3000),
      tap(courses => console.log(courses))
    );
  }


  save(record: Partial<Course>){
    if(record._id){
      return this.update(record);  
    }
    return this.create(record);  
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    let endpoint = this.API + "/" + record._id;
    return this.httpClient.put<Course>(endpoint, record).pipe(first());

  }

  findById(id: string){
    let endpoint = this.API + "/" + id;
    return this.httpClient.get<Course>(endpoint).pipe(first());
  } 

  remove(id: string){
    let endpoint = this.API + "/" + id;
    console.log("Valor do id: " + id)
    console.log(endpoint);
    this.httpClient.delete<Course>(endpoint).pipe(first(), tap(response => console.log(response)));
  }


}
 