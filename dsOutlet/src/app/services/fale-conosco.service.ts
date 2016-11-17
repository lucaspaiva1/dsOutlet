import { Injectable } from '@angular/core';
import { Mensagem } from '../model/mensagem';

@Injectable()
export class FaleConoscoService {

  constructor() {
  }

  enviarMensagem(mensagem: Mensagem){
    console.log(`enviando mensagem: ${mensagem.assunto} de ${mensagem.nome}`);
  }

}
