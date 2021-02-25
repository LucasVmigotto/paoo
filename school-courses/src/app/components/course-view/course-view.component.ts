import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  @Input() courses: []

  constructor() { }

  ngOnInit(): void {
  }

}
