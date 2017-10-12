import {Component, OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import {UserService} from "./users.service";
import {Observable, Subject} from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersComponent implements OnInit{
  private filterTerms = [];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      userName: {
        title: 'User Name',
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
  searchQuery:any = {};
  source: LocalDataSource = new LocalDataSource();
  pendingRequest:any;

  constructor(private service: SmartTableService,private userService:UserService) {
    this.getData();
    console.log('changed3');
  }

  ngOnInit(){
    setTimeout(()=>{
      let index = 0;
      for (let key in this.settings.columns){
        let i = index;
        this.filterTerms.push(new Subject<string>());
        Observable.fromEvent(document.getElementsByTagName('input-filter')[index], 'keyup')
          .subscribe((data:any)=>{
            this.filterTerms[i].next(data.target.value);
          });
        this.filterTerms[i]
          .debounceTime(300) //wait for 300 for next call
          .distinctUntilChanged() // do not call if data is unchanged
          .subscribe(term => {
            if(!term){
              delete this.searchQuery[key]; //remove the search from query string
            } else {
              this.searchQuery[key] = term; //add term in search string
            }
            this.getData();
          });
        index++;
      }
    },2000);
  }

  filterData(){

  }

  getData(){
    if(this.pendingRequest){
      this.pendingRequest.unsubscribe();
      this.pendingRequest = false;
    }
    this.pendingRequest = this.userService.getUsers(this.searchQuery)
      .subscribe((users)=>{
        this.source.load(users.rows);
        this.pendingRequest = false;
      });
  }

  deleteUser(event){
    if (window.confirm('Are you sure you want to delete?')) {
      this.userService.deleteUser(event.data.id)
        .subscribe(()=>{
          event.confirm.resolve();
          this.getData();
        },()=>{
          alert('Error in deleting the user.');
          event.confirm.reject()
        })
    } else {
      event.confirm.reject();
    }
  }

  createUser(event){
    this.userService.createUser(event.newData)
      .subscribe(()=>{
        event.confirm.resolve();
        this.getData();
      },()=>{
        alert('Error in creating the user.');
        event.confirm.reject();
      })
  }

  updateUser(event){
    this.userService.updateUser(event.newData)
      .subscribe(()=>{
        event.confirm.resolve();
        this.getData();
      },()=>{
        alert('Error in updating the user.');
        event.confirm.reject();
      })
  }
}
