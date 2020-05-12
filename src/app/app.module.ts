import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './Main-Shared-Components/components.module'
import { environment } from '../../src/environments/environment.prod';
import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './Layouts/Admin/admin-layout.component';
import { MainComponent } from './Layouts/Main/main.component';
import { OrderComponent } from './Modules/Admin/order/order.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
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
    OrderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
