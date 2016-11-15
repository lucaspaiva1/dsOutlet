import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../model/user';

@Injectable()
export class UserService {

  constructor(private storage: LocalStorageService) { }

  login(): boolean {
    /*verifica se pode logar pelo banco de dados e preenche os dados de user*/
    let user = new User('Lucas', 'lvpaiva', true, 'lukspaiva@hotmail.com');
    user.logado = true;
    let logado = this.storage.set('user', user);
    if (logado == null) {
      logado = false;
    }
    return logado;
  }

  logout(): void {
    this.storage.remove('user', null);
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
