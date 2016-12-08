import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response } from '@angular/http';
import { Cliente } from '../model/cliente';
import { User } from '../model/user';
import { LinhaDeItem } from '../model/linhaDeItem';


@Injectable()
export class VendaService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }

  concluirCompra(cliente:Cliente, user:User, linhaDeItem:LinhaDeItem[], valorCompra:number): Promise<any> {
    return this.http
      .post('http://localhost/dsoutlet/venda.php', JSON.stringify({cliente, user, linhaDeItem, valorCompra}), { headers: this.headers })
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
