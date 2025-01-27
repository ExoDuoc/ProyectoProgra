import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPresupuestoComponent } from './ver-presupuesto.component';

const routes: Routes = [
    {
      path: '',
      component: VerPresupuestoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerPresupuestoRoutingModule { }
