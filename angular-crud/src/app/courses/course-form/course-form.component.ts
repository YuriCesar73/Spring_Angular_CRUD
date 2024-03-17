import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { error } from 'console';






@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: CoursesService, private snackbar: MatSnackBar){
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.form.value)
    this.service.save(this.form.value).subscribe(
      result => console.log(result), 
      error => this.onError());

  }

  onCancel(){
    
  }

  private onError(){
    this.snackbar.open("Erro ao salvar curso", '', {duration: 5000})
  }

}
