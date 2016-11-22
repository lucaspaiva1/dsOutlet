import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { toast } from 'angular2-materialize';
import { User } from '../../model/user';

@Component({
  selector: 'app-admin-cad-funcionario',
  templateUrl: './admin-cad-funcionario.component.html',
  styleUrls: ['./admin-cad-funcionario.component.css']
})
export class AdminCadFuncionarioComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  usuario: User = new User();
  sobrenome: string;
  confirmacaoSenha: string;
  privilegio: string;


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

  cadastrarUsuario() {
    if (this.usuario.nome == null || this.usuario.login == null || this.usuario.senha == null || this.privilegio == null) {
      toast('Estão faltando dados!', 4000, 'rounded');
    } else {
      if (this.usuario.senha != this.confirmacaoSenha) {
        toast('Senha não Correspondentes!', 4000, 'rounded');
      } else {
        if (this.sobrenome != null) {
          this.usuario.nome = this.usuario.nome + " " + this.sobrenome;
          this.usuario.admin = this.privilegio == 'true' ? true : false;
        }
        this.userService.addUser(this.usuario);
        this.usuario = new User();
        this.sobrenome = '';
        this.confirmacaoSenha = '';
        toast('Cadastro efetuado  !', 4000, 'rounded');
      }
    }
  }

}
