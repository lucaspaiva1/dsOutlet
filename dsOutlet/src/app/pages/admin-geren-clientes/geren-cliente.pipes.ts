import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../../model/cliente';

@Pipe({
    name: 'filtroDeCliente'
})

export class FiltroDeCliente implements PipeTransform {

    transform(clientes: Cliente[], digitado: string) {
        digitado = digitado.toLocaleLowerCase();
        return clientes.filter(cliente => (
            cliente.nome.toLocaleLowerCase().includes(digitado) ||
            cliente.email.toLocaleLowerCase().includes(digitado)
        ));
    }
}