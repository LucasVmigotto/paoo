import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { ClientService } from 'src/app/services/ClientService'

@Component({
  selector: 'client-insert',
  templateUrl: './client-insert.component.html',
})
export class ClientInsertComponent implements OnInit {

  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
  }

  onAddClient (client: NgForm) {
    if (client.form.invalid) {
      return
    }
    this.clientService.addClient(
      client.value.name,
      client.value.email,
      client.value.phone,
    )
    client.resetForm()
  }

}
