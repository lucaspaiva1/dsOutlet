export class Divida{
  id:number;
  valor: number;
  parcelasAPagar: number;
  tipoVenda:string;
  vencimento: Date;
  dataCompra: Date;
  valorPorParcela: number;
  valorRecedido: number;


  constructor(){
    this.valor =0;
    this.parcelasAPagar = 1;
    this.tipoVenda="";
    this.valorRecedido =0;
  }
}
