import { Injectable } from '@angular/core'
import { Client } from '../interfaces/Client'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ClientService {
  private clients: Array<Client> = []
  private clientListUpdate = new Subject<Array<Client>>()

  addClient (name, email, phone): void {
    this.clients.push({
      name, email, phone
    })
    this.clientListUpdate.next([...this.clients])
  }

  getClients (): Array<Client> {
    return [...this.clients]
  }

  getClientsListObservable () {
    return this.clientListUpdate.asObservable()
  }
}
