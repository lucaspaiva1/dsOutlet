import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Mensagem } from '../model/mensagem';

@Injectable()
export class FaleConoscoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  enviarMensagem(mensagem: Mensagem) {
    console.log(mensagem);
    this.http
      .post('http://localhost/dsoutlet/cadProd.php', JSON.stringify(mensagem), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
