import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';
import { Divida } from '../../model/linhaDeitem';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private vendaFinalizada: boolean;
  private produtos: Produto[] = [];
  private itens: Produto[] = [];
  valorTotal: number = 0;
  private search: string = "";
  private itemSelecionado: Produto = new Produto();
  private: string[] = [];
  private compra: Divida[] = [];
  private quantidade: number = 0;
  private permitirCompra: boolean = false;

  constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    /*se os dados indicarem que usuario não está logado, ele será redirecionado para a pagina principal*/
    if (!this.isLogado) {
      this.router.navigate(['/home']);
    } else {
      this.getEstoque();
    }
  }

  private getEstoque() {
    this.produtosService.getProdutos().then(res => {
      this.produtos = res;
      for (let produto of this.produtos) {
        produto.estado = "";
      }
    });
  }

  private adicionarItem() {
    toast('Produto adicionado!', 2000, 'rounded');
    let compraAtual = new Divida();
    compraAtual.modelo = this.itemSelecionado.modelo;
    compraAtual.marca = this.itemSelecionado.marca;
    compraAtual.quantidade = this.quantidade;
    compraAtual.tamanho = this.itemSelecionado.tamanho;
    compraAtual.valorUnidade = this.itemSelecionado.precoSaidaPadrao;
    compraAtual.valor = (+compraAtual.valorUnidade) * (+compraAtual.quantidade);
    this.compra.push(compraAtual);
    this.valorTotal = this.valorTotal + (+compraAtual.valor);
    this.itemSelecionado = new Produto();
    this.quantidade = 0;
    this.permitirCompra = false;
  }

  private finalizar() {
    this.vendaFinalizada = true;
  }

  limpar() {
    this.search = "";
  }

  seleciona(produto) {
    this.itemSelecionado = produto;
    this.quantidade = 0;
    this.permitirCompra = false;
  }

  verifica() {
    if ((+this.quantidade) <= (+this.itemSelecionado.quantidade) && (+this.quantidade) > 0) {
      this.permitirCompra = true;
    } else {
      this.permitirCompra = false;
    }

  }

  removerProduto(item) {
    let index = this.compra.indexOf(item);
    this.compra.splice(index, 1);
    this.valorTotal = this.valorTotal - (+item.valor);
  }
}
