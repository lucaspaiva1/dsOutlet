import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable()
export class ProdutosService {

  produtos: Produto[] = [];

  constructor() {
    let produto1 = new Produto();
    produto1.marca = 'mahalo';
    produto1.modelo = 'seila';
    produto1.tamanho = '38';
    produto1.quantidade = 200;
    produto1.max = 800;
    produto1.min = 50;
    produto1.estado = "ta massa";
    let produto2 = new Produto();
    produto2.marca = 'polo';
    produto2.modelo = 'seilaoq';
    produto2.tamanho = '42';
    produto2.quantidade = 400;
    produto2.max = 550;
    produto2.min = 100;
    produto2.estado = "show";
    let produto3 = new Produto();
    produto3.marca = 'lacoste';
    produto3.modelo = 'sein';
    produto3.tamanho = '40';
    produto3.quantidade = 600;
    produto3.max = 800;
    produto3.min = 20;
    produto3.estado = "lindo";

    this.produtos.push(produto1);
    this.produtos.push(produto2);
    this.produtos.push(produto3);
  }

  getProdutos(): Produto[]{
    return this.produtos;
  }

  addProduto(produto: Produto){
    this.produtos.push(produto);
  }

}
