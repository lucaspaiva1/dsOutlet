import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-admin-geren-funcionarios',
  templateUrl: './admin-geren-funcionarios.component.html',
  styleUrls: ['./admin-geren-funcionarios.component.css']
})
export class AdminGerenFuncionariosComponent implements OnInit {

  private isLogado: boolean;
  private isAdmin: boolean;
  private loading: boolean;
  private usuarios: User[];
  private search:string = "";
  private erro = false;

  constructor(private router: Router, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getUsers()
      .then(users => {
        if(users === false){
          this.erro=true;
        }else{
          this.usuarios = users;
        }
        this.loading = false;

      });
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']); //se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

  editar(usuario: User) {
    this.router.navigate(['gerenciador/edit-funcionario/', usuario.id]);
  }

  limpar(){
    this.search = "";
  }

}
