import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routes: Router,
    private authService:AuthService,
    private assignmentsService:AssignmentsService) { }
    titre = 'Application de Gestion des Devoirs';
    Rendu = true;
    NonRendu = false;
    stat = false;
    show:Number;
    mon=true;
    tap=0;
  ngOnInit(): void {
  }
  DevoirRendu() {
    this.Rendu = true;
    this.NonRendu = false;
    this.stat = false;
    this.routes.navigate(['/home']);

  }
  DevoirNonRendu() {
    this.Rendu = false;
    this.NonRendu = true;
    this.stat = false;

    this.routes.navigate(['/noreturn']);

  }
  Statistique() {
    this.Rendu = false;
    this.NonRendu = false;
    this.stat = true;
    this.routes.navigate(['/statistic']);
  }

  deco()
  {localStorage.setItem("id","")
  console.log("aaaaaaa")
  localStorage.setItem("txt","")
  localStorage.setItem("txt",this.tap.toString())
  console.log( localStorage.setItem("txt",this.tap.toString()))
  localStorage.setItem("login","")
  localStorage.setItem("password","")
  this.authService.logOut()
  this.routes.navigate(['/login']);


  }

}
