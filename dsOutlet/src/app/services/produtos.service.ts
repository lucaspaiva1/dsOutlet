import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Produto } from '../model/produto';

@Injectable()
export class ProdutosService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private produtos: Produto[] = [];

  constructor(private http: Http) {

  }

  /*Usuario envia dados para cadastrar produto atraves de um POST*/
  newProduto(produto: Produto): Promise<any> {
    return this.http
      .post('http://dsoutlets.com/apiDsoutlet/cadProd.php', JSON.stringify(produto), { headers: this.headers })
      .toPromise()
      .then(res => this.extractNewData(res))
      .catch(this.handleErrorMessage);
  }

  private handleErrorMessage(error: any) {
    let retorno = { type: false, message: 'Ocorreu um erro!' };
    return retorno;
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractNewData(res: Response) {
    let retorno = { type: false, message: '' };
    let data = res.json();
    if (data === true) {
      retorno.type = true;
      retorno.message = 'Produto foi cadastrado!';
    } else {
      retorno.message = 'Produto já existe!';
    }
    return retorno;
  }

  addProduto(produto: Produto): Promise<boolean> {
    return this.http
      .post('http://dsoutlets.com/apiDsoutlet/add.php', JSON.stringify(produto), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractAddData(res: Response) {
    let data = res.json();
    return data;
  }

  getProdutos(): Promise<any> {
    return this.http.get('http://dsoutlets.com/apiDsoutlet/busca.php?prod')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleError);
  }

  private extractGetData(res: Response) {
    let data = res.json();
    if (data == null) {
      this.produtos = [];
    } else {
      this.produtos = data;
    }
    return this.produtos;
  }

  getProduto(id: number): Promise<Produto> {
    return this.getProdutos()
      .then(produtos => produtos.find(produto => produto.id === id));
  }

  delProduto(id: number): Promise<boolean> {

    return this.http
      .post('http://dsoutlets.com/apiDsoutlet/deleteProd.php', JSON.stringify({ id: id }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleError);
  }

  private extractDelData(res: Response) {
    let data = res.json();
    return data;
  }

  editProduto(produto: Produto): Promise<boolean> {
    return this.http
      .post('http://dsoutlets.com/apiDsoutlet/editProd.php', JSON.stringify(produto), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditData(res))
      .catch(this.handleError);
  }

  private extractEditData(res: Response) {
    let data = res.json();
    return data;
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any) {
    return false;
  }

}
