import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../model/cliente';
import { Divida } from '../../model/divida';
import { Endereco } from '../../model/endereco';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'edit-clientes',
  templateUrl: './admin-edit-clientes.component.html',
  styleUrls: ['./admin-edit-clientes.component.css']
})
export class AdminEditClientesComponent implements OnInit {

  private isLogado: boolean;
  private isAdmin: boolean;
  private cliente: Cliente = new Cliente();
  private dividas: Divida[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private clientesService: ClientesService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.cliente.endereco = new Endereco();
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
      this.route.params.forEach((params: Params) => {
        let id = params['id'];
        this.clientesService.getCliente(id).then(res => {
          if (res) {
            this.cliente = res[0];
            this.cliente.endereco = res[1];
            this.dividas = res[2];
            this.initValorRecebido();
          } else {
            this.router.navigate(['/gerenciador']);
          }
        });
      })
    }
  }

  initValorRecebido() {
    this.dividas.forEach(element => {
      element.valorRecebido = 0;
    });
  }

  change(event) {
    this.cliente.telefone = event;
  }

  changeCPF(event) {
    this.cliente.cpf = event;
  }

  changeCEP(event) {
    this.cliente.endereco.cep = event;
  }

  private deletar() {
    this.clientesService.deleteCliente(this.cliente.id).then(res => {
      if (res) {
        toast('Excluido!', 4000, 'rounded');
        this.router.navigate(['/gerenciador/clientes']);
      } else {
        toast('Ocorreu um erro!', 4000, 'rounded');
      }
    });
  }

  private editar() {
    if (this.cliente.nome == null || this.cliente.cpf == null || this.cliente.telefone == null || this.cliente.endereco.cidade == null || this.cliente.endereco.uf == null || this.cliente.endereco.logradouro == null) {
      toast('Faltam Informações!', 4000, 'rounded');
    } else {
      this.clientesService.editCliente(this.cliente).then(res => {
        if (res) {
          toast('Editado com sucesso!', 4000, 'rounded');
          this.router.navigate(['/gerenciador/clientes']);
        } else {
          toast('Ocorreu um erro', 4000, 'rounded');
        }
      });
    }
  }

  private pagamento(divida) {
    this.clientesService.pagamentoPendencia(divida).then(res => {
      let index = this.dividas.indexOf(divida);
      this.dividas[index] = res;
      this.dividas[index].valorRecebido = 0;
    });
  }

}
