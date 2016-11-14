export class User {

  nome: string;
  login: string;
  admin: boolean;
  email: string;
  logado: boolean;

  constructor(nome: string, login: string, admin: boolean, email: string, logado: boolean) {
    this.nome = nome;
    this.login = login;
    this.admin = admin;
    this.email = email;
    this.logado = logado;
  }
}
