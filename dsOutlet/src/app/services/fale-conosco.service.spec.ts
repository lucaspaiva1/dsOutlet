/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaleConoscoService } from './fale-conosco.service';

describe('Service: FaleConosco', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaleConoscoService]
    });
  });

  it('should ...', inject([FaleConoscoService], (service: FaleConoscoService) => {
    expect(service).toBeTruthy();
  }));
});
