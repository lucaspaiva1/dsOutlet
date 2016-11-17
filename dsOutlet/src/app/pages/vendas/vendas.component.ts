import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Produto } from '../../model/produto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

      private isLogado: boolean = false;
      private isAdmin: boolean = false;

      vendaFinalizada: boolean = true;
      marcas: string[] = ['marca1', 'marca2', 'marca3'];
      modelos: string[] = ['modelo1', 'modelo2', 'modelo3'];

      constructor(private router: Router, private userService: UserService) {
        let stats = this.userService.userStats();
        this.isLogado = stats[0];
        this.isAdmin = stats[1];
      }

      ngOnInit() {
        /*se os dados indicarem que usuario não está logado, ele será redirecionado para a pagina principal*/
        if (!this.isLogado) {
          this.router.navigate(['/home']);
        } else {
        }
      }

    }
