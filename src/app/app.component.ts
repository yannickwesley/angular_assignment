import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './shared/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = 'Apllication de Gestion des Devoirs';
  Rendu = true;
  NonRendu = false;
  stat = false;

  constructor(
    private routes: Router,
    private authService:AuthService
  ) { }



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
    this.routes.navigate(['statistic'])
  }

  }

