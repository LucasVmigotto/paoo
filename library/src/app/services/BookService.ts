import { Injectable } from '@angular/core'
import { Book } from '../interfaces/Book'
import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Array<Book> = []
  private bookListUpdate = new Subject<Array<Book>>()

  addBook (title, author, pages): void {
    this.books.push({
      title, author, pages
    })
    this.bookListUpdate.next([...this.books])
  }

  getBooks (): Array<Book> {
    return [...this.books]
  }

  getBooksListObservable () {
    return this.bookListUpdate.asObservable()
  }
}
