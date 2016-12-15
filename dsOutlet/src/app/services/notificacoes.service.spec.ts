/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificacoesService } from './notificacoes.service';

describe('Service: Notificacoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacoesService]
    });
  });

  it('should ...', inject([NotificacoesService], (service: NotificacoesService) => {
    expect(service).toBeTruthy();
  }));
});
