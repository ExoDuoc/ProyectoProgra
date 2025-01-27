import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPresupuestoComponent } from './editar-presupuesto.component';

const routes: Routes = [
    {
      path: '',
      component: EditarPresupuestoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarPresupuestoRoutingModule { }
