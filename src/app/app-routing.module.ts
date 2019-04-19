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
  },
  {
    path: 'profile',
    loadChildren: './components/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'parking-list',
    loadChildren: './components/parking-list/parking-list.module#ParkingListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register-parking',
    loadChildren: './components/register-parking/register-parking.module#RegisterParkingPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'set-break-free-spot',
    loadChildren: './components/set-break-free-spot/set-break-free-spot.module#SetBreakFreeSpotPageModule',
    canActivate: [AuthGuard]
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
