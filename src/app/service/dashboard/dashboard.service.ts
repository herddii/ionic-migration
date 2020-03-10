import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { UrlService } from '../url/url.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(

    public storage: Storage,
    public urlserv: UrlService,
  	public http: HttpClient,

  ) { }


  getDetailArticle(slug,id_kategori){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'dashboard/get-detail-article/'+slug+'/'+id_kategori,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getIndexBerita(page,idkategori){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'dashboard/getIndex/'+idkategori+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getKategori(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'dashboard/getkategori',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getFoto(idportal){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'dashboard/getfoto/'+idportal,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }
}
