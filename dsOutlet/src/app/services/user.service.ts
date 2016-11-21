import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../model/user';

@Injectable()
export class UserService {

  users: User[] = [new User('Administrador', 'admin', true, 'admin@admin.com', false, 'admin'), new User('Ususario', 'user', false, 'user@user.com', false, 'user')]

  constructor(private storage: LocalStorageService) { }

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
    /*verifica se pode logar pelo banco de dados e preenche os dados de user*/
    /*
    let user = new User('Lucas', 'lvpaiva', true, 'lukspaiva@hotmail.com');
    user.logado = true;
    let logado = this.storage.set('user', user);
    if (logado == null) {
      logado = false;
    }
    return logado;*/
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
}
