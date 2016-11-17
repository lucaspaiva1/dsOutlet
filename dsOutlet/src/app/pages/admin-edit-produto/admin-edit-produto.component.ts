import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-edit-produto',
  templateUrl: './admin-edit-produto.component.html',
  styleUrls: ['./admin-edit-produto.component.css']
})
export class AdminEditProdutoComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    if (!this.isLogado) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
    }
  }

}
