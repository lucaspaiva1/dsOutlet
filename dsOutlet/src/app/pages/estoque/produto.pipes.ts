import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../../model/produto';

@Pipe({
    name: 'filtroDeMercadoria'
})

export class FiltroDeMercadoria implements PipeTransform {

    transform(produtos: Produto[], digitado: string) {
        digitado = digitado.toLocaleLowerCase();
        return produtos.filter(produto => (
            produto.marca.toLocaleLowerCase().includes(digitado) ||
            produto.modelo.toLocaleLowerCase().includes(digitado) ||
            produto.tamanho.toLocaleLowerCase().includes(digitado)
        ));
    }
}