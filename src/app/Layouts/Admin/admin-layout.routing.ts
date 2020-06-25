import { Routes } from '@angular/router';
import { UserDashboardHomeComponent } from './Dashboard-Components/user-dashboard-home/user-dashboard-home.component';
export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard-home',
        component: UserDashboardHomeComponent
    }

];
