import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

      private isLogado: boolean = false;
      private isAdmin: boolean = false;

      private vendaFinalizada: boolean;
      marcas: string[] = ['marca1', 'marca2', 'marca3'];
      modelos: string[] = ['modelo1', 'modelo2', 'modelo3'];

      produtos: any[] = [{nome: 'teste', preco: 20}, {nome: 'teste', preco: 20}, {nome: 'teste', preco: 20}, {nome: 'teste', preco: 20}];
      valorTotal: number = 0;

      constructor(private router: Router, private userService: UserService) {
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

      private adicionarItem(){
        toast('Produto adicionado!', 2000, 'rounded');
        for (let item of this.produtos) {
          console.log(item); // 1, "string", false
          this.valorTotal = this.valorTotal + item.preco;
        }
      }

      private finalizar(){
        this.vendaFinalizada = true;
      }

    }
