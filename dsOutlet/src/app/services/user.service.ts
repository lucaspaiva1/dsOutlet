import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../model/user';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private storage: LocalStorageService, private http: Http) {

  }

  /*Usuario envia dados para solicitar login*/
  login(username: string, pass: string): Promise<boolean> {
      /*usuario e senha inseridos em um objeto*/
      let user = new User();
      user.login = 'teste';
      user.senha = 'teste';
      /*dados sao enviados para api*/
      return this.http
        .post('http://localhost/teste.php', JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(res => this.extractLoginData(res))
        .catch(this.handleError);
  }

  private extractLoginData(res: Response){
    let usuario = res.json();
    if(usuario!="false"){
      console.log(usuario);
      usuario.logado = true;
      let logado = this.storage.set('user', usuario);
      return true
    }else{
      return false;
    }
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  logout(): void {
    this.storage.remove('user');
  }

  /*Retorna um array de boolean ->primeiro index é logado, segundo é admin*/
  userStats(): boolean[] {
    let user = <User>this.storage.get('user');
    if (user == null) {
      return [false, false];
    }
    return [user.logado, user.admin];
  }

  addUser(user: User): void{
    //this.users.push(user);
  }

  getUsers(): User[]{
    return [];
  }

  getUserByName(login: string): User{
    return new User();
  }
}
