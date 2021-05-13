import {
  Component,
  OnInit
} from '@angular/core'
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Client } from 'src/app/interfaces/Client'
import { ClientService } from 'src/app/services/ClientService'
import { mimeTypeValidator } from './mime-type.validator'

@Component({
  selector: 'client-insert',
  templateUrl: './client-insert.component.html',
})
export class ClientInsertComponent implements OnInit {

  public form: FormGroup
  private mode: string = 'create'
  private clientId: string
  public client: Client
  public isLoading: boolean = false
  public previewImage: string

  constructor(
    public clientService: ClientService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    })
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.isLoading = true
        if (paramMap.has('clientId')){
          this.mode = 'edit'
          this.clientId = paramMap.get('clientId')
          this.clientService.getClient(this.clientId)
            .subscribe(client => {
              this.client = { ...client }
              this.form.setValue({
                name: this.client.name,
                phone: this.client.phone,
                email: this.client.email,
                imageURL: null
              })
            })
        } else {
          this.mode = 'create'
          this.clientId = null
        }
        this.isLoading = false
      }
    )
  }

  onSubmit () {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true
    if (this.mode === 'edit') {
      this.clientService.updateClient(
        this.clientId,
        this.form.value.name,
        this.form.value.email,
        this.form.value.phone
      )
    } else {
      console.log({ ...this.form.value })
      this.clientService.addClient(
        this.form.value.name,
        this.form.value.email,
        this.form.value.phone,
        this.form.value.image
      )
    }
    this.isLoading = false
    this.form.reset()
  }

  onImageSelected (event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ image: file })
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.previewImage = reader.result as string
    }
    reader.readAsDataURL(file)
  }

}
