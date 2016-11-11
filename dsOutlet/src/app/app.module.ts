import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarAdmComponent } from './components/navbar-adm/navbar-adm.component';

import { AppRoutingModule } from './app-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminEstoqueComponent } from './pages/admin-estoque/admin-estoque.component';
import { AdminCadProdutoComponent } from './pages/admin-cad-produto/admin-cad-produto.component';
import { OptionsAdmComponent } from './components/options-adm/options-adm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FaleConoscoComponent,
    NavbarComponent,
    FooterComponent,
    NavbarAdmComponent,
    AdminHomeComponent,
    AdminEstoqueComponent,
    AdminCadProdutoComponent,
    OptionsAdmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB64Q-NvEJqxFf9PmJZHevjQdxzL9a3jZw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
