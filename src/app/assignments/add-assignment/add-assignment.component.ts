import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service'
import { Router } from '@angular/router';
import { Food } from 'src/app/shared/top3.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddAssignmentComponent implements OnInit {
  nomE = "";
  remarques="";
bool = true;
  note = (-1);
  dateDeRendu : Date = null
   // @Output() nouvelAssignment = new EventEmitter<Assignment>();

  foods: Food[] = [
    {nomP:'Gabriel Mopolo',matiere:'oracle',img1:'assets/images/oracle.jpg',img2:'assets/images/mopolo.jpg'},
    {nomP:'Serge Miranda',matiere:'De Base de données à Big Data',img1:'assets/images/db.png',img2:'assets/images/BD.jpg'},
    {nomP:'Buffa Michel',matiere:'Techno Web',img1:'assets/images/ang.jpg',img2:'assets/images/TC.jpg'},
    {nomP:'Alisson Temin',matiere:'Analyse',img1:'assets/images/r.png',img2:'assets/images/R.jpg'},
    {nomP:'Gregory Galli',matiere:'Grails',img1:'assets/images/grails.jpeg',img2:'assets/images/G.jpg'},


  ];
  nomP =  this.foods[2].nomP;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;


  constructor(private assignmentService: AssignmentsService,
    private router:Router,private _formBuilder: FormBuilder) {

     }

  ngOnInit():void
  {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  onSubmit() {
    let newAssignment = new Assignment();
    // var d = new Date();
    //  this.date = new Date(d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear());
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.nom = this.nomP;
    if (this.note >-1) {
      newAssignment.rendu = true;

    }
    else
    {
      newAssignment.rendu = false;

    }
    newAssignment.nomEleve = this.nomE;

    for (let a of this.foods) {
      if (a.nomP == newAssignment.nom) {
        newAssignment.matiere = a.matiere;
        newAssignment.imageMat = a.img1;
        newAssignment.imageProf = a.img2;
        console.log(newAssignment.matiere,newAssignment.imageProf,newAssignment.imageMat);
        break;
      }
    }
    newAssignment.note =   this.note;
    newAssignment.remarques = this.remarques;

    console.log(newAssignment.id);
    console.log(this.nomP);
    console.log(this.nomE);
    console.log( newAssignment.dateDeRendu);
    console.log(newAssignment.note);
    console.log(newAssignment.remarques);

    console.log( newAssignment.rendu);

        console.log(newAssignment.matiere,newAssignment.imageProf,newAssignment.imageMat);


    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentService.addAssignment(newAssignment).subscribe(message => {console.log(message),   this.router.navigate(['/home']); })
    //console.log(this.nomP)
    this.nomP =  this.foods[2].nomP;

  }

}
