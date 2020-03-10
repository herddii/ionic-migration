import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, ToastController, ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { AwalanPage } from '../../awalan/awalan.page';
import { UniquePipe } from 'ngx-pipes';
import { FiletaskmodalPage } from '../filetaskmodal/filetaskmodal.page';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, DirectoryEntry, FileEntry  } from '@ionic-native/file/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FcmService } from '../../service/fcm/fcm.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';


@Component({
  selector: 'app-addcam',
  templateUrl: './addcam.page.html',
  styleUrls: ['./addcam.page.scss'],
})
export class AddcamPage implements OnInit {

	segmentChoose: string = 'Details';
  username: string;
  
  //disabler
  disableAgency: boolean = true;
  disableAdv: boolean = true;
  disableBrand: boolean = true;
  disableVariant: boolean = false;

  ports = [];
  partners = [];
  agencys = [];
  advertisers = [];
  brands = [];
  clients = [];
  typeActs = [];
  counting: number = 1;
  typeModule: any;

  activity: any;
  picam: any;
  partner: any;
  agency: any;
  advertiser: any;
  brand: any;
  variant: any;
  client: any;
  subject: any;
  desc: any;
  potency: any;
  typeact: any;
  startdate: any;
  startTime: any;
  enddate: any;
  endTime: any;
  module: any;
  programName: any;
  progModel: any;
  modultype: any;
  location: any;

  progName = [];
  hargaEntertainment=[];
  descEntertainment=[];
  partnerEntertainment=[];
  titleEntertainment=[];
  fileEntertainment=[];
  progList = [];
  selectedfile = [];
  dataImage = [];
  activ = [{
    id: 'plan',
    text: 'Planning'
  },
  {
    id: 'report',
    text: 'Report'
  }];

  datePickerObj: any = {};
  selectedStartDate;
  selectedEndDate;
  formData = new FormData();
  slidesOpts = {
    slidesPerView: 2
  }

  images = [];
  titletypereport = 'Planning';
  minDate = new Date().toISOString();
  id_program_periode: number;
  selectfile:boolean=true;
  constructor(

    public modalCtrl: ModalController,
    public camServ: CamServiceService,
    public unique: UniquePipe,
    public toast: ToastController,
    private camera: Camera, 
    private file: File, 
    public fcm: FCM,
    private webview: WebView,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private storage: Storage, 
    private loadingController: LoadingController,
    private filePath: FilePath,
    public platform: Platform,
    public ref: ChangeDetectorRef,
    public base64: Base64,
    private imageResizer: ImageResizer,
    public route: Router,
    public statusbar: StatusBar,
    public locate: Location,
    public fcmServ: FcmService

  ) {
    this.getpicam();
    this.getpartner();
    this.getClient();
    this.getTypeAct();
    this.camServ.getMe().then((me)=>{
      this.username = me['data']['NAME'];
    })
    console.log(this.startdate);
  }

  ngOnInit() {
    this.statusbar.backgroundColorByHexString('#fff');
    this.selectedfile = [];
    // this.datablob = [];
    this.dataImage = [];
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD hh:mm:ss',
      // momentLocale: 'de',
    };
  }

//   eventHandler(ev) {
//     // console.log(this.hargaEntertainment.toLocaleString("EN-IN"));// this.hargaEntertainment = this.hargaEntertainment);
//     // this.hargaEntertainment = this.hargaEntertainment.toLocaleString();
// }

  thousandSeparator(ev){
    console.log(ev);
  }

  async presentToast(text) {
  const toastw = await this.toast.create({
    message: text,
    duration: 2000
  });
  toastw.present();
}

  addRow(){
    this.counting++;
  }

  gotosaleskit(){
    this.route.navigateByUrl('transaction');
    this.statusbar.backgroundColorByHexString('#485fed');
  }

  deleteRow(){
    if(this.counting > 1){
      this.counting--;
      console.log(this.counting)
      this.images = [];
      console.log(this.images)
    }
  }

  getpicam(){
    this.camServ.getpicam().then((list)=>{
      this.ports = this.ports.concat(list);
      // this.getAgency(list.id);
    })
  }

  async readImage(){
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
              text: 'Load from Library',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
          },
          {
              text: 'Use Camera',
              handler: () => {
                  this.takePicture(this.camera.PictureSourceType.CAMERA);
              }
          },
          {
              text: 'Cancel',
              role: 'cancel'
          }
      ]
  });
  await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    }

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
      } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
  });

}

