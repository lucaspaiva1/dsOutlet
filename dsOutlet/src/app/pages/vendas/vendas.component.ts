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
    valorTotal: string = "0";
    valorDivida: string = "0";
    valorTotalConta: number = 0;
    private search: string = "";
    private itemSelecionado: Produto = new Produto();
    private compra: LinhaDeItem[] = [];
    private quantidade: number = 0;
    private permitirCompra: boolean = false;
    modalActions = new EventEmitter<string | MaterializeAction>();
    private desconto: string = "R$";
    private quantidadeDesconto: number = 0;
    private searchCliente: string = "";
    private clientes: Cliente[];
    private clienteComprador: Cliente = new Cliente();
    private cliente: Cliente = new Cliente();
    private endereco: Endereco = new Endereco();
    private divida: Divida = new Divida();
    private idUser: number = 0;




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
        compraAtual.idProduto = this.itemSelecionado.id;
        compraAtual.valor = (+compraAtual.valorUnidade) * (+compraAtual.quantidade);
        compraAtual.atualizar();
        this.compra.push(compraAtual);
        this.valorTotalConta = this.valorTotalConta + (+compraAtual.valor);
        for (let i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].id == compraAtual.idProduto)
                this.produtos[i].quantidade = (+this.produtos[i].quantidade) - (+this.quantidade);
        }
        this.itemSelecionado = new Produto();
        this.quantidade = 0;
        this.permitirCompra = false;

        this.valorTotal = this.valorTotalConta.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    limpar() {
        this.search = "";
        console.log(this.detectar_mobile());
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

    detectar_mobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    removerProduto(item) {
        console.log(item);
        let index = this.compra.indexOf(item);
        this.compra.splice(index, 1);
        this.valorTotalConta = this.valorTotalConta - (+item.valor);
        for (let i = 0; i < this.produtos.length; i++) {
            if (this.produtos[i].id == item.idProduto)
                this.produtos[i].quantidade = (+this.produtos[i].quantidade) + (+item.quantidade);
        }
        this.valorTotal = this.valorTotalConta.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    }

    valorAPagar() {
        this.divida.valor = this.valorTotalConta;
        if (this.desconto == "R$") {
            this.divida.valor = (+this.divida.valor) - (+this.quantidadeDesconto);
        } else {
            this.divida.valor = (+this.divida.valor) - (+this.divida.valor) * (+this.quantidadeDesconto) / 100;
        }
        this.divida.atualizar();
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
        console.log(this.clienteComprador.id);
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

    podeConcluir(): boolean {
        let data = new Date();
        if (this.divida.tipoVenda != "") {
            if (this.divida.tipoVenda == "4") {
                if (this.clienteComprador.nome == "" || this.divida.valorPorParcela < 1 || this.divida.vencimento == null) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    concluirCompra() {
        this.vendaService.concluirCompra(this.clienteComprador.id, this.idUser, this.compra, this.divida).then(res => {
            if (res) {
                toast('Compra efetuada com sucesso', 4000, 'rounded');
                this.router.navigate(['/gerenciador/venda']);

            } else {
                toast('Compra não Cadastrado', 4000, 'rounded');
            }
        });
        this.inicializar();
    }

    inicializar() {
        this.isLogado = false;
        this.loading = true;
        this.isAdmin = false;
        this.produtos = [];
        this.itens = [];
        this.valorTotal = "0";
        this.valorDivida = "0";
        this.valorTotalConta = 0;
        this.search = "";
        this.itemSelecionado = new Produto();
        this.compra = [];
        this.quantidade = 0;
        this.permitirCompra = false;
        this.desconto = "R$";
        this.quantidadeDesconto = 0;
        this.searchCliente = "";
        this.clientes = [];
        this.clienteComprador = new Cliente();
        this.cliente = new Cliente();
        this.endereco = new Endereco();
        this.divida = new Divida();
        this.idUser = 0;
        this.getEstoque();
    }
}
