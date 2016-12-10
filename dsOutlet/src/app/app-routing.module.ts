import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { GerenciadorComponent } from './pages/gerenciador/gerenciador.component';
import { AdminGerenFuncionariosComponent } from './pages/admin-geren-funcionarios/admin-geren-funcionarios.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { AdminEditProdutoComponent } from './pages/admin-edit-produto/admin-edit-produto.component';
import { AdminEditFuncionariosComponent } from './pages/admin-edit-funcionarios/admin-edit-funcionarios.component';
import { AdminCadProdutoComponent } from './pages/admin-cad-produto/admin-cad-produto.component';
import { AdminAddProdutoComponent } from './pages/admin-add-produto/admin-add-produto.component';
import { AdminCadFuncionarioComponent } from './pages/admin-cad-funcionario/admin-cad-funcionario.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { AdminGerenClientesComponent } from './pages/admin-geren-clientes/admin-geren-clientes.component';
import { AdminAddClientesComponent } from './pages/admin-add-clientes/admin-add-clientes.component';
import { AdminEditClientesComponent } from './pages/admin-edit-clientes/admin-edit-clientes.component';
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';


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
    path: 'gerenciador',
    component: GerenciadorComponent
  },
  {
    path: 'gerenciador/estoque',
    component: EstoqueComponent
  },
  {
    path: 'gerenciador/cadastrar-produto',
    component: AdminCadProdutoComponent
  },
  {
    path: 'gerenciador/editar-produto/:id',
    component: AdminEditProdutoComponent
  },
  {
    path: 'gerenciador/adicionar-produto/:id',
    component: AdminAddProdutoComponent
  },
  {
    path: 'gerenciador/cadastrar-funcionario',
    component: AdminCadFuncionarioComponent
  },
  {
    path: 'gerenciador/funcionarios',
    component: AdminGerenFuncionariosComponent
  },
  {
    path: 'gerenciador/edit-funcionario/:id',
    component: AdminEditFuncionariosComponent
  },
  {
    path: 'gerenciador/venda',
    component: VendasComponent
  }, {
    path: 'gerenciador/clientes',
    component: AdminGerenClientesComponent
  }, {
    path: 'gerenciador/clientes/cadastro',
    component: AdminAddClientesComponent
  }, {
    path: 'gerenciador/clientes/editar/:id',
    component: AdminEditClientesComponent
  }, {
    path: 'gerenciador/minha-conta',
    component: MinhaContaComponent
  }, {
    path: 'gerenciador/relatorios',
    component: RelatorioComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
