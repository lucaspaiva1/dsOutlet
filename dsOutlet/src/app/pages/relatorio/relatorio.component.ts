import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private inicio: Date = new Date();
  private fim: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {

    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];

  }

  filtrar(){

  }


}
