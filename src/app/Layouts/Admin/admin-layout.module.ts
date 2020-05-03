import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../Modules/Admin/dashboard/dashboard.component'
import { UserProfileComponent } from '../../Modules/Admin/user-profile/user-profile.component';
import { TableListComponent } from '../../Modules/Admin/table-list/table-list.component';
import { TypographyComponent } from '../../Modules/Admin/typography/typography.component';
import { IconsComponent } from '../../Modules/Admin/icons/icons.component';
import { MapsComponent } from '../../Modules/Admin/maps/maps.component';
import { NotificationsComponent } from '../../Modules/Admin/notifications/notifications.component';
import { UpgradeComponent } from '../../Modules/Admin/upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

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
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
