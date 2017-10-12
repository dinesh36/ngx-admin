import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import {UsersComponent} from "./users/users.component";
import {UserService} from "./users/users.service";
import {DataService} from "./data.service";

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [{
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[UserService,DataService]
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  UsersComponent
];
