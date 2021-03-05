import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-row',
  templateUrl: './course-row.component.html',
  styleUrls: ['./course-row.component.css']
})
export class CourseRowComponent implements OnInit {

  @Input() course

  constructor() { }

  ngOnInit(): void {
  }

}
