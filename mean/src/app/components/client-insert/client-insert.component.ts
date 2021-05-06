import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Client } from 'src/app/interfaces/Client'
import { ClientService } from 'src/app/services/ClientService'

@Component({
  selector: 'client-insert',
  templateUrl: './client-insert.component.html',
})
export class ClientInsertComponent implements OnInit {

  private mode: string = 'create'
  private clientId: string
  public client: Client

  constructor(
    public clientService: ClientService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('clientId')){
          this.mode = 'edit'
          this.clientId = paramMap.get('clientId')
          this.clientService.getClient(this.clientId)
            .subscribe(client => {
              this.client = { ...client }
            })
        } else {
          this.mode = 'create'
          this.clientId = null
        }
      }
    )
  }

  onSubmit (client: NgForm) {
    if (client.form.invalid) {
      return
    }
    if (this.mode === 'edit') {
      this.clientService.updateClient(
        this.clientId,
        client.value.name,
        client.value.email,
        client.value.phone
      )
    } else {
      this.clientService.addClient(
        client.value.name,
        client.value.email,
        client.value.phone
      )
    }
    client.resetForm()
  }

}
