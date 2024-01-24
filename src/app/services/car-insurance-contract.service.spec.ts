import { TestBed } from '@angular/core/testing';

import { CarInsuranceContractService } from './car-insurance-contract.service';

describe('CarInsuranceContractService', () => {
  let service: CarInsuranceContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarInsuranceContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
