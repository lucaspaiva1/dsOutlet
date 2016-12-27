import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Cliente } from '../model/cliente';
import { Divida } from '../model/divida';

@Injectable()
export class ClientesService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  getClientes(): Promise<any> {
    return this.http.get('http://dsoutlet.com.br/apiDsoutlet/busca.php?cli')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractGetData(res: Response) {
    let data = res.json();
    if (data == null) {
      return new Cliente();
    } else {
      return data;
    }
  }

  addCliente(cliente: Cliente): Promise<boolean> {
    return this.http
      .post('http://dsoutlet.com.br/apiDsoutlet/cadCli.php', JSON.stringify(cliente), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractAddData(res: Response) {
    let data = res.json();
    return data;
  }

  getCliente(id: number): Promise<any> {
    return this.http.get('http://dsoutlet.com.br/apiDsoutlet/busca.php?cli=' + id)
      .toPromise()
      .then(response => this.extractData(response))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractData(res: Response) {
    let data = res.json();
    return data;
  }

  deleteCliente(id: number) {
    return this.http
      .post('http://dsoutlet.com.br/apiDsoutlet/deleteCli.php', JSON.stringify({ id: id }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractData(res))
      .catch(this.handleError);
  }

  editCliente(cliente: Cliente) {
    return this.http
      .post('http://dsoutlet.com.br/apiDsoutlet/editCli.php', JSON.stringify(cliente), { headers: this.headers })
      .toPromise()
      .then(res => this.extractData(res))
      .catch(this.handleError);
  }

  pagamentoPendencia(divida: Divida): Promise<any> {
    return this.http
      .post('http://dsoutlet.com.br/apiDsoutlet/pagar.php', JSON.stringify({divida}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleError);
  }


  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any) {
    return false;
  }

}
