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
  newProduto(produto: Produto): Promise<boolean> {
    console.log(produto);
    return this.http
        .post('http://localhost/cadProd.php', JSON.stringify(produto), {headers: this.headers})
        .toPromise()
        .then(res => this.extractNewData(res))
        .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractNewData(res: Response) {
    let data = res.json();
    return data;
  }

  addProduto(produto: Produto): Promise<boolean> {
    return this.http
      .post('http://localhost/logar.php', JSON.stringify(produto), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractAddData(res: Response) {
    let data = res.json();
    return data;
  }

  sellProduto(produto: Produto): Promise<boolean>{
    return this.http
      .post('http://localhost/logar.php', JSON.stringify(produto), { headers: this.headers })
      .toPromise()
      .then(res => this.extractSellData(res))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractSellData(res: Response) {
    let data = res.json();
    return data;
  }

  getProdutos(): Promise<Produto[]>{
    return this.http.get('http://localhost/busca.php?prod')
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

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
