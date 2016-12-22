import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RelatorioService } from '../../services/relatorio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Venda } from '../../model/venda';
import { Estoque } from '../../model/estoque';

@Component({
  selector: 'relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private inicio: string = "";
  private fim: string = "";
  private tipo: string = "3";//inicializando com entrada e saída entrada/saida
  private venda: Venda[] = [];
  private estoque: Estoque[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService, private relatorioService: RelatorioService
  ) {

    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.filtrar();

  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  filtrar() {
    let inicio = this.inicio;
    let fim = this.fim;
    if (this.inicio== "") {
      inicio = "null";
    }
    if (this.fim== "") {
      fim = "null";
    }
    this.relatorioService.getRelatorioFiltro(this.tipo, inicio, fim).then(res => {
      this.venda = res[0];
      this.estoque = res[1];
    });

  }



}
