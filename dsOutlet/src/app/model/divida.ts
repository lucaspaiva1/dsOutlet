export class Divida{

  valor: number;
  parcelasAPagar: number;
  tipoVenda:string;
  vencimento: Date;
  dataCompra: Date;
  valorPorParcela: number;

  constructor(){
    this.valor =0;
    this.parcelasAPagar = 1;
    this.tipoVenda="";
  }
}
