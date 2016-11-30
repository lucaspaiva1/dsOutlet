/*bibliotecas do angular*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
/*bibliotecas externas*/
import { MaterializeModule } from 'angular2-materialize';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
/*importacoes do projeto*/
/*servicos*/
import { UserService } from './services/user.service';
import { ClientesService } from './services/clientes.service';
import { ProdutosService } from './services/produtos.service';
import { EsqueciSenhaService } from './services/esqueci-senha.service';
/*Components*/
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { GerenciadorComponent } from './pages/gerenciador/gerenciador.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { AdminCadProdutoComponent } from './pages/admin-cad-produto/admin-cad-produto.component';
import { OptionsComponent } from './components/options/options.component';
import { AdminEditProdutoComponent } from './pages/admin-edit-produto/admin-edit-produto.component';
import { AdminAddProdutoComponent } from './pages/admin-add-produto/admin-add-produto.component';
import { AdminCadFuncionarioComponent } from './pages/admin-cad-funcionario/admin-cad-funcionario.component';
import { AdminGerenFuncionariosComponent } from './pages/admin-geren-funcionarios/admin-geren-funcionarios.component';
import { AdminEditFuncionariosComponent } from './pages/admin-edit-funcionarios/admin-edit-funcionarios.component';
import { AdminGerenClientesComponent } from './pages/admin-geren-clientes/admin-geren-clientes.component';
import { AdminEditClientesComponent } from './pages/admin-edit-clientes/admin-edit-clientes.component';
import { AdminAddClientesComponent } from './pages/admin-add-clientes/admin-add-clientes.component';
import { VendasComponent } from './pages/vendas/vendas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FaleConoscoComponent,
    NavbarComponent,
    FooterComponent,
    GerenciadorComponent,
    EstoqueComponent,
    AdminCadProdutoComponent,
    OptionsComponent,
    AdminEditProdutoComponent,
    AdminAddProdutoComponent,
    AdminCadFuncionarioComponent,
    AdminGerenFuncionariosComponent,
    AdminEditFuncionariosComponent,
    AdminGerenClientesComponent,
    AdminEditClientesComponent,
    AdminAddClientesComponent,
    VendasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB64Q-NvEJqxFf9PmJZHevjQdxzL9a3jZw' //chave do google para usar googlemaps
    })
  ],
  providers: [UserService, EsqueciSenhaService, ProdutosService, ClientesService, LocalStorageService,
    {
      provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: {
        prefix: 'my-app',
        storageType: 'localStorage'
        //localStorage: quando fecharo browser os dados permanecem salvos;
        //sessiosStorage: se fechar perde os dados
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
