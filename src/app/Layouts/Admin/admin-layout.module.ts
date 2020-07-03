import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { UserDashboardHomeComponent } from './Dashboard-Components/user-dashboard-home/user-dashboard-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule} from '@angular/material/radio'
import { MatDialogModule } from '@angular/material/dialog';
import { AddressBookComponent } from './Dashboard-Components/address-book/address-book.component';
import { OrderHistoryComponent } from './Dashboard-Components/order-history/order-history.component';
import { ProfileComponent } from './Dashboard-Components/profile/profile.component';
import { FamilyComponent } from './Dashboard-Components/Family-member/family/family.component';
import { AddNewMemberComponent } from './Dashboard-Components/Family-member/add-new-member/add-new-member.component';
import { MatDividerModule } from '@angular/material/divider'
import { UserDataResolver } from './Dashboard-Components/Resolvers/user-data.resolver';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PlaceOrderComponent } from './Dashboard-Components/place-order/place-order.component';
import { OrderTempDataResolver } from './Dashboard-Components/Resolvers/order-data-temp.resolver';
import { PaymentGatewayComponent } from './Dashboard-Components/payment-gateway/payment-gateway.component';
import { NotificationsComponent } from './Dashboard-Components/notifications/notifications.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrdersResolver } from './Dashboard-Components/Resolvers/orders.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  declarations: [
    UserDashboardHomeComponent,
    AddressBookComponent,
    OrderHistoryComponent,
    ProfileComponent,
    FamilyComponent,
    AddNewMemberComponent,
    PlaceOrderComponent,
    NotificationsComponent
  ],
  providers: [
    DatePipe,
    UserDataResolver,
    OrderTempDataResolver,
    OrdersResolver
  ]
})

export class AdminLayoutModule {}
