import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { UrlService } from '../url/url.service';
@Injectable({
  providedIn: 'root'
})
export class SaleskitService {

  constructor(

    public storage: Storage,
    public urlserv: UrlService,
  	public http: HttpClient, 

  ) { }


  getIndex(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/getIndex',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getImage(idcontent){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.post(this.urlserv.urlApi+'saleskit/getImage',{
          idProgram: idcontent
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getAllMaster(id_bu,page){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_gallery_all_tanpabu/'+id_bu+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getAllProgram(page,id_genre,id_bu){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_gallery_all_program_eloquent_tanpabu/'+id_genre+'/'+id_bu+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getRatecard(page,id_bu){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_rate_card_eloquent2_tanpabu/'+id_bu+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getSpecialOffers(page,id_bu){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_special_offers_eloquent_tanpabu/'+id_bu+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getPerformance(page,id_bu){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_performance_tanpabu/'+id_bu+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getBu(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'master/get_bu',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getGenre(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_genre_program',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getActivity(content){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.post(this.urlserv.urlApi+'saleskit/pagehitInsert',{
          content
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getVideoTypespot(id_typespot,id_benefit,page,id_bu,tvtype){
    console
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_video_typespot_tanpabu/'+id_typespot+'/'+id_benefit+'/'+id_bu+'/'+tvtype+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getTypeSpot(id_benefit,tvtype,id_bu){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_typespotbaru/'+id_benefit+'/'+tvtype,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getVideoBenefit(id_typespot,id_benefit,page,id_bu,tvtype){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_video_benefit2_tanpabu/'+id_typespot+'/'+id_benefit+'/'+id_bu+'/'+tvtype+'?page='+page,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getMenuFta(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_menu_fta',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getMenuPaytv(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'saleskit/get_menu_paytv',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

}
