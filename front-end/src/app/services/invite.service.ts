import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  acceptInvite(invite){
    return this.http.post('http://localhost:3000/api/transfer/acceptInvite',{invite})
  }
  rejectInvite(inviteToId){
    return this.http.delete('http://localhost:3000/api/delete/invite/'+inviteToId);
  }
  constructor(private http: HttpClient) { }
}
