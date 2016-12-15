import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../model/user';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private user: User = null;

  constructor(private storage: LocalStorageService, private http: Http) {
    try{
      let localUser = <User>this.storage.get('user');
      if(localUser != null){
        this.user = localUser;
      }
    }catch(e){
      console.log("entrou no catch");
      console.log(e);
    }
  }

  /*Usuario envia dados para solicitar login atraves de um POST*/
  login(login: string, senha: string): Promise<any> {

    /*dados sao enviados para api*/
    return this.http
      .post('http://localhost/dsoutlet/logar.php', JSON.stringify({ login: login, senha: senha }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractLoginData(res))
      .catch(this.handleError);
  }

  /*Método que converte o arquivo json recebido da api php*/
  private extractLoginData(res: Response) {
    let usuario = res.json();
    let resposta = {type: false , message: ""};
    /*se voltar false é pq nao foi possivel efetuar login*/
    if (usuario == false) {
      resposta.message = "Usuario ou Senha Incorretos";
      return resposta;
    /*se voltar desativado é pq nao usuario nao está ativo*/
    } else if (usuario == "desativado") {
      resposta.message = "Usuario desativado";
      return resposta;
    } else {
      usuario.admin = usuario.acesso == 'A' ? true : false; //os valores booleanos do banco sao 0 (false) ou 1 (true)
      usuario.logado = true;
      this.user = usuario;

      try{
        this.storage.set('user', this.user);
      }catch(e){
        console.log("entrou no catch");
        console.log(e);
      }

      resposta.type = true;
      resposta.message = "Logado com Sucesso!";
      return resposta;
    }
  }

  /*metodo que adiciona no banco um usuario*/
  addUser(user: User): Promise<any> {

    return this.http
      .post('http://localhost/dsoutlet/cadastro.php', JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => this.extractAddData(res))
      .catch(this.handleError);
  }

  /*método que extrai os dados do json recebido do backend*/
  private extractAddData(res: Response) {
    let data = res.json();
    let retorno = { type: 0, message: '' };
    if (data == "login") {
      retorno.type = 1;
      retorno.message = "Login já está em uso";
      return retorno;
    } else if (data == 'email') {
      retorno.type = 2;
      retorno.message = "Email já está em uso";
      return retorno;
    } else if (data == true) {
      retorno.type = 3;
      retorno.message = "Cadastro Efetuado!";
      return retorno;
    }
  }

  /*Método que retorna todos usuarios do banco de dados para o admin gerenciar*/
  getUsers(): Promise<User[]> {
    return this.http.get('http://localhost/dsoutlet/busca.php?id')
      .toPromise()
      .then(response => this.extractGetData(response))
      .catch(this.handleError);
  }

  /*método que extrai os dados do json recebido do backend*/
  private extractGetData(res: Response) {
    let data = res.json();
    if (data == null) {
      return new User;
    } else {
      return data;
    }
  }

  deleteUser(id: number): Promise<boolean> {
    return this.http
      .post('http://localhost/dsoutlet/delete.php', JSON.stringify({ id: id }), { headers: this.headers })
      .toPromise()
      .then(res => this.extractDelData(res))
      .catch(this.handleError);
  }

  private extractDelData(res: Response) {
    let data = res.json();
    return data;
  }

  editUser(user: User): Promise<any> {
    return this.http
      .post('http://localhost/dsoutlet/edit.php', JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => this.extractEditData(res))
      .catch(this.handleError);
  }

  private extractEditData(res: Response) {
    let data = res.json();
    let retorno = { type: false, message: '' };
    if (data == "login") {
      retorno.type = false;
      retorno.message = 'Este Usuário já existe no sitema';
      return retorno;
    } else if (data == 'nome') {
      retorno.type = false;
      retorno.message = 'Este Nome já existe no sitema';
      return retorno;
    } else if (data == true) {
      retorno.type = true;
      retorno.message = 'Editado com sucesso!';
      return retorno;
    } else {
      retorno.type = false;
      retorno.message = 'Ocorreu um erro!';
      return retorno;
    }
  }

  getUser(id: number): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user.id === id));
  }

  /*método chamado quando ocorre um erro no acesso a api php*/
  private handleError(error: any): Promise<any> {
    //console.error('Ocorreu um erro!', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*método que remove do cache os dados do usuario depois do logout*/
  logout(): void {
    try{
      this.storage.remove('user');
    }catch(e){
      console.log("entrou no catch");
      console.log(e);
    }
    this.user = null;
  }

  /*Retorna um array de boolean ->primeiro index é logado, segundo é admin*/
  userStats(): any[] {

    try{
      let localUser = <User>this.storage.get('user');
      if (localUser == null) {
        return [false, false, 0];
      }else{
        return [localUser.logado, localUser.admin, localUser.id];
      }
    }catch(e){
      console.log("entrou no catch");
      console.log(e);
      if (this.user == null) {
        return [false, false, 0];
      }else{
        return [this.user.logado, this.user.admin, this.user.id];
      }
    }
  }
}
