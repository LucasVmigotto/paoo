import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Book } from 'src/app/interfaces/Book'
import { BookService } from '../../services/BookService'

@Component({
  selector: 'book-insert',
  templateUrl: './book-insert.component.html',
  styleUrls: ['./book-insert.component.css']
})
export class BookInsertComponent implements OnInit {

  private mode: string = 'create'
  private bookId: string
  public book: Book

  constructor(
    public bookService: BookService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('bookId')){
          this.mode = 'edit'
          this.bookId = paramMap.get('bookId')
          this.bookService.getBook(this.bookId)
            .subscribe(book => {
              this.book = { ...book }
            })
        } else {
          this.mode = 'create'
          this.bookId = null
        }
      }
    )
  }

  onSubmit (book: NgForm) {
    if (book.invalid) {
      return
    }
    if (this.mode === 'create') {
      this.bookService.addBook(
        book.value.title,
        book.value.author,
        book.value.pages
      )
    } else {
      this.bookService.updateBook(
        this.bookId,
        book.value.title,
        book.value.author,
        book.value.pages
      )
    }
    book.resetForm()
  }

}
