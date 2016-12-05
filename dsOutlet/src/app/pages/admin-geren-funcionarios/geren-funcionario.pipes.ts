import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../model/user';

@Pipe({
    name: 'filtroDeFuncionarios'
})

export class FiltroDeFuncionarios implements PipeTransform {

    transform(usuarios: User[], digitado: string) {
        digitado = digitado.toLocaleLowerCase();
        return usuarios.filter(usuario => (
            usuario.nome.toLocaleLowerCase().includes(digitado) ||
            usuario.email.toLocaleLowerCase().includes(digitado) ||
            usuario.login.toLocaleLowerCase().includes(digitado)  
        ));
    }
}