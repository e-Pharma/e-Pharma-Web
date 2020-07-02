import { Routes } from '@angular/router';
import { UserDashboardHomeComponent } from './Dashboard-Components/user-dashboard-home/user-dashboard-home.component';
import { FamilyComponent } from './Dashboard-Components/Family-member/family/family.component';
import { OrderHistoryComponent } from './Dashboard-Components/order-history/order-history.component';
import { ProfileComponent } from './Dashboard-Components/profile/profile.component';
import { AddressBookComponent } from './Dashboard-Components/address-book/address-book.component';
import { UserDataResolver } from './Dashboard-Components/Resolvers/user-data.resolver';
import { PlaceOrderComponent } from './Dashboard-Components/place-order/place-order.component';
import { OrderTempDataResolver } from './Dashboard-Components/Resolvers/order-data-temp.resolver';
export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard-home',
        component: UserDashboardHomeComponent,
        resolve: {
            userData: UserDataResolver
        }
    },
    {
        path: 'place-order',
        component: PlaceOrderComponent,
        resolve: {
            orders: OrderTempDataResolver
        }
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
