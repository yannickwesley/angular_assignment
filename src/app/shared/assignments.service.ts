import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs'
import {LoggingService} from './logging.service'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments :Assignment[] =[
    {
      id: 1,
      nom: 'TP Angular 1 à rendre !',
      dateDeRendu: new Date('2021/02/01'),
      rendu: true,

    },
    {
      id: 2,
      nom: 'Projet MOPOLO SQL',
      dateDeRendu: new Date('2021/02/15'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Lange R à finir',
      dateDeRendu: new Date('2021/02/20'),
      rendu: false,
    },
  ];
  url = "http://localhost:8010/api/assignments";
  constructor(private loggindService: LoggingService,
  private http:HttpClient) { }
  getAssignments(): Observable <Assignment[]>{
  //return of(this.assignments) ;
    return this.http.get<Assignment[]>(this.url);
  }
  addAssignment(assignment:Assignment):Observable <any>{
    //this.assignments.push(assignment);
   // this.loggindService.log(assignment.nomDevoir, 'a été ajouté');

   // return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url,assignment)
  }
  updateAssignment(assignment: Assignment): Observable <any> {
   /*  this.assignments.forEach((a,index) => {
      if (a===assignment) {
        this.assignments[index] = a;
      }
    });
    return of('Assignment mis a jour'); */
    return this.http.put<Assignment>(this.url,assignment)

  }
  deleteAssignment(assignment: Assignment): Observable<any> {
    /* this.assignments.forEach((a,index) => {
      if (a===assignment) {
        this.assignments.splice(index, 1);
      }
    });
    return of('Assignment supprimé'); */
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);


  }
  getAssignment(id): Observable<Assignment> {
   // return of(this.assignments.find(a => a.id === id));
    return this.http.get<Assignment>(this.url + "/" + id);

  }
}
