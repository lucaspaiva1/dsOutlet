import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'edit-produto',
  templateUrl: './admin-edit-produto.component.html',
  styleUrls: ['./admin-edit-produto.component.css']
})
export class AdminEditProdutoComponent implements OnInit {

  private isLogado: boolean = false;
  private isAdmin: boolean = false;
  private produto: Produto = new Produto();
  private marca: string = "";
  private modelo: string = "";
  private userId: number;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private produtoService: ProdutosService) {
    let stats = this.userService.userStats();
    this.isLogado = stats[0];
    this.isAdmin = stats[1];
    this.userId = stats[2];
  }

  ngOnInit() {
    if (!this.isLogado || !this.isAdmin) {
      this.router.navigate(['/home']);//se os dados indicarem que usuario nao está logado, ele será redirecionado
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
        this.marca = this.produto.marca;
        this.modelo = this.produto.modelo;
      }
    });
  }

  private excluir() {
    this.produtoService.delProduto(this.produto.id, this.userId).then(res=>{
      if(res){
        toast('Produto foi Deletado!', 4000, 'rounded');
        this.router.navigate(['/gerenciador/estoque']);
      }else{
        toast('Ocorreu um erro!', 4000, 'rounded');
      }
    });

  }

  private salvar() {
    this.produtoService.editProduto(this.produto).then(res=>{
      if(res){
        toast('Produto foi Editado!', 4000, 'rounded');
        this.router.navigate(['/gerenciador/estoque']);
      }else{
        toast('Ocorreu um erro!', 4000, 'rounded');
      }
    });
  }

}
