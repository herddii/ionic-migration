import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { UrlService } from '../../url/url.service';
@Injectable({
  providedIn: 'root'
})
export class SamconceptService {

  constructor(
  	public urlserv: UrlService,
  	public http: HttpClient,
  	public storage: Storage
	  ) { }
	  

	getRequestType(){
		return new Promise((resolve, reject) => {
			this.storage.get('token').then((value) => {
			  let headers = new HttpHeaders().set('Authorization','Bearer '+value)
			  this.http.get(this.urlserv.urlApi+'sam/concept/request_type/CONCEPT', {headers: headers})
			  .subscribe(data => {
				resolve(data);
			  }, (err) => {
				reject(err);
			  });
			})
		  });
	}

	getListProgram(page){
		return new Promise((resolve, reject) => {
			this.storage.get('token').then((value) => {
			  let headers = new HttpHeaders().set('Authorization','Bearer '+value)
			  this.http.get(this.urlserv.urlApi+'sam/concept/list_program?page='+page, {headers: headers})
			  .subscribe(data => {
				resolve(data);
			  }, (err) => {
				reject(err);
			  });
			})
		  });
	}

	getBrand(form){
		return new Promise((resolve, reject) => {
			this.storage.get('token').then((value) => {
			  let headers = new HttpHeaders().set('Authorization','Bearer '+value)
			  this.http.post(this.urlserv.urlApi+'sam/concept/list_brand',{
				  form: form
			  }, {headers: headers})
			  .subscribe(data => {
				resolve(data);
			  }, (err) => {
				reject(err);
			  });
			})
		  });
	}

	getAm(page, form){
		return new Promise((resolve, reject) => {
			this.storage.get('token').then((value) => {
			  let headers = new HttpHeaders().set('Authorization','Bearer '+value)
			  this.http.post(this.urlserv.urlApi+'sam/concept/list_am?page='+page,{
				  form: form
			  }, {headers: headers})
			  .subscribe(data => {
				resolve(data);
			  }, (err) => {
				reject(err);
			  });
			})
		  });
	}
}
