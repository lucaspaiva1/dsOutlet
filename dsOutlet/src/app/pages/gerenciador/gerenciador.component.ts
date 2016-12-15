import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificacaoCliente } from '../../model/notificacaoCliente';
import { Produto } from '../../model/produto';

@Component({
  selector: 'gerenciador',
  templateUrl: './gerenciador.component.html',
  styleUrls: ['./gerenciador.component.css']
})
export class GerenciadorComponent implements OnInit {

  private isLogado: boolean;
  private isAdmin: boolean;
  private dividaVencidas: NotificacaoCliente[] = [];
  private produtosFaltante: Produto[] = [];

  constructor(private router: Router, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  selectProduto(produto) {
    if (this.isAdmin) {
      this.router.navigate(['/gerenciador/adicionar-produto', produto.id]); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  abrirCliente(cliente) {
    this.router.navigate(['gerenciador/clientes/editar/', cliente.id]);
  }


}
