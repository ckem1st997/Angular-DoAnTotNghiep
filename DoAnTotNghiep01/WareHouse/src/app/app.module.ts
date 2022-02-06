import { HomeComponent } from './pages/home/home.component';
import { WareHouseLimitComponent } from './pages/WareHouseLimit/WareHouseLimit.component';
import { WareHouseBookComponent } from './pages/WareHouseBook/WareHouseBook.component';
import { WareHouseBenginingComponent } from './pages/WareHouseBengining/WareHouseBengining.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AngularSplitModule } from 'angular-split';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
import { VendorService } from './service/VendorService.service';
import { VendorComponent } from './pages/Vendor/Vendor.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { VendorEditComponent } from './method/edit/VendorEdit/VendorEdit.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { VendorDetailsComponent } from './method/details/VendorDetails/VendorDetails.component';
import { VendorCreateComponent } from './method/create/VendorCreate/VendorCreate.component';
import { VendorDeleteComponent } from './method/delete/VendorDelete/VendorDelete.component';
import { FormsearchComponent } from './method/search/formsearch/formsearch.component';
import { WareHouseComponent } from './pages/WareHouse/WareHouse.component';
import { WareHouseCreateComponent } from './method/create/WareHouseCreate/WareHouseCreate.component';
import { WareHouseEditComponent } from './method/edit/WareHouseEdit/WareHouseEdit.component';
import { WareHouseDetailsComponent } from './method/details/WareHouseDetails/WareHouseDetails.component';
import { WareHouseDeleteComponent } from './method/delete/WareHouseDelete/WareHouseDelete.component';
import { FormSearchWareHouseComponent } from './method/search/FormSearchWareHouse/FormSearchWareHouse.component';
import { UnitComponent } from './pages/Unit/Unit.component';
import { UnitCreateComponent } from './method/create/UnitCreate/UnitCreate.component';
import { UnitEditComponent } from './method/edit/UnitEdit/UnitEdit.component';
import { UnitDetailsComponent } from './method/details/UnitDetails/UnitDetails.component';
import { UnitDeleteComponent } from './method/delete/UnitDelete/UnitDelete.component';
import { WareHouseItemCategoryComponent } from './pages/WareHouseItemCategory/WareHouseItemCategory.component';
import { WareHouseItemCategoryCreateComponent } from './method/create/WareHouseItemCategoryCreate/WareHouseItemCategoryCreate.component';
import { WareHouseItemCategoryEditComponent } from './method/edit/WareHouseItemCategoryEdit/WareHouseItemCategoryEdit.component';
import { WareHouseItemCategoryDelelteComponent } from './method/delete/WareHouseItemCategoryDelelte/WareHouseItemCategoryDelelte.component';
import { WareHouseItemCategoryEditDetailsComponent } from './method/details/WareHouseItemCategoryEditDetails/WareHouseItemCategoryEditDetails.component';
import { WareHouseItemComponent } from './pages/WareHouseItem/WareHouseItem.component';
import { WareHouseItemCreateComponent } from './method/create/WareHouseItemCreate/WareHouseItemCreate.component';
import { WareHouseItemService } from './service/WareHouseItem.service';
import { WareHouseItemEditComponent } from './method/edit/WareHouseItemEdit/WareHouseItemEdit.component';
import { WareHouseItemDetailsComponent } from './method/details/WareHouseItemDetails/WareHouseItemDetails.component';
import { WareHouseItemDeleteComponent } from './method/delete/WareHouseItemDelete/WareHouseItemDelete.component';
import { WareHouseItemUnitDelelteComponent } from './method/delete/WareHouseItemUnitDelelte/WareHouseItemUnitDelelte.component';
import { WareHouseItemUnitCreateComponent } from './method/create/WareHouseItemUnitCreate/WareHouseItemUnitCreate.component';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'middle',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 100,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WareHouseBenginingComponent,
    WareHouseBookComponent,
    WareHouseLimitComponent,
    HomeComponent,
    VendorComponent,
    VendorEditComponent,
    VendorDetailsComponent,
    VendorCreateComponent,
    VendorDeleteComponent,
    FormsearchComponent,
    WareHouseComponent,
    WareHouseCreateComponent,
    WareHouseEditComponent,
    WareHouseDetailsComponent,
    WareHouseDeleteComponent,
    FormSearchWareHouseComponent,
    UnitComponent,
    UnitCreateComponent,
    UnitEditComponent,
    UnitDetailsComponent,
    UnitDeleteComponent,
    WareHouseItemCategoryComponent,
    WareHouseItemCategoryCreateComponent,
    WareHouseItemCategoryEditComponent,
    WareHouseItemCategoryDelelteComponent,
    WareHouseItemCategoryEditDetailsComponent,
    WareHouseItemComponent,
    WareHouseItemCreateComponent,
    WareHouseItemEditComponent,
    WareHouseItemDetailsComponent,
    WareHouseItemDeleteComponent,
    WareHouseItemUnitDelelteComponent,
    WareHouseItemUnitCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    AngularSplitModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    ScrollingModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    AngularSplitModule,
    MatTreeModule,
    CdkTreeModule,
    NotifierModule.withConfig(customNotifierOptions)

  ],
  providers: [VendorService,WareHouseItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
