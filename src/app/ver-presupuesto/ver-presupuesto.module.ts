import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerPresupuestoRoutingModule } from './ver-presupuesto-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerPresupuestoComponent } from './ver-presupuesto.component';


@NgModule({
  declarations: [VerPresupuestoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerPresupuestoRoutingModule
  ]
})
export class VerPresupuestoModule { }
