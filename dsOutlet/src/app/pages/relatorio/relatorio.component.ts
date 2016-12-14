import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Venda } from '../../model/venda';
import { Estoque } from '../../model/estoque';

@Component({
  selector: 'relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private inicio: Date;
  private fim: Date;
  private tipo: string = "3";//inicializando com entrada e saída entrada/saida
  private venda: Venda[] = [];
  private estoque: Estoque[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {

    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.filtrar();

  }

  filtrar() {
    console.log(this.tipo);
    console.log(this.inicio);
    console.log(this.fim);
    this.userService.getRelatorioFiltro(this.tipo, this.inicio, this.fim).then(res => {
      console.log("chegou" + res);
      this.venda = res[0];
      this.estoque = res[1];
    });

  }

}
