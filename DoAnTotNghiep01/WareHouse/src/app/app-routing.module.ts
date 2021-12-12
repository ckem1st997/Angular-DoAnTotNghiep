import { HomeComponent } from './pages/home/home.component';
import { WareHouseBookComponent } from './pages/WareHouseBook/WareHouseBook.component';
import { WareHouseLimitComponent } from './pages/WareHouseLimit/WareHouseLimit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WareHouseBenginingComponent } from './pages/WareHouseBengining/WareHouseBengining.component';

const routes: Routes = [
  { path: 'warehouse-limit', component: WareHouseLimitComponent },
  { path: 'warehouse-book', component: WareHouseBookComponent },
  { path: 'warehouse-benging', component: WareHouseBenginingComponent },
  { path: '', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
