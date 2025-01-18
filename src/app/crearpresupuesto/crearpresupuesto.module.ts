import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpresupuestoPageRoutingModule } from './crearpresupuesto-routing.module';

import { CrearpresupuestoPage } from './crearpresupuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpresupuestoPageRoutingModule
  ],
  declarations: [CrearpresupuestoPage]
})
export class CrearpresupuestoPageModule {}
