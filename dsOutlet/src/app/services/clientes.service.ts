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

  getClientes(): Promise<Cliente[]> {
    return this.http.get('http://localhost/dsoutlet/busca.php?cli')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractGetData(res: Response) {
    let data = res.json();
    if (data == null) {
      this.clientes = [];
    } else {
      this.clientes = data;
    }
    return this.clientes;
  }

  addCliente(cliente: Cliente): Promise<boolean>{
    console.log(cliente);
    return this.http
        .post('http://localhost/dsoutlet/cadCli.php', JSON.stringify(cliente), {headers: this.headers})
        .toPromise()
        .then(res => this.extractAddData(res))
        .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractAddData(res: Response) {
    let data = res.json();
    return data;
  }

  getUser(id: number): Cliente {
    return this.clientes.find(cliente => cliente.id === id);
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error);
    return Promise.reject(error.message || error);
  }

}
