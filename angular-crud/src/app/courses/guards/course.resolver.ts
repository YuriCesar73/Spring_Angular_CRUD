import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Observable<Course>> = (route, state) => {


  const service = inject(CoursesService);


  if(route.params && route.params['id']){
    console.log("Cheguei no if")
    return service.findById(route.params['id']);
  }
  console.log("Cheguei fora do if")
  return of({ _id: '', name: '', category: ''});
 
};
