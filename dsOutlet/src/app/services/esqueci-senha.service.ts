import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EsqueciSenhaService {

  constructor(private http: Http) { }

  enviaEmail(email: string): Promise<boolean> {
    console.log(email);
    return this.http.get('http://localhost/dsoutlet/email.php?email='+email)
      .toPromise()
      .then(response => this.extractData(response))
      .catch(this.handleError);
  }

  private extractData(res: Response){
    console.log(res);
    let data = res.json();
    console.log(data);
    return data;
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
