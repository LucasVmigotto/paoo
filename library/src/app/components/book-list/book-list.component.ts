import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Book } from '../../interfaces/Book'
import { BookService } from '../../services/BookService'
import { Subscription, Observable } from 'rxjs'

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Array<Book> = []
  private booksSubscription: Subscription

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks()
    this.booksSubscription = this.bookService
      .getBooksListObservable()
      .subscribe((books: Array<Book>) => {
        this.books = books
      })
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe()
  }

}
