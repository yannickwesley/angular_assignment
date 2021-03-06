import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Connection } from '../Connection.model';

@Component({
  selector: 'app-login-assignment',
  templateUrl: './login-assignment.component.html',
  styleUrls: ['./login-assignment.component.css']
})
export class LoginAssignmentComponent implements OnInit {
  userName = '';
  motDePasse = '';
  id = '';
  show = 'false';

  connecte = false;

  Connection:Connection[]

  constructor(   private routes: Router,
    private authService: AuthService,
    private assignment: AssignmentsService,
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id");
    this.userName = localStorage.getItem("login");
    this.motDePasse = localStorage.getItem("password");

    localStorage.setItem("login", this.userName);
    localStorage.setItem("password", this.motDePasse);
    this.getConnection();
  }
  getConnection() {
    this.assignment.getConnexions().subscribe(Connection => {this.Connection = Connection,
      // console.log('juste un test click');

      Connection.forEach(a => {

        console.log('password'+a.email);
        if (a.email == this.userName && a.password == this.motDePasse) {
          this.authService.logIn();
            localStorage.setItem("login",this.userName)
            localStorage.setItem("password",this.motDePasse)
          console.log('juste un test click');

          //this.routes.navigate(['/assignment', this.id , 'edit']);
        }
        else
        {
          console.log('c est faux');
        }



      });

    })
  }
  deconnecter() {

    this.authService.logOut();
    this.connecte = false;
  }
  login() {
    /*if (!this.authService.loggedIn) {
    this.authService.logIn(this.userName,this.motDePasse);
      this.connecte = this.authService.loggedIn;


    }

    if (!this.connecte) {
      //le login et password pas bon
      //message mauvais login et passsword
      this.message = 'mauvais login && password, recommencer';
      //
      this.userName = '';
      this.motDePasse = '';
    } else {
      // c'est bon
      this.message = 'connecte';
      this.router.navigate(['/home']);
    }*/
    this.assignment.getConnexions().subscribe(Connection => {this.Connection = Connection,
      // console.log('juste un test click');

      Connection.forEach(a => {

        console.log('password'+a.email);
        if (a.email == this.userName && a.password == this.motDePasse) {
          this.authService.logIn();

          console.log('juste un test click');
       this.routes.navigate(['/home']);
        }
        else
        {
          console.log('c est faux');
        }



      });

    })

  }

}
