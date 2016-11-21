export class User {

  nome: string;
  login: string;
  admin: boolean;
  email: string;
  logado: boolean;
  senha: string;

  constructor(nome: string, login: string, admin: boolean, email: string, logado: boolean, senha: string) {
    this.nome = nome;
    this.login = login;
    this.admin = admin;
    this.email = email;
    this.logado = logado;
    this.senha = senha;
  }
}
