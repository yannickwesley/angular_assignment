import {  Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import {AssignmentsService} from '../shared/assignments.service'
import {PageEvent} from '@angular/material/paginator'

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
  load = true;

  assignments = [];
  pageslice = [];
  length = this.assignments.length;

  pageSize = 12;
  pageSizeOptions: number[] = [3, 6, 9, 12];
  constructor(
    private assignmentService: AssignmentsService
  ) {

  }

  ngOnInit(): void {
    this.getAssignments();
    this.getSliceAssignments()
    //this.pageslice=this.assignments.slice(0,3)


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
   // this.formVisible = true;
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
    this.assignmentService.getAssignments().subscribe((assignments) => {
      //(this.assignments = assignments),
      assignments.forEach(a => {
        if (a.rendu == true) {
          this.assignments.push(a)
        }
      });
      });
  }
  getSliceAssignments() {
    this.assignmentService.getAssignments().subscribe((assignments) => {
      //(this.pageslice = assignments.slice(0, 3))
      console.log(),
    assignments.forEach(a => {
      if (a.rendu == true) {
        this.pageslice.push(a)
      }
    });
      this.pageslice = this.pageslice.slice(0, 12)
      this.load =false;
    });
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;

  }
  peuplerBase() {
    this.assignmentService.peuplerBase();
  }
  Onpagination(event:PageEvent) {
    const startIndex= event.pageIndex * event.pageSize;
    let endIndex=startIndex + event.pageSize;
    if (endIndex>this.assignments.length){
      endIndex=this.assignments.length
    }
    this.pageslice=this.assignments.slice(startIndex,endIndex);


  }


}
