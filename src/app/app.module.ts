import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

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
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoginSignupModule,
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
    MainComponent
  ],
   providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
