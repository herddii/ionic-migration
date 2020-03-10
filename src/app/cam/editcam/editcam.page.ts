import { CamServiceService } from '../../service/cam/cam-service.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, ToastController, ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ActivatedRoute, Router } from '@angular/router';
import { File, DirectoryEntry, FileEntry  } from '@ionic-native/file/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { UniquePipe } from 'ngx-pipes';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-editcam',
  templateUrl: './editcam.page.html',
  styleUrls: ['./editcam.page.scss'],
})
export class EditcamPage implements OnInit {
  
  idactive: any;
  setdis: boolean;
  id_cam: any;
  detail = [];
  dataImage = [];
  segmentChoose: string = 'Details';
  goplan: boolean = true;
  location: any;

  username: string;
  activity: string;
  // end type activity

  subject: string;
  desc: string;
  potency: any;
  activityType: any;
  typeAct = [];
  //start date and time
  dateStart: any;
  timeStart: any;
  getMonthStart: any;

  //end date and time
  dateEnd: any;
  timeEnd: any;
  getMonthEnd: any;

  //picam
  ports = [];
  picam: any;

  //partner
  partners = [];
  partner = [];

  //agency
  agencys = [];
  agency: any;

  //advertiser
  advertisers = [];
  advertiser: any;

  //brand
  brands = [];
  brand: any;
  variant: string;

  //client
  clients = [];
  client = [];
  
  //loading
  loadView: boolean = true;

  constructor(
    public routing: Router,
    private route: ActivatedRoute,
    public cam: CamServiceService,
    public unique: UniquePipe,
    public toast: ToastController,
    private camera: Camera, 
    private file: File, 
    private http: HttpClient, 
    public platform: Platform,
    private webview: WebView,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private storage: Storage, 
    private plt: Platform, 
    private loadingController: LoadingController,
    private filePath: FilePath,
    public ref: ChangeDetectorRef,
    private imageResizer: ImageResizer,
  ) {

    this.detail = [];
    this.route.params.subscribe(params => {
      this.idactive = params['id_acti'];
      this.id_cam = params['id_cam'];
      // console.log(params);
    this.getDetailTask(params['id_acti'], params['id_cam']);
    });
   }

  ngOnInit() {
    
  }

