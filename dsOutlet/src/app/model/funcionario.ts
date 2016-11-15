export class Funcionario {

  nome: string;
  login: string;
  admin: boolean;
  email: string;
  senha: string;

  constructor(nome: string, login: string, admin: boolean, email: string, senha: string) {
    this.nome = nome;
    this.login = login;
    this.admin = admin;
    this.email = email;
    this.senha = senha;
  }
}
