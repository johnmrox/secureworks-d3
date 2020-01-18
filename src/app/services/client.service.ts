import { Injectable } from '@angular/core';
import {Client} from '../models/client.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/** this service provides methods to update the client data */
export class ClientService {
  private clients: Client[] = [];

  constructor() { }

  /** TODO: add documentation */
  addClient(client: Client) {
    this.clients.push(client);
    console.log('clients after add:', this.clients);
  }

  /** TODO: add documentation */
  getClients(): Observable<Client[]> {
    return of(this.clients);
  }
}
