import { Routes } from '@angular/router';
import { CustomerAboutUsComponent } from '../../Main/customer-about-us/customer-about-us.component'
import { CustomerHomeComponent } from '../../Main/customer-home/customer-home.component';
import { CustomerContactComponent } from '../../Main/customer-contact/customer-contact.component';

export const CustomerMainRoutes: Routes = [

    { path: 'home', component: CustomerHomeComponent },
    { path: 'about-us', component: CustomerAboutUsComponent },
    { path: 'contact', component: CustomerContactComponent },
];
