import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { Book } from '../../interfaces/Book'

@Component({
  selector: 'book-insert',
  templateUrl: './book-insert.component.html',
  styleUrls: ['./book-insert.component.css']
})
export class BookInsertComponent implements OnInit {

  book: Book = {
    title: '',
    author: '',
    pages: null
  }

  @Output() bookAdded = new EventEmitter<Book>()

  constructor() { }

  ngOnInit(): void {
  }

  addBook () {
    this.bookAdded.emit(this.book)
    this.book = {
      title: '',
      author: '',
      pages: null
    }
  }

}
