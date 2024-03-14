import { Component } from '@angular/core';

import { Course } from '../model/course';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';




@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses: Course[] = [
    {_id: '1', name: 'Angular', category: 'front-end'}
  ];
  displayedColumns = ['name', 'category']

}
