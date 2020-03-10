import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { UrlService } from '../url/url.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(

    public http: HttpClient,
    public storage: Storage,
    public url: UrlService

  ) { }

  redirect(val){
    return new Promise((resolve, reject) =>{
      this.http.post(this.url.url+'auth/login',val).subscribe(data =>{
          resolve(data);
       // this.storage.set('token',data['access_token']);
        }, (err)=>{
          reject(err);
        })
    })
  }

  checking_me(){
    return new Promise((resolve, reject)=>{
      this.storage.get('token').then((value)=>{
        console.log(value);
        this.http.get(this.url.url+'auth/me?token='+value).pipe(
          map(res=>res)).subscribe(data =>{
            resolve(data);
          }, (err)=>{
            reject(err);
          })
      })
    })
  }

  refresh(){
    return new Promise((resolve, reject)=>{
      this.storage.get('token').then(value =>{
        let headers = new HttpHeaders;
        headers.append('Content-Type','application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.post(this.url.url+'auth/refresh',{e:'e'}).pipe(
          map(res=>res)).subscribe(data =>{
            resolve(data);
          }, (err)=>{
            reject(err);
          })
      })
    })
  }
}