  getDetailTask(idactive, idcam) {

    this.typeAct = [];
    this.ports = [];
    // this.partners = [];
    this.agencys = [];
    this.clients = [];

    this.cam.getDetailTask(idactive, idcam).then((data) => {
      console.log(data);
      this.detail = this.detail.concat(data);
    }).then(flow => {
      this.username = this.detail[0].insert_user;
      this.subject = this.detail[0].cam_activity[0].subject;
      this.desc = this.detail[0].cam_activity[0].description;
      this.potency = this.detail[0].cam_activity[0].potency_revenue;
      this.location = this.detail[0].cam_activity[0].location;

      let editDate_start = new Date(this.detail[0].start_date);
      let editDate_end = new Date(this.detail[0].end_date);
      this.dateStart = `${editDate_start.getFullYear()} ${editDate_start.toLocaleString('default', { month: 'short' })},${this.addZero(editDate_start.getDate())}`;
      this.timeStart = `${this.addZero(editDate_start.getHours())}:${this.addZero(editDate_start.getMinutes())}`;
      this.dateEnd = `${editDate_end.getFullYear()} ${editDate_end.toLocaleString('default', { month: 'short' })},${this.addZero(editDate_end.getDate())}`;
      this.timeEnd = `${this.addZero(editDate_end.getHours())}:${this.addZero(editDate_end.getMinutes())}`;

      this.getMonthStart = this.addZero(editDate_start.getMonth());
      this.getMonthEnd = this.addZero(editDate_end.getMonth());
    }).then(second => {
      this.cam.getTypeAct().then((act) => {
        this.typeAct = this.typeAct.concat(act);
        let setValue = this.typeAct.filter(x => {
          return x.id === this.detail[0]['id_cam_typeactivity'];
        });
        this.activityType = setValue[0];
      })
      

      this.cam.getpicam().then((list) => {
        this.ports = this.ports.concat(list);
        let setpicam = this.ports.filter(gfgf => {
          return gfgf.values === this.detail[0].id_am;
        })
        this.picam = setpicam[0];
      })
      this.cam.getpartner().then((partner) => {
        this.partners = this.partners.concat(partner);
        let detcam = this.detail[0].cam_partner;
        let valPart = detcam.map(u => { return u.user_id; });
        let setPartner = this.partners.filter(k => {
          return valPart.includes(k.id);
        });
        console.log({1: detcam, 2:valPart, 3:setPartner, 4:this.partners});
        this.partner = setPartner;
      })
      // console.log(this.detail);

      this.cam.getagency(this.detail[0]['id_am']).then((agency) => {
        this.agencys = this.agencys.concat(agency);
        let setAgen = this.agencys.filter(ii => {
          return ii.id = this.detail[0]['id_agcy'];
        })
        this.agency = setAgen[0];
        

      }).then(()=>{
        this.cam.getadvertiser(this.detail[0]['id_am'], this.detail[0]['id_agcy']).then((advertiser) => {
          this.advertisers = this.advertisers.concat(advertiser);
          let setAdv = this.advertisers.filter(gg => {
            return gg.id = this.detail[0]['id_adv'];
          })
          this.advertiser = setAdv[0];
          console.log({hasilfilter: this.advertiser,data: this.advertisers,filteran: setAdv,idnya: this.detail[0]['id_adv']});
        })
      }).then(()=>{
        this.cam.getBrand(this.detail[0]['id_am'], this.detail[0]['id_agcy'], this.detail[0]['id_adv']).then(setb => {
          this.brands = this.brands.concat(setb);
          let setBrand = this.brands.filter(ff => {
            return ff.id = this.detail[0].id_brand;
          })
          // console.log({1: this.brands,2: setb});
          this.brand = setBrand[0];
          // this.variant = setBrand[0]['text'];
          if(setBrand[0].text !== 'NEW BRAND'){
            this.variant = setBrand[0]['text'];
            this.setdis = true;
          } else {
            this.variant = '';
            this.setdis = false;
          }
        });
      }).then(()=>{
        this.cam.getClient().then((client) => {
          this.clients = this.clients.concat(client);
          console.log({1: client, 2: this.clients});
          let setClient = this.detail[0].cam_client;
          let valClient = setClient.map(u => { return u.name_userclient_account.id_client_account; });
          let setClientName = this.clients.filter(kh => {
            return valClient.includes(kh.id_client_account);
          });
          console.log(setClientName);
          this.client = setClientName;
        })
        // this.titleEntertainment = this.titleEntertainment.concat()
      })
      })   
    setTimeout(()=>{
      this.loadView = false;
    },2000);
  }

  segmentChanged(ev){
    this.segmentChoose = ev.detail.value;
  }


  getTypeAct(){
    this.typeAct = [];
    this.cam.getTypeAct().then((act)=>{
      this.typeAct = this.typeAct.concat(act);
    })
  }

  getpicam(){
    this.ports = [];
    this.cam.getpicam().then((list)=>{
      this.ports = this.ports.concat(list);
    })
  }

