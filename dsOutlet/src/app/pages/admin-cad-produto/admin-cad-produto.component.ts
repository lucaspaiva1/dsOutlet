import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'admin-cad-produto',
  templateUrl: './admin-cad-produto.component.html',
  styleUrls: ['./admin-cad-produto.component.css']
})
export class AdminCadProdutoComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private usuarioId: string;

  private produto: Produto = new Produto();

  constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.usuarioId = stats[2];
  }

  ngOnInit() {
    /*se os dados indicarem que usuario não está logado, ele será redirecionado para a pagina principal*/
    if (!this.isLogado) {
      this.router.navigate(['/home']);
    }
  }

  private cadastrarProduto() {
    if (this.produto.marca == null || this.produto.modelo == null || this.produto.tamanho == null || this.produto.quantidade < 0) {
      toast('Favor Preencher os Campos Corretamente!', 4000, 'rounded');
    } else {
      this.produto.usuarioId = this.usuarioId;
      this.produtosService.newProduto(this.produto).then(res => {
        if (res) {
          console.log(res);
          toast('Produto foi cadastrado!', 4000, 'rounded');
          this.produto = new Produto();
          this.router.navigate(['/gerenciador/estoque']);
        } else {
          toast('Produto já existe no estoque', 4000, 'rounded');
        }
      });
    }
  }

}
