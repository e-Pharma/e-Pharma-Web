import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './Admin-Shared-Components/components.module'
import { environment } from '../../src/environments/environment.prod';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './Layouts/Admin/admin-layout.component';
import { MainComponent } from './Layouts/Main/main.component';
import { LoginSignupModule } from './login-signup/login-signup.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomSharedComponentsModule } from './custom-shared-components/custom-shared-components.module';
import { CustSidebarComponent } from './Dashboards/Customer/cust-sidebar/cust-sidebar.component';
import { OrderHistoryComponent } from './Dashboards/Customer/order-history/order-history.component';
import { ProfileComponent } from './Dashboards/Customer/profile/profile.component';
import { FamilyComponent } from './Dashboards/Customer/Family-member/family/family.component';
import { AddressBookComponent } from './Dashboards/Customer/address-book/address-book.component';
import { DashboardComponent } from './Dashboards/Customer/dashboard/dashboard.component';
import { from } from 'rxjs';
import { AddNewMemberComponent } from './Dashboards/Customer/Family-member/add-new-member/add-new-member.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoginSignupModule,
    MaterialModule,
    SharedModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    MatNativeDateModule,
    CustomSharedComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MainComponent,
    CustSidebarComponent,
    OrderHistoryComponent,
    ProfileComponent,
    FamilyComponent,
    AddressBookComponent,
    DashboardComponent,
    AddNewMemberComponent,
  ],
   providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
