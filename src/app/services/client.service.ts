import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * this service provides methods to update and retrieve the client data
 */
export class ClientService {
  private clients: Client[] = [];

  constructor() {}

  /**
   * add client data to the list of clients
   */
  addClient(client: Client): void {
    this.clients.push(client);
  }

  /**
   * returns the list of clients as an observable
   */
  getClients$(): Observable<Client[]> {
    return of(this.clients);
  }
}
