import { Injectable } from '@angular/core'
import { Book } from '../interfaces/Book'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Array<Book> = []
  private bookListUpdate = new Subject<Array<Book>>()

  constructor (private httpBook: HttpClient, private router: Router) {}

  addBook (title, author, pages): void {
    this.httpBook
      .post<Book>(
        'http://localhost:3001/api/books',
        { title, author, pages }
      )
        .subscribe(data => {
          this.books.push(data),
          this.bookListUpdate.next([...this.books])
          this.router.navigate(['/'])
        })
  }

  updateBook (bookId: String, title: String, author: String, pages: Number) {
    this.httpBook
      .put(`http://localhost:3001/api/books/${bookId}`, {
        bookId, title, author, pages
      })
      .subscribe(res => {
        const copy = [...this.books]
        copy[copy.findIndex(el => el.bookId === bookId)] = {
          bookId, title, author, pages
        }
        this.books = [...copy]
        this.bookListUpdate.next([...this.books])
        this.router.navigate(['/'])
      })
  }

  getBook (bookId: String) {
    return this.httpBook
      .get<Book>(`http://localhost:3001/api/books/${bookId}`)
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

  removeBook (bookId) {
    this.httpBook
      .delete(`http://localhost:3001/api/books/${bookId}`)
      .subscribe(() => {
        this.books = this.books
          .filter(el => el.bookId !== bookId)
        this.bookListUpdate.next([...this.books])
      })
  }
}
