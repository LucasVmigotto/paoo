import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  courses = [
    { title: 'Análise de Sistemas', workload: 6400 },
    { title: 'Banco de Dados', workload: 5000 },
  ]

  onAddCourse (course) {
    this.courses.push(course)
  }

}
