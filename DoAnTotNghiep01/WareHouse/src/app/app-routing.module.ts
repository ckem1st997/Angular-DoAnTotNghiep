import { HomeComponent } from './pages/home/home.component';
import { WareHouseBookComponent } from './pages/WareHouseBook/WareHouseBook.component';
import { WareHouseLimitComponent } from './pages/WareHouseLimit/WareHouseLimit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WareHouseBenginingComponent } from './pages/WareHouseBengining/WareHouseBengining.component';
import { VendorComponent } from './pages/Vendor/Vendor.component';
import { FormsearchComponent } from './method/search/formsearch/formsearch.component';
import { WareHouseComponent } from './pages/WareHouse/WareHouse.component';
import { UnitComponent } from './pages/Unit/Unit.component';
import { WareHouseItemCategoryService } from './service/WareHouseItemCategory.service';
import { WareHouseItemCategoryComponent } from './pages/WareHouseItemCategory/WareHouseItemCategory.component';
import { WareHouseItemComponent } from './pages/WareHouseItem/WareHouseItem.component';
import { InwardCreateComponent } from './method/create/InwardCreate/InwardCreate.component';
import { NotFoundComponent } from './pages/NotFound/NotFound.component';
import { OutwardCreateComponent } from './method/create/OutwardCreate/OutwardCreate.component';
import { InwardEditComponent } from './method/edit/InwardEdit/InwardEdit.component';
import { InwardDetailsComponent } from './method/details/InwardDetails/InwardDetails.component';

const routes: Routes = [
  { path: 'warehouse-limit', component: WareHouseLimitComponent },
  { path: 'warehouse-book', component: WareHouseBookComponent },
  { path: 'warehouse-benging', component: WareHouseBenginingComponent },
  { path: 'warehouse-item-category', component: WareHouseItemCategoryComponent },
  { path: 'warehouse-item', component: WareHouseItemComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'warehouse', component:  WareHouseComponent },
  { path: 'unit', component:  UnitComponent },
  { path: 'create-inward/:whid', component:  InwardCreateComponent },
  { path: 'edit-inward/:id', component:  InwardEditComponent },
  { path: 'details-inward/:id', component:  InwardDetailsComponent },
  { path: 'create-outward/:whid', component:  OutwardCreateComponent },
  { path: '', component: HomeComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
