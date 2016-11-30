import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Cliente } from '../model/cliente';

@Injectable()
export class ClientesService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private clientes: Cliente[] = [];

  constructor(private http: Http) {
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  addCliente(cliente: Cliente): Promise<boolean>{
    return this.http
        .post('http://localhost/cadProd.php', JSON.stringify(cliente), {headers: this.headers})
        .toPromise()
        .then(res => this.extractAddData(res))
        .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractAddData(res: Response) {
    let data = res.json();
    return data;
  }

  getFuncionarioByName(nome: string): Cliente{
    return this.clientes.find(cliente => cliente.nome === nome);
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
