import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../Dashboards/Admin/dashboard/dashboard.component'
import { UserProfileComponent } from '../../Dashboards/Admin/user-profile/user-profile.component';
import { TableListComponent } from '../../Dashboards/Admin/table-list/table-list.component';
import { TypographyComponent } from '../../Dashboards/Admin/typography/typography.component';
import { IconsComponent } from '../../Dashboards/Admin/icons/icons.component';
import { MapsComponent } from '../../Dashboards/Admin/maps/maps.component';
import { NotificationsComponent } from '../../Dashboards/Admin/notifications/notifications.component';
import { UpgradeComponent } from '../../Dashboards/Admin/upgrade/upgrade.component';
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
