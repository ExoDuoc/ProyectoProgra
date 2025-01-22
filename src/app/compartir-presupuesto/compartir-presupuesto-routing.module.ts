import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompartirPresupuestoPage } from './compartir-presupuesto.page';

const routes: Routes = [
  {
    path: '',
    component: CompartirPresupuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompartirPresupuestoPageRoutingModule {}
