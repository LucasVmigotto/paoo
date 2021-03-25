import { Injectable } from '@angular/core'
import { Book } from '../interfaces/Book'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Array<Book> = []
  private bookListUpdate = new Subject<Array<Book>>()

  constructor (private httpBook: HttpClient) {}

  addBook (title, author, pages): void {
    this.httpBook
      .post<Book>(
        'http://localhost:3001/api/books',
        { title, author, pages }
      )
        .subscribe(data => {
          this.books.push(data),
          this.bookListUpdate.next([...this.books])
        })
  }

  getBooks (): void {
    this.httpBook.get<Array<Book>>('http://localhost:3001/api/books')
      .subscribe(data => {
        this.books = data
        this.bookListUpdate.next([...this.books])
      })
  }

  getBooksListObservable () {
    return this.bookListUpdate.asObservable()
  }
}
