import { Routes } from '@angular/router';
import { UserDashboardHomeComponent } from './Dashboard-Components/user-dashboard-home/user-dashboard-home.component';
import { FamilyComponent } from './Dashboard-Components/Family-member/family/family.component';
import { OrderHistoryComponent } from './Dashboard-Components/order-history/order-history.component';
import { ProfileComponent } from './Dashboard-Components/profile/profile.component';
import { AddressBookComponent } from './Dashboard-Components/address-book/address-book.component';
export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard-home',
        component: UserDashboardHomeComponent
    },
    {
        path: 'family',
        component: FamilyComponent
    },
    {
        path: 'history',
        component: OrderHistoryComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'address-book',
        component: AddressBookComponent
    }

];
