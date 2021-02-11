import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hello-angular-cli',
  templateUrl: './hello-angular-cli.component.html',
  styleUrls: ['./hello-angular-cli.component.css']
})

export class HelloAngularCliComponent implements OnInit {
  framework = 'Angular'

  constructor() { }

  ngOnInit(): void {
  }

}
