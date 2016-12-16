import { LinhaDeItem } from './linhaDeItem';

export class Impressao{


  tipoPagamento: string;
  idUsuario: number;
  data: Date = new Date();
  desconto: number;
  total: number;
  idVenda: string;
  subtotal: number;
  linhaDeItem: LinhaDeItem[];
  parcelas: number;

  constructor(){

  }

}
