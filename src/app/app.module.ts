import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import {ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { CarouselModule, CardsModule } from 'angular-bootstrap-md'
import {} from '@angular/animations'



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginAssignmentComponent } from './assignments/login-assignment/login-assignment.component';
import { AssignmentNonRenduComponent } from './assignments/assignment-non-rendu/assignment-non-rendu.component';
import { StatistiquesComponent } from './assignments/statistiques/statistiques.component';

const routes: Routes = [
  { path: '', component: AssignmentsComponent },
  {path: 'login', component: LoginAssignmentComponent},
  { path: 'home', component: AssignmentsComponent },
  { path: 'noreturn', component: AssignmentNonRenduComponent },
  { path: 'statistic', component: StatistiquesComponent },


  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent  },

  { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate:[AuthGuard] },

];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginAssignmentComponent,
    AssignmentNonRenduComponent,
    StatistiquesComponent

  ],
  imports: [
    MatButtonModule,
    CarouselModule,
    MatStepperModule,
    CardsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    RouterModule.forRoot(routes)


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
