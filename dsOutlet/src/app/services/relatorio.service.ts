import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RelatorioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {

  }


  private handleError(error: any) {
    return false;
  }

  getRelatorioFiltro(tipo: string, inicio: string, fim: string): Promise<any> {
    return this.http
      .post('http://dsoutlets.com/apiDsoutlet/relatorio.php', JSON.stringify({ tipo, inicio, fim }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractRelarioData(res))
      .catch(this.handleError);
  }

  extractRelarioData(res) {
    let date = res.json();
    return date;
  }


}
