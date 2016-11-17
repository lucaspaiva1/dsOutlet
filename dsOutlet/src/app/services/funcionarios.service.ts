import { Injectable } from '@angular/core';
import { Funcionario } from '../model/funcionario';

@Injectable()
export class FuncionariosService {

  funcionarios: Funcionario[] = [];

  constructor() {
    let funcionario1 = new Funcionario();
    funcionario1.nome = 'Carlos';
    funcionario1.login = 'carlos';
    funcionario1.admin = false;
    funcionario1.email = 'carlos@hotmail.com';
    funcionario1.senha = 'calos123';
    let funcionario2 = new Funcionario();
    funcionario2.nome = 'Bruna';
    funcionario2.login = 'brunaAdmin';
    funcionario2.admin = true;
    funcionario2.email = 'bruna@hotmail.com';
    funcionario2.senha = 'bruna4321';
    let funcionario3 = new Funcionario();
    funcionario3.nome = 'Maria';
    funcionario3.login = 'maria';
    funcionario3.admin = false;
    funcionario3.email = 'maria@hotmail.com';
    funcionario3.senha = 'maria123';
    this.funcionarios.push(funcionario1);
    this.funcionarios.push(funcionario2);
    this.funcionarios.push(funcionario3);
  }

  getFuncionarios(): Funcionario[]{
    console.log(this.funcionarios);
    return this.funcionarios;
  }

  addFuncionario(funcionario: Funcionario): void{
    console.log("adicionou funcionario:");
    console.log(funcionario);
    this.funcionarios.push(funcionario);
  }

  getFuncionario(username: string): Funcionario{
    return this.funcionarios.find(funcionario => funcionario.login === username);
  }

}
