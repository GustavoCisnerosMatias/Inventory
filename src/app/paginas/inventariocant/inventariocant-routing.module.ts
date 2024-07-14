import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventariocantPage } from './inventariocant.page';

const routes: Routes = [
  {
    path: '',
    component: InventariocantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventariocantPageRoutingModule {}
