import { Component, OnInit, Input } from '@angular/core'
import { Client } from 'src/app/interfaces/Client'

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @Input() clients: Array<Client> = []

  constructor() { }

  ngOnInit(): void {
  }

}
