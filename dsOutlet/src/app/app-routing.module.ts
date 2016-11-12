import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { NavbarAdmComponent } from './components/navbar-adm/navbar-adm.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminEstoqueComponent } from './pages/admin-estoque/admin-estoque.component';
import { AdminCadProdutoComponent } from './pages/admin-cad-produto/admin-cad-produto.component';

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
  },
  {
    path: 'estoque',
    component: AdminEstoqueComponent
  },
  {
    path: 'cadastro-produto',
    component: AdminCadProdutoComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
