export class Divida{

  valor: number;
  parcelasAPagar: number;
  tipoVenda:string;
  vencimento: Date;
  dataCompra: Date;
  valorPorParcela: number;

  constructor(){
    this.valor =0;
    this.parcelasAPagar = 0;
    this.tipoVenda="";
    this.vencimento=new Date();
  }
}
