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
import { PasswordResetComponent } from './login-signup/password-reset/password-reset.component';
import { PasswordResetPageComponent } from './login-signup/password-reset-page/password-reset-page.component';
import { OrderTempDataResolver } from './Layouts/Admin/Dashboard-Components/Resolvers/order-data-temp.resolver';

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
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'password_reset_page',
    children: [
      {
        path: ':token',
        component: PasswordResetPageComponent
      }
    ]
  },
  {
    path: 'payment',
    children: [
      {
        path: ':id',
        component: PaymentGatewayComponent,
        resolve: {
          order: OrderTempDataResolver
        }
      },
    ]
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
