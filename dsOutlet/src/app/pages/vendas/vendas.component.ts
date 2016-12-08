import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { toast } from 'angular2-materialize';
import { UserService } from '../../services/user.service';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../model/produto';
import { LinhaDeItem } from '../../model/linhaDeitem';
import { MaterializeAction } from 'angular2-materialize';
import { Cliente } from '../../model/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Endereco } from '../../model/endereco';
import { Divida } from '../../model/divida';
import { VendaService } from '../../services/venda.service';



@Component({
    selector: 'app-vendas',
    templateUrl: './vendas.component.html',
    styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

    private isLogado: boolean = false;
    private loading: boolean = true;
    private isAdmin: boolean = false;
    private produtos: Produto[] = [];
    private itens: Produto[] = [];
    valorTotal: number = 0;
    private search: string = "";
    private itemSelecionado: Produto = new Produto();
    private: string[] = [];
    private compra: LinhaDeItem[] = [];
    private quantidade: number = 0;
    private permitirCompra: boolean = false;
    modalActions = new EventEmitter<string | MaterializeAction>();
    private desconto: string = "R$";
    private valorFinal: number = 0;
    private quantidadeDesconto: number = 0;
    private modoPagamento: string = "";
    private searchCliente: string = "";
    private clientes: Cliente[];
    private clienteComprador: Cliente = new Cliente();
    private cliente: Cliente = new Cliente();
    private endereco: Endereco = new Endereco();
    private divida:Divida= new Divida();
    private idUser: number=0;




    constructor(private router: Router, private userService: UserService, private produtosService: ProdutosService, private clientesService: ClientesService, private vendaService: VendaService) {
        this.modalActions.emit({ action: "modal", params: ['close'] });
        let stats = this.userService.userStats();
        this.isLogado = stats[0];
        this.isAdmin = stats[1];
        this.idUser = stats[2];

    }

    ngOnInit() {
        /*se os dados indicarem que usuario não está logado, ele será redirecionado para a pagina principal*/
        if (!this.isLogado) {
            this.router.navigate(['/home']);
        } else {
            this.getEstoque();
        }
    }

    private getEstoque() {
        this.produtosService.getProdutos().then(res => {
            this.produtos = res;
        });
    }

    private adicionarItem() {
        toast('Produto adicionado!', 2000, 'rounded');
        let compraAtual = new LinhaDeItem();
        compraAtual.modelo = this.itemSelecionado.modelo;
        compraAtual.marca = this.itemSelecionado.marca;
        compraAtual.quantidade = this.quantidade;
        compraAtual.tamanho = this.itemSelecionado.tamanho;
        compraAtual.valorUnidade = this.itemSelecionado.precoSaidaPadrao;
        compraAtual.valor = (+compraAtual.valorUnidade) * (+compraAtual.quantidade);
        this.compra.push(compraAtual);
        this.valorTotal = this.valorTotal + (+compraAtual.valor);
        this.itemSelecionado = new Produto();
        this.quantidade = 0;
        this.permitirCompra = false;
    }

    limpar() {
        this.search = "";
    }

    limparCliente() {
        this.searchCliente = "";
    }

    seleciona(produto) {
        this.itemSelecionado = produto;
        this.itemSelecionado.id = produto.id;
        this.quantidade = 0;
        this.permitirCompra = false;
    }

    verifica() {
        if ((+this.quantidade) <= (+this.itemSelecionado.quantidade) && (+this.quantidade) > 0) {
            this.permitirCompra = true;
        } else {
            this.permitirCompra = false;
        }

    }

    removerProduto(item) {
        let index = this.compra.indexOf(item);
        this.compra.splice(index, 1);
        this.valorTotal = this.valorTotal - (+item.valor);
    }

    valorAPagar() {
        this.valorFinal = this.valorTotal;
        if (this.desconto == "R$") {
            this.valorFinal = (+this.valorFinal) - (+this.quantidadeDesconto);
        } else {
            this.valorFinal = (+this.valorFinal) - (+this.valorFinal) * (+this.quantidadeDesconto) / 100;
        }
        this.getClientes();
    }
    tipoAPagar(valor) {
        this.desconto = valor;
        this.valorAPagar();
    }

    private getClientes() {
        this.loading = true;
        this.clientesService.getClientes().then(res => {
            this.clientes = res;
            this.loading = false;
        });

    }

    selecionarCliente(cliente) {
        this.clienteComprador = cliente;
    }

    adicionarCliente() {
        if (this.cliente.nome == null || this.cliente.cpf == null || this.cliente.telefone == null || this.endereco.cidade == null || this.endereco.uf == null || this.endereco.logradouro == null) {
            toast('Faltam Informações!', 4000, 'rounded');
        } else {
            this.cliente.endereco = this.endereco;
            this.clientesService.addCliente(this.cliente).then(res => {
                if (res) {
                    toast('Cliente foi cadastrado!', 4000, 'rounded');
                    this.cliente = new Cliente();
                    this.endereco = new Endereco();
                    this.getClientes();
                } else {
                    toast('Cliente já cadastrado', 4000, 'rounded');
                }
            });
        }
        this.valorAPagar()
    }

    concluirCompra(){
        this.vendaService.concluirCompra(this.clienteComprador.id,this.idUser , this.compra, this.divida);
    }
}
