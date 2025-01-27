import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarPresupuestoRoutingModule } from './editar-presupuesto-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarPresupuestoComponent } from './editar-presupuesto.component';


@NgModule({
  declarations: [EditarPresupuestoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPresupuestoRoutingModule
  ]
})
export class EditarPresupuestoModule { }
