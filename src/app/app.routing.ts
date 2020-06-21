import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './Layouts/Admin/admin-layout.component'
import { MainComponent } from './Layouts/Main/main.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import {CustSidebarComponent} from './Dashboards/Customer/cust-sidebar/cust-sidebar.component'

const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'sidebar',
    component: CustSidebarComponent
  },
  {
    path: '',
    component: MainComponent,
    children: [{
      path: '',
      loadChildren: './Layouts/Main/main-components.module#MainComponentsModule'
    }]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './Layouts/Admin/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