createFileName() {
  var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
  return newFileName;
}

readFiles(file: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
      // const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      console.log(reader.result);
      this.dataImage = this.dataImage.concat(reader.result);
      this.formData.append('file', imgBlob, file.name);
      // this.uploadData(formData);
  };
  reader.readAsDataURL(file);
}

loadStoredImages() {
  this.storage.get('images').then(images => {
    if (images) {
      let arr = JSON.parse(images);
      this.images = [];
      for (let img of arr) {
        let filePath = this.file.dataDirectory + img;
        let resPath = this.pathForImage(filePath);
        this.images = this.images.concat({ name: img, path: resPath, filePath: filePath });
        // this.images.push({ name: img, path: resPath, filePath: filePath });
      }
    }
  });
}

pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    let converted = this.webview.convertFileSrc(img);
    return converted;
  }
}

async testToast(text) {
  const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
  });
  toast.present();
}

copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
  }, error => {
      this.testToast('Error while storing file.');
  });
}

updateStoredImages(name) {

  
  this.storage.get('images').then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
          let newImages = [name];
          this.storage.set(images, JSON.stringify(newImages));
      } else {
          arr.push(name);
          this.storage.set(images, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
          name: name,
          path: resPath,
          filePath: filePath
      };

      this.images = this.images.concat(newEntry);
      this.images.forEach(a => {
        let options = {
          uri: a.filePath,
          folderName: 'forcam',
          quality: 72,
          width: 1280,
          height: 1280
         } as ImageResizerOptions;
         
         this.imageResizer
           .resize(options)
           .then((filePath: string) =>{
            this.file.resolveLocalFilesystemUrl(filePath)
            .then(entry => {
                ( < FileEntry > entry).file(file => this.readFiles(file))
            })
            .catch(err => {
                this.presentToast('error');
           })
           .catch(e => console.log(e));
        
      });
      })
      console.log(this.images)
      this.ref.detectChanges(); // trigger change detection cycle
  });
}




