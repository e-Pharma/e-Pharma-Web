import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './Layouts/Admin/admin-layout.component'
import { MainComponent } from './Layouts/Main/main.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { AuthGuardService } from './Services/Auth-Guard/auth-guard.service';
import { SidebarComponent } from './Admin-Shared-Components/sidebar/sidebar.component';
import { VerifyEmailComponent } from './Main/verify-email/verify-email.component';
import { PaymentGatewayComponent } from './Layouts/Admin/Dashboard-Components/payment-gateway/payment-gateway.component';

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
    path: 'payment',
    component: PaymentGatewayComponent
  },
  { path: 'verify_email', 
    children: [
      {
          path: ':token',
          component: VerifyEmailComponent,
      }
    ] 
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
    canActivate: [AuthGuardService],
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
