import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private loading: boolean;
  private search: string;
  private selecionado: Produto;
  private erro = false;

  produtos: Produto[];

  constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.search = "";

  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
      this.getEstoque();
    }
  }

  getEstoque() {
    this.loading = true;
    this.produtosService.getProdutos().then(res => {
      if (res === false) {
        this.erro = true;
      } else {
        this.produtos = res;
      }
      this.loading = false;
    });
  }

  limpar() {
    this.search = "";
  }

  teste(produto) {
    this.selecionado = produto;
  }

  editar() {
    this.router.navigate(['/gerenciador/editar-produto', this.selecionado.id]); //se os dados indicarem que usuario nao está logado, ele será redirecionado
  }

  adicionar() {
    this.router.navigate(['/gerenciador/adicionar-produto', this.selecionado.id]); //se os dados indicarem que usuario nao está logado, ele será redirecionado

  }

  cadastrarProduto() {
    if (this.isAdmin) {
      this.router.navigate(['/gerenciador/cadastrar-produto']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
      toast('Funcionalidade permitida somente para administrador!', 4000, 'rounded');
    }

  }

}
