import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from '../../Main/customer-home/customer-home.component';
import { CustomerAboutUsComponent } from '../../Main/customer-about-us/customer-about-us.component';
import { CustomerContactComponent } from '../../Main/customer-contact/customer-contact.component';
import { CustomerMainRoutes } from './main-components.routing';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerAboutUsComponent,
    CustomerContactComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule.forChild(CustomerMainRoutes),
  ],
  exports: [
    CustomerAboutUsComponent,
    CustomerContactComponent,
    CustomerHomeComponent,
  ]
})
export class MainComponentsModule { }
