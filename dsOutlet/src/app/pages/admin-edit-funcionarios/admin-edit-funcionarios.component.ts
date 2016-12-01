import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-admin-edit-funcionarios',
  templateUrl: './admin-edit-funcionarios.component.html',
  styleUrls: ['./admin-edit-funcionarios.component.css']
})
export class AdminEditFuncionariosComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private usuario: User = new User();
  private privilegio: string;
  private loading: boolean;

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

  private getUser(id: number): void{
    this.loading = true;
    this.userService.getUser(id).then(res=>{
      console.log(res);
      if(res == null){
        this.router.navigate(['/gerenciador']);
      }else{
        this.usuario = res;
        this.loading = false;
      }
    });
  }

  editar() {
    this.usuario.acesso = this.privilegio == 'true' ? 'A' : 'C';
    console.log(this.usuario);
    this.userService.editUser(this.usuario).then(res => {
      if (res) {
        toast('Salvo!', 4000, 'rouded');
        this.router.navigate(['/gerenciador/funcionarios']);
      } else {
        toast('Não foi possível salvar!', 4000, 'rounded');
      }

    });
  }

  excluir() {
    this.userService.deleteUser(this.usuario.id).then(res => {
      if (res) {
        toast('Excluído!', 4000, 'rouded');
        this.router.navigate(['/gerenciador/funcionarios']);
      } else {
        toast('Não foi possível excluir', 4000, 'rounded');
      }
    });
  }

}
