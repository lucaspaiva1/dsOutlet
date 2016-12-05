import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private user: User = new User();
  private confirmaSenha: string = "";


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {

    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.user = this.userService.myProfile();
    this.confirmaSenha = this.user.senha;
  }

  salvar() {

  }


}
