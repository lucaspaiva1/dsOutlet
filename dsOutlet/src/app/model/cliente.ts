import { Endereco } from './endereco';

export class Cliente {

  id: number;
  nome: string;
  cpf: string;
  nascimento: Date;
  email: string;
  telefone: string;
  endereco: Endereco;
  dividaTotal:number;

  constructor() {
    this.id = 0;
    this.nome="";
  }
}
