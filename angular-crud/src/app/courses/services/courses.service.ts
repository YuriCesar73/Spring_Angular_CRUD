import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../model/course';
import { Observable, delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  private readonly API = '/assets/courses.json'

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


  save(record: Course){
    console.log("Cheguei no service com o valor: " + record)
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}
