import { Injectable } from '@angular/core';
import {Client} from '../models/client.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: Client[] = [];

  constructor() { }

  addClient(client: Client) {
    this.clients.push(client);
    console.log('clients after add:', this.clients);
  }

  getClients(): Observable<Client[]> {
    return of(this.clients);
  }
}
