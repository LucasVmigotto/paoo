import { Component } from '@angular/core'
import { Client } from './interfaces/Client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean'

  clients: Array<Client> = [
    {
      name: 'Mary',
      phone: '9999-9999',
      email: 'maria@email.com'
    },
    {
      name: 'John Doe',
      phone: '8888-8888',
      email: 'john@mail.com'
    }
  ]

  onClientAdded (client) {}
}
