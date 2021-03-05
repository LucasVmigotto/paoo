import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @Output() personAdded = new EventEmitter()

  people = [
    { name: 'Maria', age: 18 },
    { name: 'Jose', age: 22 }
  ]

  add (name, age) {
    this.personAdded.emit({
      name, age
    })
  }

  constructor() { }

  ngOnInit(): void {
  }

}
