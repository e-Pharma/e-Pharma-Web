import { Routes } from '@angular/router';
import { UserDashboardHomeComponent } from './Dashboard-Components/user-dashboard-home/user-dashboard-home.component';
import { FamilyComponent } from './Dashboard-Components/Family-member/family/family.component';
import { OrderHistoryComponent } from './Dashboard-Components/order-history/order-history.component';
import { ProfileComponent } from './Dashboard-Components/profile/profile.component';
import { AddressBookComponent } from './Dashboard-Components/address-book/address-book.component';
import { UserDataResolver } from './Dashboard-Components/Resolvers/user-data.resolver';
import { PlaceOrderComponent } from './Dashboard-Components/place-order/place-order.component';
import { OrderTempDataResolver } from './Dashboard-Components/Resolvers/order-data-temp.resolver';
import { PaymentGatewayComponent } from './Dashboard-Components/payment-gateway/payment-gateway.component';
import { NotificationsComponent } from './Dashboard-Components/notifications/notifications.component';
import { OrdersResolver } from './Dashboard-Components/Resolvers/orders.resolver';
import { NotificationsResolver } from './Dashboard-Components/Resolvers/notifications.resolver';
import { OrderTrackerComponent } from './Dashboard-Components/order-tracker/order-tracker.component'

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard-home',
        component: UserDashboardHomeComponent,
        resolve: {
            userData: UserDataResolver
        }
    },
    {
        path: 'view-order',
        children: [
            {
                path: ':id',
                component: PlaceOrderComponent,
                resolve: {
                    order: OrderTempDataResolver
                }
            }
        ]
    },
    {
        path: 'family',
        component: FamilyComponent
    },
    {
        path: 'history',
        component: OrderHistoryComponent,
        resolve: {
            orders: OrdersResolver
        }
    },
    {
        path: 'profile/:id',
        component: ProfileComponent
        // children:[
        //     {
        //         path:':id',
        //         component: ProfileComponent,
        //         resolve: {
        //             userData: UserDataResolver
        //         }
        //     }
        // ]
       
    },
    {
        path: 'address-book/:id',
        component: AddressBookComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent,
        resolve: {
            notifications: NotificationsResolver
        }
    },
    {
        path: 'track',
        component: OrderTrackerComponent,
       
    }
];
