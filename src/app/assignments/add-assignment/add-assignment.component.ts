import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir = "";
  dateDeRendu = null;
 // @Output() nouvelAssignment = new EventEmitter<Assignment>();


  constructor(private assignmentService: AssignmentsService,
  private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentService.addAssignment(newAssignment).subscribe(message => console.log(message))
    this.router.navigate(['/home']);

  }

}
