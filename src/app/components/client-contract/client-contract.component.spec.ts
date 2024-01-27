import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContractComponent } from './client-contract.component';

describe('ClientContractComponent', () => {
  let component: ClientContractComponent;
  let fixture: ComponentFixture<ClientContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
