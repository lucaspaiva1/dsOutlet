import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { toast } from 'angular2-materialize';
import { Funcionario } from '../../model/funcionario';

@Component({
  selector: 'app-admin-cad-funcionario',
  templateUrl: './admin-cad-funcionario.component.html',
  styleUrls: ['./admin-cad-funcionario.component.css']
})
export class AdminCadFuncionarioComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  funcionario: Funcionario = new Funcionario();
  sobrenome: string;
  confirmacaoSenha: string;
  privilegio: string;


  constructor(private router: Router, private userService: UserService, private funcionariosService: FuncionariosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  cadastrarFuncionario() {
    if (this.funcionario.nome == null || this.funcionario.login == null || this.funcionario.senha == null || this.privilegio == null) {
      toast('Estão faltando dados!', 4000, 'rounded');
    } else {
      if (this.funcionario.senha != this.confirmacaoSenha) {
        toast('Senha não Correspondentes!', 4000, 'rounded');
      } else {
        if (this.sobrenome != null) {
          this.funcionario.nome = this.funcionario.nome + " " + this.sobrenome;
          this.funcionario.admin = this.privilegio == 'true' ? true : false;
        }
        this.funcionariosService.addFuncionario(this.funcionario);
        toast('Cadastro efetuado  !', 4000, 'rounded');
      }
    }
  }

}
