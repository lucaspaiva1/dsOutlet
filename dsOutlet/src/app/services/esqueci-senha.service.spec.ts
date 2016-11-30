/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EsqueciSenhaService } from './esqueci-senha.service';

describe('Service: EsqueciSenha', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsqueciSenhaService]
    });
  });

  it('should ...', inject([EsqueciSenhaService], (service: EsqueciSenhaService) => {
    expect(service).toBeTruthy();
  }));
});
