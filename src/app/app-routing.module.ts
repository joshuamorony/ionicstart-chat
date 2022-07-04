import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateAuthenticated } from './shared/guards/auth.guard';
import { CanActivateLogin } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [CanActivateAuthenticated],
    loadChildren: () =>
      import('./home/home.page').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    canActivate: [CanActivateLogin],
    loadChildren: () =>
      import('./login/login.page').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [CanActivateLogin, CanActivateAuthenticated],
})
export class AppRoutingModule {}
