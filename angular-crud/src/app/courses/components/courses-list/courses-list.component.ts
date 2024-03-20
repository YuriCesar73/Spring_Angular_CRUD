import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { ActivatedRoute, Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { CategoryPipe } from '../../../shared/pipes/category.pipe';



@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    MatTableModule, 
    MatIconModule, 
    CategoryPipe, 
    MatButtonModule
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {


  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions']

  constructor () { 

  }


  onAdd(){
    this.add.emit(true);
  }

  onEdit(course: Course){
    this.edit.emit(course);
  }

}
