import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';

describe('ClientInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientService = TestBed.get(ClientService);
    expect(service).toBeTruthy();
  });

  // TODO: ensure getClients$ method exists
  // TODO: ensure getClients$ method returns an observable
  // TODO: ensure getClients$ method is callable

  // TODO: ensure addClient method exists
  // TODO: ensure addClient method is callable
});
