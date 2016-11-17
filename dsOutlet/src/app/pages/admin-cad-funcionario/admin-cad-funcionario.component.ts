import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-admin-cad-funcionario',
  templateUrl: './admin-cad-funcionario.component.html',
  styleUrls: ['./admin-cad-funcionario.component.css']
})
export class AdminCadFuncionarioComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService, private funcionariosService: FuncionariosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  salvar(){
    toast('Produto foi cadastrado!', 4000, 'rouded');
  }

}
