import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//armchart imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
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
  private chart: am4charts.XYChart;
  possible = false;
  donnees: MesStats[] = [];
  finaldata: MesStats[] = [];
  cpt: number[] = [];
  nbrOracle = 0;
  nbrBd = 0;
  nbreTw = 0;
  nbreAnalyse = 0;
  nbreGrails = 0;
  assignments: Assignment[] = []
  object:Object={}

  matieres: String[] = ['oracle', 'De Base de données à Big Data', 'Techno Web', 'Analyse', 'Grails'];
    constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
    //this.getAssignments();
    this.getStatAssignments();

  }
  /*browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }*/
  ngAfterViewInit() {
    // Chart code goes in here

   /* this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.paddingRight = 40;
      //console.log(this.assignments[0]);


      if (this.possible == true) {
        JSON.stringify(this.donnees, null,2)
        console.log('test',  JSON.stringify(this.donnees, null,2))
        chart.data = this.donnees;

     }
      //console.log("donnee",this.donnees);

      /* [ {
        "name": "Joey",
        "steps": 35781,
        "href": "https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg"
    }, {
        "name": "Ross",
        "steps": 25464,
        "href": "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg"
    }, {
        "name": "Phoebe",
        "steps": 18788,
        "href": "https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg"
    }, {
        "name": "Rachel",
        "steps": 15465,
        "href": "https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg"
    }, {
        "name": "Chandler",
        "steps": 11561,
        "href": "https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg"
    }];



let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.labels.template.dx = -40;
categoryAxis.renderer.minWidth = 120;
categoryAxis.renderer.tooltip.dx = -40;

let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.fillOpacity = 0.3;
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;
valueAxis.renderer.baseGrid.strokeOpacity = 0;
valueAxis.renderer.labels.template.dy = 20;

let series = chart.series.push(new am4charts.ColumnSeries);
series.dataFields.valueX = "steps";
series.dataFields.categoryY = "name";
series.tooltipText = "{valueX.value}";
series.tooltip.pointerOrientation = "vertical";
series.tooltip.dy = - 30;
series.columnsContainer.zIndex = 100;

let columnTemplate = series.columns.template;
columnTemplate.height = am4core.percent(50);
columnTemplate.maxHeight = 50;
columnTemplate.column.cornerRadius(60, 10, 60, 10);
columnTemplate.strokeOpacity = 0;

series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
series.mainContainer.mask = undefined;

let cursor = new am4charts.XYCursor();
chart.cursor = cursor;
cursor.lineX.disabled = true;
      cursor.lineY.disabled = true;
cursor.behavior = "none";

let bullet = columnTemplate.createChild(am4charts.CircleBullet);
bullet.circle.radius = 30;
bullet.valign = "middle";
bullet.align = "left";
bullet.isMeasured = true;
bullet.interactionsEnabled = false;
bullet.horizontalCenter = "right";
bullet.interactionsEnabled = false;

      let hoverState = bullet.states.create("hover");
let outlineCircle = bullet.createChild(am4core.Circle);
outlineCircle.adapter.add("radius", function (radius, target) {
    let circleBullet = target.parent;
    return circleBullet.circle.pixelRadius + 10;
})

let image = bullet.createChild(am4core.Image);
      image.width = 40;
image.height = 60;
image.horizontalCenter = "middle";
image.verticalCenter = "middle";
      image.propertyFields.href = "href";

image.adapter.add("mask", function (mask, target) {
    let circleBullet = target.parent;
    return circleBullet.circle;
})

let previousBullet;
chart.cursor.events.on("cursorpositionchanged", function (event) {
    let dataItem = series.tooltipDataItem;

    if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);

        if (previousBullet && previousBullet != bullet) {
            previousBullet.isHover = false;
        }

        if (previousBullet != bullet) {

            let hs = bullet.states.getKey("hover");
            hs.properties.dx = dataItem.column.pixelWidth;
            bullet.isHover = true;

            previousBullet = bullet;
        }
    }
})


      })
*/

  }
  getStatAssignments() {
    for (let index = 0; index < this.matieres.length; index++) {

        this.assignmentService.getAssignments().subscribe((assignments) => {
          //(this.assignments = assignments),
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





          });
     // Object.assign(this.finaldata, this.donnees);
          //console.log(this.donnees)
    }
    this.possible=true


   // console.log("cptmat",this.cpt);
    /*console.log(this.matieres);*/



  }
 /* getAssignments() {
    this.assignmentService.getAssignments().subscribe((assignments) => {
      //(this.assignments = assignments),
      assignments.forEach(a => {
        if (a.rendu == true) {
          this.assignments.push(a)
        }
      });
      });
  }*/

 /* ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }*/


}
