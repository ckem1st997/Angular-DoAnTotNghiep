import { WareHouseLimitComponent } from './pages/WareHouseLimit/WareHouseLimit.component';
import { WareHouseBookComponent } from './pages/WareHouseBook/WareHouseBook.component';
import { WareHouseBenginingComponent } from './pages/WareHouseBengining/WareHouseBengining.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WareHouseBenginingComponent,
    WareHouseBookComponent,
    WareHouseLimitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
