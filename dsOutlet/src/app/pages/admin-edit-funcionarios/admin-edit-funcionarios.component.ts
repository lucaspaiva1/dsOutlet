import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'edit-funcionarios',
  templateUrl: './admin-edit-funcionarios.component.html',
  styleUrls: ['./admin-edit-funcionarios.component.css']
})
export class AdminEditFuncionariosComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private usuario: User = new User();
  private loading: boolean;
  private confirmaSenha: string;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    } else {
      this.route.params.forEach((params: Params) => {
        let id = params['id'];
        this.getUser(id);
      })
    }
  }

  change(event) {
    console.log(event);
    this.usuario.telefone = event;
  }

  private getUser(id: number): void {
    this.loading = true;
    this.userService.getUser(id).then(res => {
      if (res == null) {
        this.router.navigate(['/gerenciador']);
      } else {
        this.usuario = res;
        this.confirmaSenha = this.usuario.senha;
        this.loading = false;
      }
    });
  }

  editar() {
    if (this.confirmaSenha != this.usuario.senha) {
      toast('Senhas incorretas!', 4000, 'rounded');

    } else {
      if (this.usuario.nome == null || this.usuario.nome == "" || this.usuario.login == null || this.usuario.senha == null || this.usuario.senha == "" || this.usuario.acesso == "" || this.usuario.email == null) {
        toast('Falta dados!', 4000, 'rounded');
      } else {
        this.userService.editUser(this.usuario).then(res => {
          toast(res.message, 4000, 'rounded');
          if (res.type === true) {
            this.router.navigate(['/gerenciador/funcionarios']);
          }
        });
      }
    }
  }

}
