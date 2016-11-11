export class Produto{
  private marca:string;
  private modelo:string;
  private tamanho:number;
  private quantidade:number;
  private max:number;
  private min:number;
  private estado:string;

  constructor(){

  }

  public getmarca(){
    return this.marca;
  }

}
