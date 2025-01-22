import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompartirPresupuestoPageRoutingModule } from './compartir-presupuesto-routing.module';

import { CompartirPresupuestoPage } from './compartir-presupuesto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompartirPresupuestoPageRoutingModule
  ],
  declarations: [CompartirPresupuestoPage]
})
export class CompartirPresupuestoPageModule {}
