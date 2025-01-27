  import { NgModule } from '@angular/core';
  import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
  import { AuthGuard } from './guards/auth.guard'; // Importa el Guard

  const routes: Routes = [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      canActivate: [AuthGuard] // Aplica el Guard aquí
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: 'registro',
      loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
    },
    {
      path: 'crearpresupuesto',
      loadChildren: () => import('./crearpresupuesto/crearpresupuesto.module').then(m => m.CrearpresupuestoPageModule),
      canActivate: [AuthGuard] 
    },
    {
      path: 'presupuesto',
      loadChildren: () => import('./presupuesto/presupuesto.module').then(m => m.PresupuestoPageModule),
      canActivate: [AuthGuard] 
    },    
    {
      path: 'compartir-presupuesto',
      loadChildren: () => import('./compartir-presupuesto/compartir-presupuesto.module').then(m => m.CompartirPresupuestoPageModule),
      canActivate: [AuthGuard] 
    },
    {
      path: 'not-found',
      loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
    },
    // Ruta comodín para manejar errores 404
    {
      path: '**',
      redirectTo: 'not-found',
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
