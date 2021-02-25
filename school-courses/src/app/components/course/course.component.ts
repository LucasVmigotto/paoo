import { Component, Input, OnInit } from '@angular/core';

interface Course {

  name?: String

  workload?: Number

}

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() name: String

  @Input() workload: String

  constructor() { }

  ngOnInit(): void {
  }

}
