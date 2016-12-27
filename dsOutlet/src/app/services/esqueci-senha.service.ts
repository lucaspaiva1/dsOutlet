import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EsqueciSenhaService {

  constructor(private http: Http) { }

  enviaEmail(email: string): Promise<boolean> {
    return this.http.get('http://dsoutlet.com.br/apiDsoutlet/email.php?email='+email)
      .toPromise()
      .then(response => this.extractData(response))
      .catch(this.handleError);
  }

  private extractData(res: Response){
    let data = res.json();
    return data;
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any) {
    return false;
  }

}
