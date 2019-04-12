import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../app/guards/auth.guard";
import { NoLoginGuard } from "../app/guards/no-login.guard";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginPageModule',
    canActivate: [NoLoginGuard]
  },
  {
    path: 'logout',
    loadChildren: './components/logout/logout.module#LogoutPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './components/register/register.module#RegisterPageModule',
    canActivate: [NoLoginGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
