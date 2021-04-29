import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientInsertComponent } from './components/client-insert/client-insert.component'
import { ClientListComponent } from './components/client-list/client-list.component'

const routes: Routes = [
  {
    path: '',
    component: ClientListComponent
  },
  {
    path: 'create',
    component: ClientInsertComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{

}
