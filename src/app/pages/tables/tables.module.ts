import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import {TablePagingComponent} from "./table-paging.component";
import {DataService} from "./data.service";
import {UserService} from "./users/users.service";

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    TablePagingComponent
  ],
  providers: [
    SmartTableService,
    UserService,
    DataService
  ],
})
export class TablesModule { }
