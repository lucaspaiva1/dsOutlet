import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'gerenciador',
  templateUrl: './gerenciador.component.html',
  styleUrls: ['./gerenciador.component.css']
})
export class GerenciadorComponent implements OnInit {

  private isLogado: boolean;
  private isAdmin: boolean;

  constructor(private router: Router, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if(!this.isLogado){
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

}
