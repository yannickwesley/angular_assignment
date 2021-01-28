import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment;
  // formulaire
  nomassignment: String;
  dateDeRendu: Date;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignment();

  }
  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT EDIT ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment): void => {
      //console.log(assignment);
      this.assignment = assignment;
      if (assignment) {
        this.nomassignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
      }
    });
  }

  onSaveAssignment() {
    if (this.nomassignment) {
      this.assignment.nom = this.nomassignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // on navigue vers la page d'accueil
        this.router.navigate(['/home']);
      });
  }

}
