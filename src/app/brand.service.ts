import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
	url = 'http://10.22.253.64:8010/api/'

  constructor(
  	private http: Http,
  	private storage: Storage
  	) { 

  }

  get_brand(){
  	return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.get(this.url+'get_brand_portal',{headers: headers}).pipe(
        map(res => res.json()))
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        }); 
      }) 
    });
  }

  get_program(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.get(this.url+'get_program_portal',{headers: headers}).pipe(
        map(res => res.json()))
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        }); 
      }) 
    });
  }

  get_brand_campaign(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.get(this.url+'get_brand_campaign',{headers: headers}).pipe(
        map(res => res.json()))
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        }); 
      }) 
    });
  }

  get_consumer_insight(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.get(this.url+'get_consumer_insight',{headers: headers}).pipe(
        map(res => res.json()))
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        }); 
      }) 
    });
  }

  get_social_media(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.get(this.url+'get_social_media',{headers: headers}).pipe(
        map(res => res.json()))
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        }); 
      }) 
    });
  }

}
