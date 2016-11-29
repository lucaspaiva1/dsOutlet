import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../model/user';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private users: User[];

  constructor(private storage: LocalStorageService, private http: Http) {

  }

  /*Usuario envia dados para solicitar login atraves de um POST*/
  login(login: string, senha: string): Promise<boolean> {

    /*dados sao enviados para api*/
    return this.http
      .post('http://localhost/logar.php', JSON.stringify({login: login, senha: senha}), { headers: this.headers })
      .toPromise()
      .then(res => this.extractLoginData(res))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractLoginData(res: Response) {
    console.log(res);
    let usuario = res.json();
    console.log(usuario);
    /*se voltar false é pq nao foi possivel efetuar login*/
    if (usuario != false) {
      usuario.admin = usuario.acesso == 'A' ? true : false; //os valores booleanos do banco sao 0 (false) ou 1 (true)
      usuario.logado = true;
      console.log(usuario);
      let logado = this.storage.set('user', usuario);
      return true
    } else {
      return false;
    }
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*método que remove do cache os dados do usuario depois do logout*/
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

  /*metodo que adiciona no banco um usuario*/
  addUser(user: User):  Promise<string> {

    return this.http
        .post('http://localhost/cadastro.php', JSON.stringify(user), {headers: this.headers})
        .toPromise()
        .then(res => this.extractAddData(res))
        .catch(this.handleError);
  }

  /*método que extrai os dados do json recebido do backend*/
  private extractAddData(res: Response) {
    let data = res.json();
    if(data == 'login'){
      return "Login já está em uso";
    }else if(data == 'email'){
      return "Email já está em uso";
    }else if(data == true){
      return "Cadastro Efetuado!";
    }else{
      return "ops";
    }
  }

  /*Método que retorna todos usuarios do banco de dados para o admin gerenciar*/
  getUsers(): Promise<User[]> {
    return this.http.get('http://localhost/teste.php?id')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleError);
  }

  /*método que extrai os dados do json recebido do backend*/
  private extractGetData(res: Response) {
    let data = res.json();
    if (data == null) {
      this.users = [];
    } else {
      this.users = data;
    }
    return this.users;
  }

  getUserByName(login: string): User {
    console.log("userbyname");
    return new User();
  }

  getUser(id: number): User{
    return this.users.find(user => user.id === id);
  }

}
