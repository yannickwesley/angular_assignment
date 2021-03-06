"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.StatistiquesComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
//armchart imports
var am4core = require("@amcharts/amcharts4/core");
var am4charts = require("@amcharts/amcharts4/charts");
var animated_1 = require("@amcharts/amcharts4/themes/animated");
var stat_model_1 = require("src/app/shared/stat.model");
var StatistiquesComponent = /** @class */ (function () {
    function StatistiquesComponent(platformId, zone, assignmentService) {
        this.platformId = platformId;
        this.zone = zone;
        this.assignmentService = assignmentService;
        this.donnees = [];
        this.cpt = [];
        this.matieres = ['oracle', 'De Base de données à Big Data', 'Techno Web', 'Analyse', 'Grails'];
    }
    StatistiquesComponent.prototype.ngOnInit = function () {
        this.getStatAssignments();
    };
    StatistiquesComponent.prototype.browserOnly = function (f) {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(function () {
                f();
            });
        }
    };
    StatistiquesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Chart code goes in here
        this.browserOnly(function () {
            am4core.useTheme(animated_1["default"]);
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
            chart.paddingRight = 40;
            chart.data = chart.data = [{
                    "name": _this.donnees[0].name,
                    "steps": _this.donnees[0].steps,
                    "href": _this.donnees[0].href
                }, {
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
            console.log('test', _this.donnees[0].name);
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.grid.template.strokeOpacity = 0;
            categoryAxis.renderer.minGridDistance = 10;
            categoryAxis.renderer.labels.template.dx = -40;
            categoryAxis.renderer.minWidth = 120;
            categoryAxis.renderer.tooltip.dx = -40;
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.inside = true;
            valueAxis.renderer.labels.template.fillOpacity = 0.3;
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.min = 0;
            valueAxis.cursorTooltipEnabled = false;
            valueAxis.renderer.baseGrid.strokeOpacity = 0;
            valueAxis.renderer.labels.template.dy = 20;
            var series = chart.series.push(new am4charts.ColumnSeries);
            series.dataFields.valueX = "steps";
            series.dataFields.categoryY = "name";
            series.tooltipText = "{valueX.value}";
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.dy = -30;
            series.columnsContainer.zIndex = 100;
            var columnTemplate = series.columns.template;
            columnTemplate.height = am4core.percent(50);
            columnTemplate.maxHeight = 50;
            columnTemplate.column.cornerRadius(60, 10, 60, 10);
            columnTemplate.strokeOpacity = 0;
            series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
            series.mainContainer.mask = undefined;
            var cursor = new am4charts.XYCursor();
            chart.cursor = cursor;
            cursor.lineX.disabled = true;
            cursor.lineY.disabled = true;
            cursor.behavior = "none";
            var bullet = columnTemplate.createChild(am4charts.CircleBullet);
            bullet.circle.radius = 30;
            bullet.valign = "middle";
            bullet.align = "left";
            bullet.isMeasured = true;
            bullet.interactionsEnabled = false;
            bullet.horizontalCenter = "right";
            bullet.interactionsEnabled = false;
            var hoverState = bullet.states.create("hover");
            var outlineCircle = bullet.createChild(am4core.Circle);
            /*outlineCircle.adapter.add("radius", function (radius, target) {
                let circleBullet = target.parent;
                return circleBullet.circle.pixelRadius + 10;
            })*/
            var image = bullet.createChild(am4core.Image);
            image.width = 40;
            image.height = 60;
            image.horizontalCenter = "middle";
            image.verticalCenter = "middle";
            image.propertyFields.href = "href";
            /*image.adapter.add("mask", function (mask, target) {
                let circleBullet = target.parent;
                return circleBullet.circle;
            })*/
            var previousBullet;
            chart.cursor.events.on("cursorpositionchanged", function (event) {
                var dataItem = series.tooltipDataItem;
                /* if (dataItem.column) {
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
                 }*/
            });
        });
    };
    StatistiquesComponent.prototype.getStatAssignments = function () {
        var _this = this;
        var _loop_1 = function (index) {
            this_1.assignmentService.getAssignments().subscribe(function (assignments) {
                //(this.assignments = assignments),
                var i = 0;
                var newstat = new stat_model_1.MesStats();
                assignments.forEach(function (a) {
                    if (a.rendu == true) {
                        if (a.matiere == _this.matieres[index]) {
                            i += Number(a.note);
                            newstat.href = a.imageMat;
                        }
                    }
                });
                _this.cpt[index] = i;
                newstat.name = _this.matieres[index];
                newstat.steps = i;
                _this.donnees.push(newstat);
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.matieres.length; index++) {
            _loop_1(index);
        }
        /* console.log(this.cpt);
         console.log(this.matieres);*/
        console.log(this.donnees);
    };
    StatistiquesComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        // Clean up chart when the component is removed
        this.browserOnly(function () {
            if (_this.chart) {
                _this.chart.dispose();
            }
        });
    };
    StatistiquesComponent = __decorate([
        core_1.Component({
            selector: 'app-statistiques',
            templateUrl: './statistiques.component.html',
            styleUrls: ['./statistiques.component.css']
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID))
    ], StatistiquesComponent);
    return StatistiquesComponent;
}());
exports.StatistiquesComponent = StatistiquesComponent;
