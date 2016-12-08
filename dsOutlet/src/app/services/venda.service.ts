import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response } from '@angular/http';
import { Cliente } from '../model/cliente';
import { LinhaDeItem } from '../model/linhaDeItem';
import { Divida } from '../model/divida';


@Injectable()
export class VendaService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  concluirCompra(idCliente:number, idUser:number, linhaDeItem:LinhaDeItem[], divida:Divida): Promise<any> {
    return this.http
      .post('http://localhost/dsoutlet/venda.php', JSON.stringify({idCliente, idUser, linhaDeItem, divida}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleError);
  }

  private extractAddData(res: Response) {
    let data = res.json();
    return data;
  }

  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error);
    return Promise.reject(error.message || error);
  }

}
