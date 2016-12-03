import { Component, Input } from '@angular/core';

import { toast } from 'angular2-materialize';

import { UserService } from '../../services/user.service';
import { FaleConoscoService } from '../../services/fale-conosco.service';
import { Mensagem } from '../../model/mensagem';


@Component({
  selector: 'fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css'],
  providers: [FaleConoscoService]
})
export class FaleConoscoComponent {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  mensagem = new Mensagem();

  constructor(private userService: UserService, private faleConoscoService: FaleConoscoService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  enviarMensagem(){
    if(this.mensagem.texto == null ||
      this.mensagem.email == null ||
      this.mensagem.nome == null ||
      this.mensagem.assunto == null ||
      this.mensagem.telefone == null){
        toast('Preencha os campos!', 4000, 'rounded');
      
    }else{
      this.faleConoscoService.enviarMensagem(this.mensagem);
      toast('Sua mensagem foi enviada!', 4000, 'rounded');
    }

  }

}