deleteImage(imgEntry, position) {
  this.images.splice(position, 1);

  this.storage.get('images').then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set('images', JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
          this.testToast('File removed.');
      });
  });
}

  getpartner(){
    this.camServ.getpartner().then((partner)=>{
      this.partners = this.partners.concat(partner);
    })
  }

  getAgency(value){
      this.camServ.getagency(value).then((agency)=>{
        this.agencys = this.agencys.concat(agency);
        // console.log(agency);
      })
  }

  getAdvertiser(id_am,id_agency){
    this.camServ.getadvertiser(id_am,id_agency).then((advertiser)=>{
      this.advertisers = this.advertisers.concat(advertiser);
    })
  }

  getBrand(id_am,id_agency,id_adv){
    this.camServ.getBrand(id_am,id_agency,id_adv).then((brand)=>{
      this.brands = this.brands.concat(brand);
    })
  }

  getTypeAct(){
    this.camServ.getTypeAct().then((act)=>{
      this.typeActs = this.typeActs.concat(act);
    })
  }

  getClient(){
    this.camServ.getClient().then((client)=>{
      this.clients = this.clients.concat(client);
    })
  }

  picamChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    
    this.disableAgency = false;
    this.agencys = [];
    this.getAgency(event.value.values);
  }

  getmodule(ev){
    this.progName = [];
    let val = ev.target.value;
    if(val==='slskt_prog'){
      this.camServ.getProgramName().then((progName)=>{
        this.progName = this.progName.concat(progName);
        this.typeModule = 'SALESKIT_P'
      })
    } else if(val==='slskt_rate'){
      this.camServ.getSalestools(1).then((rateCard)=>{
        let rateArr = [];
        rateArr = rateArr.concat(rateCard);
        rateArr.forEach((x)=>{
          this.progName = this.progName.concat({id_program_periode: x.id_salestools, program_name: x.title});
          this.typeModule = 'SALESKIT_R';
        })
        // console.log(this.progName);
        // this.progName = this.progName.concat(rateCard);
      })
    } else if(val==='slskt_spc'){
      this.camServ.getSalestools(2).then((spc)=>{
        let spcArr = [];
        spcArr = spcArr.concat(spc);
        spcArr.forEach((x)=>{
          this.progName = this.progName.concat({id_program_periode: x.id_salestools, program_name: x.title});
          this.typeModule = 'SALESKIT_S';
        })
        // console.log(spc)
      })
    } else if(val==='sam_concept'){
      this.camServ.getSamConcept().then((concept)=>{
        let conceptArr = [];
        conceptArr = conceptArr.concat(concept);
        conceptArr.forEach((x)=>{
          this.progName = this.progName.concat({
            id_program_periode: x.id_sam,
            program_name: `${x.brand_variant} | ${x.singkatan} | ${x.budget}`
          });
          this.typeModule='SAM';
        })
      })
    } else {
      this.camServ.getSamPaket().then((paket)=>{
        let paketArr = [];
        paketArr = paketArr.concat(paket);
        paketArr.forEach((x)=>{
          this.progName = this.progName.concat({
            id_program_periode: x.id_sam,
            program_name: `${x.brand_variant} | ${x.singkatan} | ${x.budget.toLocaleString()}`
          });
        })
      })
    }
  }

  getDatafile(id,type){
    let form = {
      id: id,
      type_module: type,
      id_activity: ''
    };
    this.camServ.getDatafile(form).then((g)=>{
      this.progList = this.progList.concat(g);
    })
  }

  progNameChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.id_program_periode = event.value.id_program_periode;
    this.selectfile = false;
    // this.presentModal(event.value.id_program_periode,this.typeModule);
    // console.log(this.typeModule)
  }

  selectFile(){
    this.presentModal(this.id_program_periode,this.typeModule);
  }

  async presentModal(id,type) {

    const modal = await this.modalCtrl.create({
      component: FiletaskmodalPage,
      componentProps: {
        id: id,
        typeModule: type
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      let t = dataReturned.data;
      let u = this.unique.transform(t);
      console.log(u);
      this.selectedfile = this.selectedfile.concat(u);
    });
    return await modal.present();
  }

  agencyChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.disableAdv = false;
    this.advertisers = [];
    this.getAdvertiser(this.picam.values,event.value.id);
  }

  goTo(file){
    console.log(file);
  }

  actChange(event:{
    component: IonicSelectableComponent,
    value: any
  }){
    console.log(this.activity)
    // this.activity = event.value.id
  }

  advertiserChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.disableBrand = false;
    this.brands = [];
    this.getBrand(this.picam.values,this.agency.id,event.value.id);
  }

  brandChange(event: {
    component: IonicSelectableComponent,
    value: any
  }){
    this.disableBrand = false;
    if(event.value.text !== 'NEW BRAND'){
      this.variant = event.value.text
      this.disableVariant = true;
    }
  }

  deleteFile(){
    this.selectedfile = [];
  }

  addEvent(){
    // this.startUpload(this.images);
    if(!this.activity || !this.subject || !this.desc ||
      !this.potency ||
      !this.brand ||
      !this.agency ||
      !this.advertiser ||
      !this.client ||
      !this.variant ||
      !this.partner ||
      !this.picam ||
      !this.startdate ||
      !this.enddate ||
      !this.typeact){
        this.presentToast('Please Insert field correctly !');
      } else { 
        let xdatefor = this.startdate.split('T');
        xdatefor = xdatefor[0];
        let xtimefor = this.startTime.split('T');
        xtimefor = xtimefor[1];
        xtimefor = xtimefor.split('.');
        xtimefor = xtimefor[0];
    let endtimefor = this.endTime.split('T');
    let endtimefore = endtimefor[1].split('.');
    endtimefore = endtimefore[0];
        let form = {
          activity: this.activity.id,
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
          startdate: `${xdatefor} ${xtimefor}`,
          enddate: `${this.enddate} ${endtimefore}`,
          type_act: this.typeact.id,
          id_cam: '',
          hargaEnt : this.hargaEntertainment,
          descEnt : this.descEntertainment,
          fileEnt : this.dataImage,
          titleEnt : this.titleEntertainment,
          partnerEnt : this.partnerEntertainment,
          fileChoose: this.selectedfile,
          location: this.location

        }
        console.log(form)
        this.presentLoading();
        this.camServ.saveTask(form).then((saving)=>{
          let a = saving['id_cam'];
          let b = saving['id_activity'];
          let toUser = [];
          let dataSend = [];
          this.camServ.getask(a,b).then(data=>{
            if(data['data'][0]['user_am'] !== undefined){
              toUser = toUser.concat(data['data'][0]['user_am']['ID_USER']);
            }
            if(data['data'][0]['user_sgm'] !== undefined){
              toUser = toUser.concat(data['data'][0]['user_sgm']['ID_USER']);
            }
            if(data['data'][0]['user_sm'] !== undefined){
              toUser = toUser.concat(data['data'][0]['user_sm']['ID_USER']);
            }
            if(data['data'][0]['user_gm'] !== undefined){
              toUser = toUser.concat(data['data'][0]['user_gm']['ID_USER']);
            }
            dataSend = dataSend.concat({
              start_date: data['data'][0].cam_activity[data['data'][0].cam_activity.length - 1].days,
              subject: data['data'][0].cam_activity[data['data'][0].cam_activity.length - 1].subject,
              potency: data['data'][0].cam_activity[data['data'][0].cam_activity.length - 1].potency_revenue,
              id_cam: data['data'][0].id_cam,
              id_activity: data['data'][0].cam_activity[data['data'][0].cam_activity.length - 1].id_activity
    
            });
            this.fcmServ.sendCamActivity(toUser,dataSend).then(success => {
              console.log(success);
            })
          });
          setTimeout(()=>{
            this.loadingController.dismiss();
            this.presentToast("Success Stored the Data !");
            this.route.navigateByUrl("transaction");
          },3000);
        })
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please Wait !! Sending the Data ...',
      duration: 2000,
      spinner: 'dots'
    });
    await loading.present();
  }

  clientChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log(event.value);
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('picam:', event.value);
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: {
         'objConfig': this.datePickerObj,
         'selectedDate': this.selectedStartDate
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedStartDate = data.data.date;
      });
  }

  dateChanged_start(ev){
    if(ev.detail.value !== ev.detail.value){
      this.startdate = ev.detail.value;
      let spliting_y = ev.detail.value.split('T');
      this.startdate = spliting_y[0];
    }
  }

  timeChanged_start(ev){
    let y = ev.detail.value;
    let spliting_y = y.split('T');
    let spliting_time = spliting_y[1].split(':');
    let timeget = `${spliting_time[0]}:${spliting_time[1]}`;
    this.startTime = timeget;
  }

  dateChanged_end(ev){
    let y = ev.detail.value;
    let spliting_y = y.split('T');
    this.enddate = spliting_y[0];
  }

  timeChanged_end(ev){
    let y = ev.detail.value;
    let spliting_y = y.split('T');
    let spliting_time = spliting_y[1].split(':');
    let timeget = `${spliting_time[0]}:${spliting_time[1]}`;
    console.log(timeget);
    this.endTime = timeget;
  }

  segmentChanged(ev){
    this.segmentChoose = ev.detail.value;
  }

}
