import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Observable } from 'rxjs';






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
    MatSnackBarModule,
  ],
  providers: [],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private service: CoursesService, 
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){
    this.form = this.formBuilder.group({
      _id: new FormControl<string | null>(''),
      name: new FormControl<string | null>('', Validators.required,),
      category: new FormControl<string | null>('', {nonNullable: true})
    });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'] 
    this.form.setValue({
      name: course.name,
      category: course.category,
      _id: course._id,
    })
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(
      result => this.onSuccess(), 
      error => this.onError());

  } 

  onCancel(){
    this.location.back();
    
  }

  private onSuccess(){
    this.snackbar.open('Curso salvo.', '', {duration: 5000})
    this.onCancel();
  }

  private onError(){
    this.snackbar.open("Erro ao salvar curso", '', {duration: 5000})
  }
 
}
