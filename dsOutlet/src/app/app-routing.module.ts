import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { NavbarAdmComponent } from './components/navbar-adm/navbar-adm.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  }, {
    path: 'fale-conosco',
    component: FaleConoscoComponent
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'controle-estoque',
    component: AdminHomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
