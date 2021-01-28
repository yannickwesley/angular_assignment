import { Component, Input,EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service'
import { ActivatedRoute,Router } from '@angular/router'
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
 /*@Input()*/ assignmentTransmis: Assignment;

  @Output() AssignmentSuppr = new EventEmitter<Assignment>();


  constructor(private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
  private authService:AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }
  devoirRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);

        // on retourne à la page d'accueil
        this.router.navigate(['/home']);
      });
  }
  supprAssignment() {
    this.assignmentService
    .deleteAssignment(this.assignmentTransmis)
    .subscribe((message) => {
      console.log(message);
      this.assignmentTransmis = null;

      // on retourne à la page d'accueil
      this.router.navigate(['/home']);
    });

  }
  getAssignment() {
    const id = +this.route.snapshot.params.id;
    this.assignmentService.getAssignment(id).subscribe(assignment => this.assignmentTransmis = assignment);
  }
  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit']);
  }
  loggedIn() {
    return this.authService.loggedIn;
  }

}