  getAgency(value){
    this.agencys = [];
    this.cam.getagency(value).then((agency)=>{
      this.agencys = this.agencys.concat(agency);
    })
}

changeVal(ev){
  this.goplan = ev.detail.checked;
}
addEvent(){
  // this.startUpload(this.images);
  if(this.goplan){
    this.activity = 'REPORT';
  } else {
    this.activity = 'PLAN';
  }
  if(!this.activity || !this.subject || !this.desc ||
    !this.potency ||
    !this.brand ||
    !this.agency ||
    !this.advertiser ||
    !this.client ||
    !this.variant ||
    !this.partner ||
    !this.picam ||
    !this.dateStart ||
    !this.dateEnd ||
    !this.activityType){
      this.presentToast('Please Insert field correctly !');
    } else { 
      

      let Date_simpan = new Date(this.dateStart);
      let getYearSimpan = Date_simpan.getFullYear();
      let getMonthSimpan = Date_simpan.getMonth();
      let getDateSimpan = Date_simpan.getDate();
      
      let simpanDateFormat = `${getYearSimpan}-${this.addZero(getMonthSimpan+1)}-${this.addZero(getDateSimpan)}`;
      console.log(simpanDateFormat);
      // let tanggalEnd = this.dateEnd
      let form = {
        activity: this.activity,
        subject: this.subject,
        desc: this.desc,
        potency: this.potency,
        brand: this.brand.id,
        agencypintu: this.agency.id,
        advertiser: this.advertiser.id,
        client: this.client,
        variant: this.variant,
        partner: this.partner,
        picam: this.picam.values,
        location: this.location,
        startdate: `${simpanDateFormat} ${this.timeStart}`,
        enddate: `${simpanDateFormat} ${this.timeEnd}`,
        type_act: this.activityType.id,
        id_cam: this.id_cam,
      }
      console.log(form)
      // this.presentLoadingText();
      this.cam.saveTask(form).then((saving)=>{
        // this.loadingController.dismiss();
      this.presentToast('Success Stored the Data !');
      this.routing.navigateByUrl('transaction')

      })
  }
}

async presentLoadingText() {
  let loading = await this.loadingController.create({
    spinner: null,
    message: 'Please wait...',
    translucent: true,
    cssClass: 'custom-class custom-loading'
  });
  return await loading.present();
}

actChange(event:{
    component: IonicSelectableComponent,
    value: any
  }){
    console.log(this.activity)
    // this.activity = event.value.id
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('picam:', event.value);
  }

  agencyChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.advertisers = [];
    this.getAdvertiser(this.picam.values,event.value.id);
  }

  getAdvertiser(id_am,id_agency){
    this.advertisers = [];
    this.cam.getadvertiser(id_am,id_agency).then((advertiser)=>{
      this.advertisers = this.advertisers.concat(advertiser);
    })
  }

  advertiserChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.brands = [];
    this.getBrand(this.picam.values,this.agency.id,event.value.id);
  }

  getBrand(id_am,id_agency,id_adv){
    this.brands = [];
    this.cam.getBrand(id_am,id_agency,id_adv).then((brand)=>{
      this.brands = this.brands.concat(brand);
    })
  }

  brandChange(event: {
    component: IonicSelectableComponent,
    value: any
  }){
    if(event.value.text !== 'NEW BRAND'){
      this.variant = event.value.text
    }
  }

  clientChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log(event.value);
  }
  
  picamChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.agencys = [];
    this.getAgency(event.value.id);
  }

  getpartner(){
    this.partners = [];
    this.cam.getpartner().then((partner)=>{
      this.partners = this.partners.concat(partner);
    })
  }

  getClient(){
    this.clients = [];
    this.cam.getClient().then((client)=>{
      this.clients = this.clients.concat(client);
    })
  }

  timeChanged_start(ev){
    let y = ev.detail.value;
    // console.log(y);
    this.timeStart = y;
  }

  timeChanged_end(ev){
    let y = ev.detail.value;
    this.timeEnd = y;
  }

  dateChanged_start(ev){
    let y = ev.detail.value;
    let spliting_y = y.split('T');
    this.dateStart = spliting_y[0];
    console.log(this.dateStart);
  }

  dateChanged_end(ev){
    let y = ev.detail.value;
    let spliting_y = y.split('T');
    this.dateStart = spliting_y[0];
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


async presentToast(text) {
  const toastw = await this.toast.create({
    message: text,
    duration: 2000
  });
  toastw.present();
}
}
