import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-world-cli',
  templateUrl: './hello-world-cli.component.html',
  styleUrls: ['./hello-world-cli.component.css']
})

export class HelloWorldCliComponent implements OnInit {
  framework = 'Angular'

  constructor() { }

  ngOnInit(): void {}

}
