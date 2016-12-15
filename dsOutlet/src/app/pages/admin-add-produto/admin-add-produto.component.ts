import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-admin-add-produto',
  templateUrl: './admin-add-produto.component.html',
  styleUrls: ['./admin-add-produto.component.css']
})
export class AdminAddProdutoComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private usuarioId: string;

  private search: string = "";
  private filtrados: Produto[] = [];
  private produto: Produto = new Produto();
  private quantidade: number = 0;
  private precoCompra: number = 0;


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private produtoService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.usuarioId = stats[2];
    console.log(this.usuarioId);
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado para homePage
    } else {
      this.route.params.forEach((params: Params) => {
        let id = params['id'];
        this.getProduto(id);
      })
    }
  }

  private getProduto(id: number): void {
    this.produtoService.getProduto(id).then(res => {
      if (res == null) {
        this.router.navigate(['/gerenciador']);
      } else {
        this.produto = res;
        this.precoCompra = this.produto.precoEntrada;
      }
    });
  }

  /*adiciona a quantidade ao produto no banco de dados*/
  private adicionar(): void {
    this.produto.usuarioId = this.usuarioId;
    if (this.quantidade > 0) {
      this.produto.quantidade = this.quantidade;
      this.produto.precoUltimaCompra = this.precoCompra;
      if (this.precoCompra != this.produto.precoEntrada) {
        this.produtoService.newProduto(this.produto).then(res=>{
          if(res){
            this.router.navigate(['/gerenciador/estoque']);
            toast('Produto foi Cadastrado!', 4000, 'rounded');
          }else{
            toast('Ocorreu um erro!', 4000, 'rounded');
          }
        });

      } else {
        console.log(this.produto);
        this.produtoService.addProduto(this.produto).then(res => {
          if (res) {
            toast('Produto foi modificado!', 4000, 'rounded');
            this.router.navigate(['/gerenciador/estoque']);
          } else {
            toast('Ocorreu um erro!', 4000, 'rounded');
          }
        });
      }

    } else {
      toast('Quantidade Inválida!', 4000, 'rounded');
    }
  }

}
