export class Endereco {

  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  uf: string;
  cidade: string;

  constructor() {
    this.cep = "";
    this.logradouro = "";
    this.numero = "";
    this.uf = "";
    this.cidade = "";
  }
}
