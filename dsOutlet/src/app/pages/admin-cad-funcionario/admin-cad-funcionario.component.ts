import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { toast } from 'angular2-materialize';
import { User } from '../../model/user';

@Component({
  selector: 'cad-funcionario',
  templateUrl: './admin-cad-funcionario.component.html',
  styleUrls: ['./admin-cad-funcionario.component.css']
})
export class AdminCadFuncionarioComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  private usuario: User = new User();
  private confirmacaoSenha: string;

  constructor(private router: Router, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  change(event){
    console.log(event);
    this.usuario.telefone=event;
  }

  cadastrarUsuario() {
    console.log(this.usuario);
    if (this.usuario.nome == null || this.usuario.nome == "" || this.usuario.login == null || this.usuario.senha == null || this.usuario.senha == "" || this.usuario.acesso == "" || this.usuario.email== null) {
      toast('Estão faltando dados!', 4000, 'rounded');
    } else {
      if (this.usuario.senha != this.confirmacaoSenha) {
        toast('Senha não correspondem!', 4000, 'rounded');
      } else {
        this.userService.addUser(this.usuario)
        .then(retorno=>{
          if(retorno.type == 3){
            this.usuario = new User();
            this.confirmacaoSenha = '';
            this.router.navigate(['/gerenciador/funcionarios']);
          }
          toast(retorno.message, 4000, 'rounded');
        });
      }
    }
  }

}
