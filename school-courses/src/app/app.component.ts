import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'school-courses';

  courseHighlight = {
    name: 'Análise e Desenvolvimento de Sistemas',
    workload: 6000
  }

  courses = [
    {
      name: 'Educação Física',
      workload: 5400
    },
    {
      name: 'Gastronomia',
      workload: 4000
    },
    {
      name: 'Direito',
      workload: 5000
    },
    {
      name: 'Medicina',
      workload: 8000
    }
  ]

}
