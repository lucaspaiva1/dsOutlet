import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class NotificacoesService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }


    private handleError(error: any){
        return false
    }

    getNotificacoes(): Promise<any> {
        return this.http.get('http://dsoutlet.com.br/apiDsoutlet/busca.php?notificacoes')
            .toPromise()
            .then(response => this.extractNotificacaoData(response))
            .catch(this.handleError);;

    }

    extractNotificacaoData(res) {
        let date = res.json();
        return date;
    }

}
