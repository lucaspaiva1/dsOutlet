export class Divida {
  id: number;
  valor: number;
  valorExibir: string;
  parcelasAPagar: number;
  tipoVenda: string;
  vencimento: Date;
  dataCompra: Date;
  valorPorParcela: number;
  valorRecebido: number;


  constructor() {
    this.valor = 0;
    this.parcelasAPagar = 1;
    this.tipoVenda = "";
    this.valorRecebido = 0;
    this.valorExibir = "0";
  }

  atualizar() {
    this.valorExibir = this.valor.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

  }
}
