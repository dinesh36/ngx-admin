/**
 * Created by dinesh on 2/10/17.
 */
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";

@Injectable()
export class UserService{
  constructor(private dataService:DataService){

  }

  getUsers(searchQuery={}){
    return this.dataService.callAPI({url:'/api/users',search:searchQuery});
  }

  createUser(body){
    return this.dataService.callAPI({
      url:'/api/users',
      method:'post',
      body:body
    });
  }

  updateUser(body){
    return this.dataService.callAPI({
      url:'/api/users/'+body.id,
      method:'put',
      body:body
    });
  }

  deleteUser(id){
    return this.dataService.callAPI({
      url:'/api/users/'+id,
      method:'delete'
    });
  }
}
