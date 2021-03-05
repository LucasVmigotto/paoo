import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Output() courseAdded = new EventEmitter()

  add (title, workload) {
    this.courseAdded.emit({
      title, workload
    })
  }

  constructor() { }

  ngOnInit(): void {
  }

}
