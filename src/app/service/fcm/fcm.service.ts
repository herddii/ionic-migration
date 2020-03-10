import { ToastController } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  token;
  apikey = 'AAAAtbHYX38:APA91bEhWwV3ftDcC_e-HrqroZLf3GmHGmPt6kwG5AbCzaGM0qjEWaLNgadyzb4JIaBgJ7jElGiOYNEja2-GoRUpBWhzj2HrZlKvH9vAgp4dXnKTxMukGNotkCqlFUYgWRcCRCQulFoa';

  constructor(

    public toastController: ToastController,
    public fcm: FCM,
    public http: HttpClient,
    public storage: Storage,
    public urlserv: UrlService

  ) {
    
   }

  async toast(message){
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'dismiss'
    })
    toast.present();
  }

  sendCamActivity(toUser, dataSend){
    // return toUser;
    // let toWho = [];
    return new Promise((resolve, reject) => {
      
      toUser.forEach(b => {
        let headers = new HttpHeaders().set('Authorization','key='+this.apikey);
        this.http.post('https://fcm.googleapis.com/fcm/send', {
          to:'/topics/getMessage_'+JSON.stringify(b),
          data: dataSend[0]
        },{headers: headers}).subscribe(data=>{
          resolve(data);
        },(err)=>{
          reject(err)
        });
      })
      
      // toWho.concat(toUser[0].user_am.ID_USER);
      // toWho.concat(toUser[0].user_sgm.ID_USER);
      // toWho.concat(toUser[0].user_sm.ID_USER);
      // toWho.concat(toUser[0].user_sm.ID_USER);
      // // toWho.concat(toUser[0].user_gm.ID_USER);
      // toUser[0]['cam_partner'].forEach(b=>{
      //   toWho.concat(b.ID_USER);
      // })
    });
    // return new Promise((resolve, reject) => {
    //   this.storage.get('token').then((value) => {
    //     toUser.forEach(b => {
    //       let toUnit = {
    //         to: b,
    //         data: {

    //         }
    //       }
    //     })
    //     let headers = new HttpHeaders().set('Authorization','key='+this.apikey)
    //   //   let headers = new HttpHeaders({
    //   // 		'Authorization': `Bearer ${boken}`
    // 	// });
    //     this.http.post(this.urlserv.urlApi+'cam_activity/list-tasklist', {
    //       status: 'add'
    //     },{headers: headers})
    //     .subscribe(data => {
    //       resolve(data);
    //     }, (err) => {
    //       reject(err);
    //     });
    //   })
    // });
  }

  refreshToken(){
    this.fcm.onTokenRefresh().subscribe(token => {
      return token;
    });
  }
}
