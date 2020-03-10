import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class CamServiceService {

  constructor(
  	public urlserv: UrlService,
  	public http: HttpClient,
  	public storage: Storage
  	) { }

  getask(id_cam?,id_activity?){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value)
       let b = id_cam ? id_cam : null;
       let c = id_activity ? id_activity : null;
        this.http.post(this.urlserv.urlApi+'cam_activity/list-tasklist?page=1', {
          id_cam: b,
          id_activity: c
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getDetailClient(id_client_account){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'cam_activity/getprofiladvance/'+id_client_account,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getlistClientCompany(company){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.post(this.urlserv.urlApi+'cam_activity/listclientcompany',{
          agencypintu: company
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getHobby(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.get(this.urlserv.urlApi+'cam_activity/listHobby',{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  saveClient(form){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.post(this.urlserv.urlApi+'cam_activity/saveProfileAdvance',{
          form: form
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getaskLike(dateSelect){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value);
        this.http.post(this.urlserv.urlApi+'cam_activity/list-tasklist',{
          tanggal: dateSelect
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }


  getDetailTask(idactive,idcam){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.get(this.urlserv.urlApi+'cam_activity/detail-list-tasklist/'+idactive+'/'+idcam, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getpicam(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.get(this.urlserv.urlApi+'cam_activity/list-am', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getpartner(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.get(this.urlserv.urlApi+'cam_activity/list-partner', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getagency(id_am){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.post(this.urlserv.urlApi+'cam_activity/list-agencypintu',{
          id_am: id_am
        }, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }
  getadvertiser(id_am,id_agency){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.post(this.urlserv.urlApi+'cam_activity/list-advertiser',{
          id_am: id_am,
          id_agencypintu: id_agency
        }, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getaskreport(user){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders().set('Authorization','Bearer '+value)
        this.http.post(this.urlserv.urlApi+'cam_activity/list-tasklist-report', {
          user: user
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getPlafond(user){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/plafond',{
          userid: user
        }, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getBrand(id_am,id_agency,id_adv){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/list-brand',{
          id_am: id_am,
          id_agencypintu: id_agency,
          id_adv: id_adv
        }, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getClient(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/list-client', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getTypeAct(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/list-type-activity', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getReportDaily($tanggal){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/get_report_daily', {
          tanggal: $tanggal
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getReportMonthly(user){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/get_report_monthly',{
          userid: user
        } ,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getReportCount(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/jumlahReport', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getPlanCount(userid, position){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/jumlahPlan',
        {
          user: userid,
          position: position
        } ,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  accounthandling(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/accountHandling', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  checkingpeople(userid){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'master/user',{
          user: userid
        }, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getReimburse(user){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/get_reimburse', {
          userid: user
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getClientHandling(page,search?){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listClienthandling?page='+page, {
          search: search ? search : null
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getClientNotHandling(page,search?){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listNotClienthandling?page='+page, {
          search: search ? search : null
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getBirthdayClient(search?){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listBirthdayClient',{
          search: search ? search : null
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getListCompanyAgency(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listCompanyAgency', {
          tanggal: new Date()
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getListCompanyAdvertiser(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listCompanyAdvertiser', {
          tanggal: new Date()
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getListAm(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listAm', {
          tanggal: new Date()
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getUserAm(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/listAm', {
          id: 1
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getProgramName(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/list-nama-program', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getSalestools(idmfile){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/list-nama-salestools',{
          id_master_filetype: idmfile
        }, {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getSamConcept(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/list-nama-samconcept', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getSamPaket(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.urlApi+'cam_activity/list-nama-sampaket', {headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getDatafile(form){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/add-file-tasklist',{
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

  saveTask(form){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/saveTask',{
          form: form
        } ,{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getMe(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });
        this.http.get(this.urlserv.url+'auth/me?token='+value)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  refresh(){
    return new Promise((resolve, reject)=>{
      this.storage.get('token').then(value =>{
        let headers = new HttpHeaders;
        headers.append('Content-Type','application/json');
        headers.append('Authorization', 'Bearer '+value);

        this.http.post(this.urlserv.url+'auth/refresh',{e:'e'}).subscribe(data =>{
            resolve(data);
          }, (err)=>{
            reject(err);
          })
      })
    })
  }

  deleteCam(idcam){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
      let options = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${value}`
        }),
        body: {
          form: idcam
        }
      }
        this.http.delete(this.urlserv.urlApi+'cam_activity/deleteTask',options)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }
  sendMsg(form){
    return new Promise((resolve, reject)=>{
      this.storage.get('token').then(value =>{
        let headers = new HttpHeaders({
          'Authorization': `Bearer ${value}`
      });

        this.http.post(this.urlserv.url+'api/cam_activity/insertKomen',{form: form},{headers: headers}).subscribe(data =>{
            resolve(data);
          }, (err)=>{
            reject(err);
          })
      })
    })
  }

  sendEntertainment(form){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.post(this.urlserv.urlApi+'cam_activity/insertCost',{
          form: form
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  sendFile(form){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
    	});
        this.http.post(this.urlserv.urlApi+'cam_activity/insertFile',{
          form: form
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

 

  deleteCamCost(id_cam_cost, id_activity){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
      let options = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${value}`
        }),
        body: {
          id_cam_cost: id_cam_cost,
          id_activity: id_activity 
        }
      }
        this.http.delete(this.urlserv.urlApi+'cam_activity/deleteCostEntertaiment',options)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  deleteFile(form){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
      });
        this.http.post(this.urlserv.urlApi+'cam_activity/insertFile',{form: form},{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }

  getFilesImage(id){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let headers = new HttpHeaders({
      		'Authorization': `Bearer ${value}`
      });
      let form = {
        id_cam_file: id
      }
        this.http.post(this.urlserv.urlApi+'cam_activity/getFile',{
          form: form
        },{headers: headers})
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      })
    });
  }
}
