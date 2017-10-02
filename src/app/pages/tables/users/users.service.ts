/**
 * Created by dinesh on 2/10/17.
 */
import {Injectable} from "@angular/core";
import {DataService} from "../../../@core/data/data.service";

@Injectable()
export class UserService{
  constructor(private dataService:DataService){

  }

  getUsers(){
    return this.dataService.callAPI({url:'/api/users'});
  }

  createUser(data){
    return this.dataService.callAPI({
      url:'/api/users',
      method:'post',
      data:data
    });
  }

  updateUser(id,data){
    return this.dataService.callAPI({
      url:'/api/users/'+id,
      method:'put',
      data:data
    });
  }

  deleteUser(id){
    return this.dataService.callAPI({
      url:'/api/users/'+id,
      method:'delete'
    });
  }
}
