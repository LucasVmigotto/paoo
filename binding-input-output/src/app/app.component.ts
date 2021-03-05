import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  people = [
    { name: 'João', age: 18 },
    { name: 'Maria', age: 22 }
  ]

  onAddPerson (person) {
    this.people.push(person)
  }
}
