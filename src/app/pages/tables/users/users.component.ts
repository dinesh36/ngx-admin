import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import {UserService} from "./users.service";

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,private userService:UserService) {
    this.getData();
  }

  getData(){
    this.userService.getUsers()
      .subscribe((users)=>this.source.load(users))
  }

  deleteUser(event){
    if (window.confirm('Are you sure you want to delete?')) {
      this.userService.deleteUser(event.data.id)
        .subscribe(()=>{
          event.confirm.resolve();
          this.getData();
        })
    } else {
      event.confirm.reject();
    }
  }

  createUser(event){
    debugger;
    this.userService.createUser(event.data)
      .subscribe(()=>{
        event.confirm.resolve();
        this.getData();
      },()=>{
        event.confirm.reject();
      })
  }
}
