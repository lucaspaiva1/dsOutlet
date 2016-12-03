import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-admin-add-produto',
  templateUrl: './admin-add-produto.component.html',
  styleUrls: ['./admin-add-produto.component.css']
})
export class AdminAddProdutoComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  private search: string = "";
  private filtrados: Produto[] = [];
  private produto: Produto = new Produto();
  private quantidade: number;

  constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado para homePage
    }
  }

  /* busca o texto recebido no evento do seachbar
  nos atributos marca modelo e tamanho dos itens da lista de produtos*/
  onKeyup(search: string): void {
    this.produtosService.getProdutos().then(res => {
      let produtos = res;
      this.filtrados = produtos.filter(produto => (
        produto.marca.includes(search) ||
        produto.modelo.includes(search) ||
        produto.tamanho.includes(search) ||
        (produto.marca + " " + produto.modelo).includes(search) ||
        (produto.marca + " " + produto.tamanho).includes(search) ||
        (produto.modelo + " " + produto.tamanho).includes(search) ||
        (produto.marca + " " + produto.modelo + " " + produto.tamanho).includes(search)
      ));
    }
    );
  }

  /*quando perde o foco, a lista de filtrados é esvaziada para sair da tela*/
  private lostFocus(): void {
    this.filtrados = [];
  }

  /*abre um produto selecionado da lista de friltrados e esvazia a lista*/
  private abrir(selecionado: Produto): void {
    this.produto = selecionado;
    this.filtrados = [];
  }

  /*adiciona a quantidade ao produto no banco de dados*/
  private adicionar(): void {
    if (this.quantidade > 0) {
      this.produto.quantidade = this.quantidade;
      console.log(this.produto);
      this.produtosService.addProduto(this.produto).then(res => {
        if (res) {
          toast('Produto foi modificado!', 4000, 'rounded');
          this.produto = new Produto();
          this.quantidade = 0;
        } else {
          toast('Ocorreu um erro!', 4000, 'rounded');
        }
      });
    } else {
      toast('Quantidade Inválida!', 4000, 'rounded');
    }
  }

}
