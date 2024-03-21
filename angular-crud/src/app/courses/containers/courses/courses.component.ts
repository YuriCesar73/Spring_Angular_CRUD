import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
// import { CategoryPipe } from '../../shared/pipes/category.pipe';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';







@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    // MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CommonModule,
    ErrorDialogComponent,
    // MatIconModule,
    // CategoryPipe, 
    // MatButtonModule,
    CoursesListComponent,
    MatDialogModule
  ],
  // providers: [
  //   CoursesService,
  //   Router 
  // ], NÃO PRECISA UTILIZAR
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
}) 
export class CoursesComponent implements OnInit {

  courses$!: Observable<Course[]>;
  

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
      this.refres();
  }

  ngOnInit(): void { }


  onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      //width: '250px',
      data: errorMessage
    });
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(course: Course){
    this.router.navigate(['edit/', course._id], {relativeTo: this.route})
  }

  onRemove(course: Course){
    //const dialogRef = this.dialog.open(ConfirmDialog)
    console.log(course._id)
    this.coursesService.remove(course._id).subscribe(() => {
      this.refres();
      this.snackBar.open('Curso removido com sucesso!', 'X', {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    },
      () => this.onError('Erro ao tentar remover curso')
    );
  }


  openDialog(message: string){
    this.dialog.open(ErrorDialogComponent, {
      data: message
    })
  }

  refres(){
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError(error.message);
        return of([])
      })
    )
  }


}

