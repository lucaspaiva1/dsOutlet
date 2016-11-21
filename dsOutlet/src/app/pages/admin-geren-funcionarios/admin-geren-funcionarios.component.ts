import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../model/funcionario';


@Component({
  selector: 'app-admin-geren-funcionarios',
  templateUrl: './admin-geren-funcionarios.component.html',
  styleUrls: ['./admin-geren-funcionarios.component.css']
})
export class AdminGerenFuncionariosComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  funcionarios: Funcionario[];

  constructor(private router: Router, private userService: UserService, private funcionarioService: FuncionariosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    console.log(this.isAdmin);
    this.funcionarios = this.funcionarioService.getFuncionarios();
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  editar(funcionario: Funcionario){
    this.router.navigate(['edit-funcionario/', funcionario.login]);
  }

}
