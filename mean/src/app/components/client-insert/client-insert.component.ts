import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { Client } from '../../interfaces/Client'

@Component({
  selector: 'client-insert',
  templateUrl: './client-insert.component.html',
})
export class ClientInsertComponent implements OnInit {

  client: Client

  @Output() clientAdded = new EventEmitter<Client>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddClient () {
    this.clientAdded.emit(this.client)
  }

}
