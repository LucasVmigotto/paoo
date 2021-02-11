import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'binding-components'
  name = 'John'
  age = 21
  showBox = false

  rollTheDices = () => Math.floor(Math.random() * 6) + 1

  add = (name) => {
    console.log('Adding...')
    console.log(name.value)
    this.name = name.value
    this.showBox = true

  }

  changeName = name => {
    console.log(name)
    this.name = name.target.value
  }
}
