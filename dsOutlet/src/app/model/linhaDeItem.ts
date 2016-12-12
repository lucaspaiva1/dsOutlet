export class LinhaDeItem{

  valor: number;
  valorExibido: string;
  valorUnidade: number;
  quantidade: number;
  marca:string;
  modelo:string;
  tamanho:string;
  idProduto:number;

  constructor(){
    this.valor = 0;
    this.valorUnidade = 0;
    this.quantidade = 0;
    this.marca = "";
    this.valorExibido = "0";
    this.modelo = "";
    this.tamanho = "";
    this.idProduto = 0;
  }

   atualizar() {
    this.valorExibido = this.valor.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

  }
}
