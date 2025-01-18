import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearpresupuestoPage } from './crearpresupuesto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearpresupuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearpresupuestoPageRoutingModule {}
