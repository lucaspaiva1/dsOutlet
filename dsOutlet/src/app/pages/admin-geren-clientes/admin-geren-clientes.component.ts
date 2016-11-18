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
  clientes: Cliente[];

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
      this.clientes = this.clientesService.getClientes();
    }
  }

  cadastrar() {
    this.router.navigate(['/clientes/cadastro']);
  }

  editar(cliente: Cliente){
      this.router.navigate(['clientes/editar/', cliente.nome]);
  }

}
