import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { BookService } from '../../services/BookService'

@Component({
  selector: 'book-insert',
  templateUrl: './book-insert.component.html',
  styleUrls: ['./book-insert.component.css']
})
export class BookInsertComponent implements OnInit {

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
  }

  addBook (book: NgForm) {
    if (book.invalid) {
      return
    }
    this.bookService.addBook(
      book.value.title,
      book.value.author,
      book.value.pages
    )
    book.resetForm()
  }

}
