import { Injectable } from '@angular/core'
import { Client } from '../interfaces/Client'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
@Injectable({ providedIn: 'root' })
export class ClientService {
  private clients: Array<Client> = []
  private clientListUpdate = new Subject<Array<Client>>()

  constructor (private httpClient: HttpClient) {}

  addClient (name, email, phone): void {
    this.httpClient
      .post<Client>(
        'http://localhost:3001/api/clients',
        { name, email, phone }
      )
        .subscribe(data => {
          console.log(data)
          this.clients.push(data)
          this.clientListUpdate.next([...this.clients])
        })
  }

  getClients (): void {
    this.httpClient.get<Array<Client>>('http://localhost:3001/api/clients')
      .subscribe(data => {
        this.clients = data
        this.clientListUpdate.next([...this.clients])
      })
  }

  getClientsListObservable () {
    return this.clientListUpdate.asObservable()
  }
}
