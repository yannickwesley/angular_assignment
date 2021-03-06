import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


import { MesStats } from 'src/app/shared/stat.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {


  donnees: MesStats[] = [];
  finaldata: MesStats[] = [];
  cpt: number[] = [];
  nbrOracle = 0;
  nbrBd = 0;
  nbreTw = 0;
  nbreAnalyse = 0;
  nbreGrails = 0;
  assignments: Assignment[] = [];
  load = true;

  matieres: String[] = ['oracle', 'De Base de données à Big Data', 'Techno Web', 'Analyse', 'Grails'];
    constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
    //this.getAssignments();
    this.getStatAssignments();

  }

  getStatAssignments() {
    for (let index = 0; index < this.matieres.length; index++) {

      this.assignmentService.getAssignments().subscribe((assignments) => {
        this.load = true;

          let i = 0;
          let nbreRendu = 0;
          let nbreNonRendu = 0;
          var newstat = new MesStats();
          assignments.forEach(a => {
            if (a.rendu == true) {
              if (a.matiere == this.matieres[index]) {
                nbreRendu+=1

                if (Number(a.note) >= 10) {
                  i += 1;
                  newstat.imagemat = a.imageMat;
                }


              }
            }
            else {
              if (a.matiere == this.matieres[index]) {
                nbreNonRendu += 1;
              }

            }
          });
          this.cpt.push(i);

          newstat.matiere = this.matieres[index];
          newstat.nbreRenduParMat = nbreRendu;
          newstat.nbreNonRenduParMat = nbreNonRendu;
          newstat.nbreNoMoyenneParMat = nbreRendu - i;
          newstat.nbreMoyenneParMat = i;
          this.donnees.push(newstat);
          this.load = false;





          });

    }







  }


}
