import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    CommonModule,
    ErrorDialogComponent,
    CoursesListComponent,
    MatDialogModule
  ],
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
      this.refresh();
  }

  ngOnInit(): void { }


  onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }
  

  openDialog(message: string){
    this.dialog.open(ErrorDialogComponent, {
      data: message
    })
  }

  refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError(error.message);
        return of([])
      })
    )
  }


}

