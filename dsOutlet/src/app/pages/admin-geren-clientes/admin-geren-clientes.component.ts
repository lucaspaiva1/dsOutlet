import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-admin-geren-clientes',
  templateUrl: './admin-geren-clientes.component.html',
  styleUrls: ['./admin-geren-clientes.component.css']
})
export class AdminGerenClientesComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private clientes: Cliente[];
  private loading: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private clientesService: ClientesService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
      this.getClientes();
    }
  }

  private getClientes() {
    this.loading = true;
    this.clientesService.getClientes().then(res => {
      this.clientes = res;
      this.loading = false;
    });

  }

  cadastrar() {
    this.router.navigate(['gerenciador/clientes/cadastro']);
  }

  editar(cliente: Cliente) {
    this.router.navigate(['gerenciador/clientes/editar/', cliente.nome]);
  }

}
