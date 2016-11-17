import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../model/funcionario';

@Component({
  selector: 'app-admin-edit-clientes',
  templateUrl: './admin-edit-clientes.component.html',
  styleUrls: ['./admin-edit-clientes.component.css']
})
export class AdminEditClientesComponent implements OnInit {

    private isLogado: boolean = false;
    private isAdmin: boolean = false;
    funcionario: Funcionario;

    constructor(private router: Router,
      private route: ActivatedRoute,
      private userService: UserService,
      private funcionariosService: FuncionariosService) {
      let stats = this.userService.userStats();
      this.isLogado = stats[0];
      this.isAdmin = stats[1];
    }

    ngOnInit() {
      if (!this.isLogado) {
        this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
      } else {
        this.route.params.forEach((params: Params) => {
          let username = ""+params['username'];
          this.funcionario = this.funcionariosService.getFuncionario(username);
          console.log(this.funcionario);
          })
      }
    }

  }
