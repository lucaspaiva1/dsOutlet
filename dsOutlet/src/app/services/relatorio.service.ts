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
      .post('http://dsoutlet.com.br/apiDsoutlet/relatorio.php', JSON.stringify({ tipo, inicio, fim }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractRelarioData(res))
      .catch(this.handleError);
  }

  extractRelarioData(res) {
    let date = res.json();
    return date;
  }

  getLinhaItem(id: number):Promise<any> {
    return this.http
      .get('http://dsoutlet.com.br/apiDsoutlet/busca.php?detalhar=' + id)
      .toPromise()
      .then(response => this.extractRelarioData(response))
      .catch(this.handleError);
  }


}
