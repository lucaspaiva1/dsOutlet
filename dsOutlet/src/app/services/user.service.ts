import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../model/user';

@Injectable()
export class UserService {

  users: User[] = [];

  constructor(private storage: LocalStorageService) {
    let user1 = new User();
    user1.nome = 'administrador';
    user1.login = 'admin';
    user1.admin = true;
    user1.email = 'admin@admin.com';
    user1.senha = 'admin';
    let user2 = new User();
    user2.nome = 'Usuario';
    user2.login = 'user';
    user2.admin = false;
    user2.email = 'user@user.com';
    user2.senha = 'user';
    let user3 = new User();
    user3.nome = 'Vendedor';
    user3.login = 'vendor';
    user3.admin = false;
    user3.email = 'vendor@vendor.com';
    user3.senha = 'vendor';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }

  login(username: string, pass: string): boolean {
    console.log("dados recebidos:");
    console.log(username);
    console.log(pass);
    if(username != null){
    let usuario = this.users.find(user => user.login === username);

    if(usuario != null){
      if(usuario.senha === pass){
        console.log("usuario retorno:");
        console.log(usuario);
        usuario.logado = true;
        let logado = this.storage.set('user', usuario);
        if (logado == null) {
          logado = false;
        }
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }}
    else return false;
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
    this.users.push(user);
  }

  getUsers(): User[]{
    return this.users;
  }

  getUserByName(login: string): User{
      return this.users.find(user => user.login === login);
  }
}
