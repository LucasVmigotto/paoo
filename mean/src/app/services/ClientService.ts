import { Injectable } from '@angular/core'
import { Client } from '../interfaces/Client'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
@Injectable({ providedIn: 'root' })
export class ClientService {
  private clients: Array<Client> = []
  private clientListUpdate = new Subject<Array<Client>>()

  constructor (private httpClient: HttpClient, private router: Router) {}

  addClient (name, email, phone, image: File): void {
    const form = new FormData()
    form.append('name', name)
    form.append('email', email)
    form.append('phone', phone)
    form.append('image', image)
    this.httpClient
      .post<Client>(
        'http://localhost:3001/api/clients',
        form
      )
        .subscribe(data => {
          const client: Client = {
            clientId: data.clientId,
            name,
            email,
            phone,
            imageURL: data.imageURL
          }
          this.clients.push(client)
          this.clientListUpdate.next([...this.clients])
          this.router.navigate(['/'])
        })
  }

  updateClient (clientId: String, name: String, phone: String, email: String) {
    this.httpClient
      .put(`http://localhost:3001/api/clients/${clientId}`, {
        clientId, name, phone, email, imageURL: null
      })
      .subscribe(res => {
        const copy = [...this.clients]
        copy[copy.findIndex(el => el.clientId === clientId)] = {
          clientId, name, phone, email, imageURL: null
        }
        this.clients = [...copy]
        this.clientListUpdate.next([...this.clients])
        this.router.navigate(['/'])
      })
  }

  getClient (clientId: String) {
    return this.httpClient
      .get<Client>(`http://localhost:3001/api/clients/${clientId}`)
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

  removeClient (clientId) {
    this.httpClient
      .delete(`http://localhost:3001/api/clients/${clientId}`)
      .subscribe(() => {
        this.clients = this.clients
          .filter(el => el.clientId !== clientId)
        this.clientListUpdate.next([...this.clients])
      })
  }
}
