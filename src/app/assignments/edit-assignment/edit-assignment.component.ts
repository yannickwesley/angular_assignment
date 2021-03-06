import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Food } from 'src/app/shared/top3.model';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment;
  // formulaire
  selected :String;
  nomE: String;
  nomP : String;
  note: Number;
  nomassignment: String;
  remarques: String;
  dateDeRendu: Date;
  rendu:boolean;
  matiere: String;
imageMat: String;
imageProf: String;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService,private _formBuilder: FormBuilder) { }
    isEditable = false;

  ngOnInit(): void {
    this.getAssignment();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  foods: Food[] = [
    {nomP:'Gabrile Mopolo',matiere:'oracle',img1:'assets/images/oracle.jpg',img2:'assets/images/mopolo.jpg'},
    {nomP:'Serge Miranda',matiere:'De Base de données au Big Data',img1:'assets/images/db.png',img2:'assets/images/BD.jpg'},
    {nomP:'Buffa Michel',matiere:'Technologies Web',img1:'assets/images/ang.png',img2:'assets/images/TC.jpg'},
    {nomP:'Alisson Temin',matiere:'Analyse',img1:'assets/images/r.png',img2:'assets/images/R.jpg'},
    {nomP:'Gregory Galli',matiere:'Grails',img1:'assets/images/grails.jpeg',img2:'assets/images/G.jpg'},


  ];
  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT EDIT ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment): void => {
      //console.log(assignment);
      this.assignment = assignment;
      console.log(  this.assignment)
      if (assignment) {
        this.nomE = assignment.nomEleve;
        this.nomP = assignment.nom;

        this.dateDeRendu = assignment.dateDeRendu;
        if (this.note >-1) {
          this.rendu = true;
console.log(this.note)
        }
        else
        {
          this.rendu = false;

        }

        for (let a of this.foods) {
          if (a.nomP ==  this.nomP) {
          this.matiere = a.matiere;
          this.selected = a.nomP;
          this.imageMat = a.img1;
          this.imageProf = a.img2;
            // console.log(newAssignment.matiere,newAssignment.imageProf,newAssignment.imageMat);
            break;
          }
        }
        this.note = assignment.note;

        this.remarques = assignment.remarques;
        console.log(assignment.id);
        console.log(this.nomP);
        console.log(this.nomE);
        console.log( assignment.dateDeRendu);
        console.log(assignment.note);
        console.log(assignment.remarques);

        console.log( assignment.rendu);
      }
    });
  }

  onSaveAssignment() {


    for (let a of this.foods) {
      if (a.nomP ==  this.nomP) {
      this.matiere = a.matiere;
      this.selected = a.nomP;
      this.imageMat = a.img1;
      this.imageProf = a.img2;
        // console.log(newAssignment.matiere,newAssignment.imageProf,newAssignment.imageMat);
        break;
      }
    }
    if (this.nomP) {
      this.assignment.nom = this.nomP;
    }
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if (this.rendu) {
      this.assignment.rendu = this.rendu;
    }









    if (this.nomE) {
      this.assignment.nomEleve = this.nomE;
    }
    if (this.matiere) {
      this.assignment.matiere = this.matiere;
    }
    if (this.imageMat) {
      this.assignment.imageMat = this.imageMat;
    }
    if (this.imageProf) {
      this.assignment.imageProf = this.imageProf;
    }
    if (this.note) {
      this.assignment.note = this.note;
    }
    if (this.remarques) {
      this.assignment.remarques = this.remarques;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        console.log(this.assignment);

        // on navigue vers la page d'accueil
        this.router.navigate(['/home']);
      });
  }

}
