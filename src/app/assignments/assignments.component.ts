import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import {AssignmentsService} from '../shared/assignments.service'


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  nomDevoir = "";
  dateDeRendu = null;
  assignementSelectionne: Assignment;
  formVisible = false;

  assignments = [];

  constructor(
    private assignmentService: AssignmentsService
  ) {

  }

  ngOnInit(): void {
    this.getAssignments()
  }
  onSubmit() {
    let newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    this.assignments.push(newAssignment);
  }
  assignmentClique(assignment: Assignment) {
    console.log(assignment)
    this.assignementSelectionne = assignment;
  }
  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }
  // onNouvelAssignment(event: Assignment) {
  //   this.assignmentService.addAssignment(event).subscribe(message => console.log(message));
  //   this.formVisible = false;
  // }
  onSupprAssignment(Monevent: Assignment) {
    this.assignments= this.assignments.filter(item => item !== Monevent )
    Monevent = null;
  }
  getAssignments() {
    this.assignmentService.getAssignments().subscribe(assignments => this.assignments = assignments);

  }


}
