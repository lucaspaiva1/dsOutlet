import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RelatorioService {

  constructor(private http: Http) {
    
  }

  getAll(): Promise<boolean> {
    return this.http.get('http://localhost/dsoutlet/busca.php?id')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleError);
  }

  private extractGetData(res: Response) {
    let data = res.json();
    return data;
  }

  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
