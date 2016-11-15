import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../model/funcionario';

@Component({
  selector: 'app-admin-geren-clientes',
  templateUrl: './admin-geren-clientes.component.html',
  styleUrls: ['./admin-geren-clientes.component.css']
})
export class AdminGerenClientesComponent implements OnInit {

    private islogado: boolean = false;
    private isAdmin: boolean = false;
    funcionario: Funcionario;

    constructor(private router: Router,
      private route: ActivatedRoute,
      private userService: UserService,
      private funcionariosService: FuncionariosService) {
      let stats = this.userService.userStats();
      this.islogado = stats[0];
      this.isAdmin = stats[1];
    }

    ngOnInit() {
      if (!this.islogado) {
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
