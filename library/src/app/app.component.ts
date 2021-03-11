import { Component } from '@angular/core'
import { Book } from './interfaces/Book'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library'

  books: Array<Book> = [
    {
      bookId: 1,
      title: 'The Man in the High Castle',
      author: 'Philip K Dick',
      pages: 290
    },
    {
      bookId: 2,
      title: 'Revan: Star Wars Old Republic',
      author: 'Drew Karpyshyn',
      pages: 559
    }
  ]

  onBookAdded (book) {
    this.books.push(book)
  }
}
