import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { NavbarAdmComponent } from './components/navbar-adm/navbar-adm.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminEstoqueComponent } from './pages/admin-estoque/admin-estoque.component';
import { AdminCadProdutoComponent } from './pages/admin-cad-produto/admin-cad-produto.component';
import { AdminEditProdutoComponent } from './pages/admin-edit-produto/admin-edit-produto.component';
import { AdminAddProdutoComponent } from './pages/admin-add-produto/admin-add-produto.component';
import { AdminCadFuncionarioComponent } from './pages/admin-cad-funcionario/admin-cad-funcionario.component';

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
    path: 'cadastrar-produto',
    component: AdminCadProdutoComponent
  },
  {
    path: 'editar-produto',
    component: AdminEditProdutoComponent
  },
  {
    path: 'adicionar-produto',
    component: AdminAddProdutoComponent
  },
  {
    path: 'cadastrar-funcionario',
    component: AdminCadFuncionarioComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
