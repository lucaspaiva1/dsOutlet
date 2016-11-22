import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { GerenciadorComponent } from './pages/gerenciador/gerenciador.component';
import { AdminGerenFuncionariosComponent } from './pages/admin-geren-funcionarios/admin-geren-funcionarios.component';
import { AdminEstoqueComponent } from './pages/admin-estoque/admin-estoque.component';
import { AdminEditProdutoComponent } from './pages/admin-edit-produto/admin-edit-produto.component';
import { AdminEditFuncionariosComponent } from './pages/admin-edit-funcionarios/admin-edit-funcionarios.component';
import { AdminCadProdutoComponent } from './pages/admin-cad-produto/admin-cad-produto.component';
import { AdminAddProdutoComponent } from './pages/admin-add-produto/admin-add-produto.component';
import { AdminCadFuncionarioComponent } from './pages/admin-cad-funcionario/admin-cad-funcionario.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { AdminGerenClientesComponent } from './pages/admin-geren-clientes/admin-geren-clientes.component';
import { AdminAddClientesComponent } from './pages/admin-add-clientes/admin-add-clientes.component';
import { AdminEditClientesComponent } from './pages/admin-edit-clientes/admin-edit-clientes.component';

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
    component: GerenciadorComponent
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
  },
  {
    path: 'funcionarios',
    component: AdminGerenFuncionariosComponent
  },
  {
    path: 'edit-funcionario/:username',
    component: AdminEditFuncionariosComponent
  },
  {
    path: 'venda',
    component: VendasComponent
  }, {
    path: 'clientes',
    component: AdminGerenClientesComponent
  }, {
    path: 'clientes/cadastro',
    component: AdminAddClientesComponent
  }, {
    path: 'clientes/editar/:name',
    component: AdminEditClientesComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
