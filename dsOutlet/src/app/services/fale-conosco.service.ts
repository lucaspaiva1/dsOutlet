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
    this.http
      .post('http://dsoutlets.com/apiDsoutlet/cadProd.php', JSON.stringify(mensagem), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any) {
    return false;
  }

}
