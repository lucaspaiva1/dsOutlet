import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RelatorioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }


  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getRelatorioFiltro(tipo: string, inicio: string, fim: string): Promise<any> {
    return this.http
      .post('http://localhost/dsoutlet/relatorio.php', JSON.stringify({ tipo, inicio, fim }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractRelarioData(res))
      .catch(this.handleError);
  }

  extractRelarioData(res) {
    let date = res.json();
    return date;
  }


}
