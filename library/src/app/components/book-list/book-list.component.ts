import { Component, OnInit, Input } from '@angular/core'
import { Book } from 'src/app/interfaces/Book'

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Array<Book> = []

  constructor() { }

  ngOnInit(): void {
  }

}
