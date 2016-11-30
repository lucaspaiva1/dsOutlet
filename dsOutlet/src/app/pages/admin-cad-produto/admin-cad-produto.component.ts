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

  produto: Produto = new Produto();

  constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
  }

  ngOnInit() {
    /*se os dados indicarem que usuario não está logado, ele será redirecionado para a pagina principal*/
    if (!this.isLogado) {
      this.router.navigate(['/home']);
    }
  }

  cadastrarProduto() {
    if (this.produto.marca == null || this.produto.modelo == null || this.produto.tamanho == null) {
      toast('Favor Preencher Campos Obrigatórios!', 4000, 'rounded');
    } else {
      if (this.produto.quantidade >= 0) {
        this.produtosService.newProduto(this.produto).then(res => {
          if (res) {
            console.log(res);
            toast('Produto foi cadastrado!', 4000, 'rounded');
            this.produto = new Produto();
          } else {
            toast('Produto já existe no estoque', 4000, 'rounded');
          }
        });
      }else{
        toast('Quantidade Inválida', 4000, 'rounded');
      }
    }
  }

}
