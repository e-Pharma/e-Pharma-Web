import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule, MatOptionModule} from '@angular/material/core';
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
import {MatExpansionModule} from '@angular/material/expansion';
import { MatRadioModule} from '@angular/material/radio'
import { MatDialogModule } from '@angular/material/dialog';
import { AddressBookComponent } from './Dashboard-Components/address-book/address-book.component';
import { OrderHistoryComponent } from './Dashboard-Components/order-history/order-history.component';
import { ProfileComponent } from './Dashboard-Components/profile/profile.component';
import { FamilyComponent } from './Dashboard-Components/Family-member/family/family.component';
import { AddNewMemberComponent } from './Dashboard-Components/Family-member/add-new-member/add-new-member.component';
import { EditProfileComponent } from './Dashboard-Components/profile/edit-profile/edit-profile/edit-profile.component';
import { MatDividerModule } from '@angular/material/divider'
import { UserDataResolver } from './Dashboard-Components/Resolvers/user-data.resolver';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PlaceOrderComponent } from './Dashboard-Components/place-order/place-order.component';
import { OrderTempDataResolver } from './Dashboard-Components/Resolvers/order-data-temp.resolver';
import { PaymentGatewayComponent } from './Dashboard-Components/payment-gateway/payment-gateway.component';
import { NotificationsComponent } from './Dashboard-Components/notifications/notifications.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrdersResolver } from './Dashboard-Components/Resolvers/orders.resolver';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ResetEmailComponent } from './Dashboard-Components/profile/reset-email/reset-email.component';
import { ResetPasswordComponent } from './Dashboard-Components/profile/reset-password/reset-password.component';
import { NotificationsResolver } from './Dashboard-Components/Resolvers/notifications.resolver';
import { ViewMessageDialogComponent } from './Dashboard-Components/dialogs/view-message-dialog/view-message-dialog.component';
import { AgmCoreModule } from '@agm/core';
import { OrderTrackerComponent } from './Dashboard-Components/order-tracker/order-tracker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    AgmCoreModule,
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
    MatExpansionModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatOptionModule
  ],
  declarations: [
    UserDashboardHomeComponent,
    AddressBookComponent,
    OrderHistoryComponent,
    ProfileComponent,
    FamilyComponent,
    AddNewMemberComponent,
    EditProfileComponent,
    PlaceOrderComponent,
    NotificationsComponent,
    ResetEmailComponent,
    ResetPasswordComponent,
    ViewMessageDialogComponent,
    OrderTrackerComponent
  ],
  providers: [
    DatePipe,
    UserDataResolver,
    OrderTempDataResolver,
    OrdersResolver,
    NotificationsResolver
  ]
})

export class AdminLayoutModule {}
