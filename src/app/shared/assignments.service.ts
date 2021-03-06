import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs'
import { filter } from 'rxjs/operators';
import {LoggingService} from './logging.service'
import { HttpClient } from '@angular/common/http';
import {bdInitialAssignment} from './data'
import { Connection } from '../assignments/Connection.model';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  connection: Connection[]=[]
  assignments :Assignment[] =[
    {
      id: 1,
      nom: 'TP Angular 1 à rendre !',
      dateDeRendu: new Date('2021/02/01'),
      rendu: true,
      nomEleve: 'Karim',
      matiere: 'Angular',
      note: 14

    },
    {
      id: 2,
      nom: 'Projet MOPOLO SQL',
      dateDeRendu: new Date('2021/02/15'),
      rendu: false,
      nomEleve: 'Karim',
      matiere: 'SQL',
      note:17

    },
    {
      id: 3,
      nom: 'Lange R à finir',
      dateDeRendu: new Date('2021/02/20'),
      rendu: false,
      nomEleve: 'Karim',
      matiere: 'R',
      note: 16
    },
  ];
  url = "https://angularassig.herokuapp.com/api/assignments";
  url2 = "https://angularassig.herokuapp.com/api/connections";
  constructor(private loggindService: LoggingService,
  private http:HttpClient) { }
  getAssignments(): Observable <Assignment[]>{
  //return of(this.assignments) ;
    return this.http.get<Assignment[]>(this.url);
  }
  addAssignment(assignment:Assignment):Observable <any>{
  //   this.assignments.push(assignment);
  //  this.loggindService.log(assignment.nom, 'a été ajouté');

  //   return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url,assignment)
  }
  updateAssignment(assignment: Assignment): Observable <any> {
/*     this.assignments.forEach((a,index) => {
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
   //return of(this.assignments.find(a => a.id === id));
    return this.http.get<Assignment>(this.url + "/" + id)

  }
  peuplerBase() {
    bdInitialAssignment.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.id = a.id;
      newAssignment.nom = a.nom;
      newAssignment.nomEleve = a.nomEleve;
      newAssignment.matiere = a.matiere;
      newAssignment.note = a.note
      if (a.note > 10) {
        newAssignment.remarques="Pas mal, continuez ainsi"
      }
      else {
        newAssignment.remarques="Mauvais travail"
      }
      if (a.nom=="Gabriel Mopolo") {
        newAssignment.imageMat = "assets/images/oracle.jpg";
        newAssignment.imageProf="assets/images/mopolo.jpg"
      }
      else if (a.nom=="Serge Miranda") {
        newAssignment.imageMat = "assets/images/db.png";
        newAssignment.imageProf="assets/images/BD.jpg"
      }
      else if (a.nom=="Buffa Michel") {
        newAssignment.imageMat = "assets/images/ang.jpg"
        newAssignment.imageProf = "assets/images/TC.jpg"
      }
      else if (a.nom=="Alisson Temin") {
        newAssignment.imageMat = "assets/images/r.png"
        newAssignment.imageProf = "assets/images/R.jpg"
      } else if (a.nom == "Gregory Galli") {
        newAssignment.imageMat = "assets/images/grails.jpeg"
        newAssignment.imageProf = "assets/images/G.jpg"
      }

      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = true;
      this.addAssignment(newAssignment).subscribe( reponse => {
        console.log(reponse);
      })
   })
  }
  getConnexions(): Observable<Connection[]>
  {
    console.log('Dans getConnexions dans le service...');
    //cette partie est sans la connexion a la BD mongo
    //return of (this.assignments);
    return this.http.get<Connection[]>(this.url2);

  }
}
