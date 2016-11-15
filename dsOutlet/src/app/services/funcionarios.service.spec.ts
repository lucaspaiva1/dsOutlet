/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FuncionariosService } from './funcionarios.service';

describe('Service: Funcionarios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionariosService]
    });
  });

  it('should ...', inject([FuncionariosService], (service: FuncionariosService) => {
    expect(service).toBeTruthy();
  }));
});
