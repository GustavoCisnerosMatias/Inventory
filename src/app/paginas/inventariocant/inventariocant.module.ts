import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventariocantPageRoutingModule } from './inventariocant-routing.module';

import { InventariocantPage } from './inventariocant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventariocantPageRoutingModule
  ],
  declarations: [InventariocantPage]
})
export class InventariocantPageModule {}
