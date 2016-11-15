import { Injectable } from '@angular/core';
import { Funcionario } from '../model/funcionario';

@Injectable()
export class FuncionariosService {

  users: Funcionario[] = [new Funcionario('Joao', 'joaopvtao', false, 'jpivas@hotmail.com', 'jao1234'), new Funcionario('Carla', 'carlateboca', true, 'carlota@hotmail.com', 'semsenha'), new Funcionario('julia', 'julinda', false, 'jujubaba@hotmail.com', 'naotemsenha')];

  constructor() { }

  getFuncionarios(): Funcionario[]{
    return this.users;
  }

  addFuncionario(user: Funcionario): void{
    this.users.push(user);
  }

  getFuncionario(username: string): Funcionario{
    return this.users.find(user => user.login === username);
  }

}
