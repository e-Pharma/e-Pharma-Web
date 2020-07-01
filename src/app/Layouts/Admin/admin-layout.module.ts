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
import {MatExpansionModule} from '@angular/material/expansion';
import { AddressBookComponent } from './Dashboard-Components/address-book/address-book.component';
import { OrderHistoryComponent } from './Dashboard-Components/order-history/order-history.component';
import { ProfileComponent } from './Dashboard-Components/profile/profile.component';
import { FamilyComponent } from './Dashboard-Components/Family-member/family/family.component';
import { AddNewMemberComponent } from './Dashboard-Components/Family-member/add-new-member/add-new-member.component';
import { EditProfileComponent } from './Dashboard-Components/profile/edit-profile/edit-profile/edit-profile.component';

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
    MatExpansionModule
  ],
  declarations: [
    UserDashboardHomeComponent,
    AddressBookComponent,
    OrderHistoryComponent,
    ProfileComponent,
    FamilyComponent,
    AddNewMemberComponent,
    EditProfileComponent
  ],
  providers: [DatePipe]
})

export class AdminLayoutModule {}
