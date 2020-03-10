import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SaleskitService } from '../service/saleskit/saleskit.service';
import {SafeResourceUrl,DomSanitizer} from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, IonContent, Events, Platform } from '@ionic/angular';
import { UrlService } from '../service/url/url.service';
import { ModalbuPage } from '../modalbu/modalbu.page';
import { UniquePipe } from 'ngx-pipes';
import { ViewimagePage } from '../viewimage/viewimage.page';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.page.html',
  styleUrls: ['./benefit.page.scss'],
})
export class BenefitPage implements OnInit {
  @ViewChild('pageContent') IonContent;
  // footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  // headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 320 };

  accordion = true;
  activebutton = 0;
  id_benefit: any;
  loadbenefit: boolean = true;
  loadtypespot: boolean = true;
  id_typespot: any = 0;
  buselect: number = 11;
  typespotFile = [];
  last_page:any;
  last_pagebenefit: any;
  loadata = true;
  oldScroll: number;
  benefitDesc = [];
  benefitFile = [];
  number = 1;
  typespot = [{
    id_typespot: 0,
    nama: 'ALL'
  }];
  valuedownload = 0.4;
  config = {
    spaceBetween: 10,
    slidesPerView: 1.2
  }
  paged = 1;
  progress: number;
  hidebutton: boolean = false;
  // selectedbu = 11;
  urlimage: any;
  urlopen: any;
  viewdownload: boolean = false;
  tvtype : any;

  constructor(

    public route: Router,
    public activeroute: ActivatedRoute,
    public saleskitServ: SaleskitService,
    public dom: DomSanitizer,
    public statusbar: StatusBar,
    public modalCtrl: ModalController,
    public unique: UniquePipe,
    public event: Events,
    public file: File,
    public transfer: FileTransfer,
    public fileopener: FileOpener,
    public platform: Platform,
    public url: UrlService

  ) { 
    this.statusbar.backgroundColorByHexString('#ee3158');
    // console.log(this.tvtype);
    this.progress = 0;
  }

  async scrollToTop(){
    
    await this.IonContent.scrollToTop().then(()=> this.hidebutton = false);
  }

  onScroll(event){
      if(event.scrollToTop - this.oldScroll > 5){
       this.hidebutton = false; 
      } else {
        this.hidebutton = true;
      }
      this.oldScroll = event.scrollToTop;
  }

  async presentModal() {

    const modal = await this.modalCtrl.create({
      component: ModalbuPage,
      componentProps: {
        id: this.buselect
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      let t = dataReturned.data;
      let u = this.unique.transform(t);
      if(u !== undefined){
        this.buselect = u;
        this.benefitFile = [];
        this.typespotFile = [];
        this.getBenefit();
        this.getVideo();
    };
  })
  return await modal.present();

}

gotowhere(val){
  console.log(val.content_file_download.toLowerCase().includes('.be'));
  if(val.content_file_download.toLowerCase().includes('.jpg') === true ||
  val.content_file_download.toLowerCase().includes('.jpeg') === true ||
  val.content_file_download.toLowerCase().includes('.png') === true ||
  val.content_file_download.toLowerCase().includes('.gif') === true){
    this.goView(val);
  } else if (val.content_file_download.toLowerCase().includes('.') === false){
    this.seevideo(val);
  } else if (val.content_file_download.toLowerCase().includes('.be') === true){
    let x = val.content_file_download;
    let z = x.replace('youtu.be/','');
    this.seevideo(val);
  } else {
    this.pdfView(val);
  }

}

pdfView(val){
  this.progress = 0;
  this.viewdownload = true;
  let path = '';
    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    } else if(this.platform.is('android')){
      path = this.file.dataDirectory;
    }
    this.saleskitServ.getImage(val.id_content).then(result=>{

      // if(result[0].id_master_filetype == 1){
      //   var setsubmodul = 'RATECARD';
      // } else if(result[0].id_master_filetype == 2){
      //   var setsubmodul = 'SPECIALOFFERS';
      // } else if(result[0].id_master_filetype == 8){
      //   var setsubmodul = 'PROGRAM';
      // } else {
      //   var setsubmodul = 'PERFORMANCE';
      // }
      // let downloadactivity = {
      //   modul: 'SALESKIT',
      //   submodul: 'SALESKIT/'+setsubmodul,
      //   type_apps: 'APPS',
      //   action: 'DOWNLOAD',
      //   title: result[0].content_title,
      //   id_title: result[0].id_content,
      //   id_master_filetype: result[0].id_master_filetype,
      //   file: result[0].content_file_download,
      //   id_file: result[0].id_filetype
      // }

      // this.gotopagehit(downloadactivity);

      let nameFile = result[0].content_file_download;
      let urlimage = this.url.urlphoto+'/datafile/'+result[0].id_filetype+'/'+result[0].content_file_download;
      const transfer = this.transfer.create();
      transfer.download(urlimage, this.file.externalRootDirectory + '/Documents/' + nameFile).then((response)=>{
        if(result[0].content_file_download.lastIndexOf('.pdf') > -1){
          this.fileopener.open(response.nativeURL,'application/pdf');
        } else if (result[0].content_file_download.lastIndexOf('.xlsx') > -1 || result[0].content_file_download.lastIndexOf('.xls') > -1){
          this.fileopener.open(response.nativeURL,'application/vnd.ms-excel');
        } else if (result[0].content_file_download.lastIndexOf('.pptx') > -1 || result[0].content_file_download.lastIndexOf('.ppt') > -1 ){
         this.fileopener.open(response.nativeURL,'application/vnd.ms-powerpoint');
        } else if (result[0].content_file_download.toLowerCase().lastIndexOf('.mp4') > -1){
          this.fileopener.open(response.nativeURL,'video/mpeg');
        }
      }, (error)=>{
        console.log(error);
      });
      transfer.onProgress((progressEvent) => {
        var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        if(this.progress != perc){
          this.progress = perc;
        }
        if(this.progress = 100){
          setTimeout(()=>{
            this.viewdownload = false;
            this.progress = 0;
          },5000);
        console.log(this.progress);
        }
      });
    }, (err)=> {
      console.log(err);
    })
    
    
}

// gotopagehit(parameter){
//   this.pagehit.getactivity(parameter).then((success)=>{
//       console.log('success');
//     })
// }

async goView(value) {

  const modal = await this.modalCtrl.create({
    component: ViewimagePage,
    componentProps: {
      val: value
    }
  });
  return await modal.present();
}

seevideo(val){
  let navigationExtras: NavigationExtras = {
    state: {
      video: val
    }
  };
  // console.log(val)
  this.route.navigate(['viewvideo'], navigationExtras);
}


loadData(event) {
  console.log({1: this.paged, 2: this.last_page});
  if (this.paged = this.last_page) {
    event.target.disabled = true;
  }
  setTimeout(() => {
    this.paged++;
    this.getVideo(event);
    this.getBenefit(event)
    event.target.complete();
    
  }, 500);
}

  test(){
    this.presentModal();
  }

  ngOnInit() {
    this.activeroute.params.subscribe(params => {
      this.id_benefit = params['id_benefit'];
      this.tvtype = params['tvtype'];
    })
    console.log(this.tvtype);
    this.getBenefit();
    this.getVideo();
    this.getTypeSpot();
  }

  gotosaleskit(){
    this.route.navigateByUrl('saleskit');
  }

  getBenefit(infiniteScroll?){
    this.saleskitServ.getVideoBenefit(this.id_typespot,this.id_benefit,this.paged,this.buselect,this.tvtype).then(file=>{
      this.loadbenefit = false;
      this.benefitFile = this.benefitFile.concat(file['data']);
      this.benefitFile = this.benefitFile.filter(g => g.content_file_download);
      this.last_pagebenefit = file['last_page'];
      if(this.benefitFile.length > 0){
        this.benefitDesc.push(this.benefitFile[0].benefit_desc);
      }
    })
  }

  getTypeSpot(){
    this.saleskitServ.getTypeSpot(this.id_benefit,this.tvtype,this.buselect).then(typespottype=>{
      let o = [];
      o = o.concat(typespottype);
      this.typespot = this.typespot.concat(o);
    })
  }

  active(val){
    if(this.activebutton !== val){
      this.activebutton = val;
      this.typespotFile = [];
      this.getVideo();
    }
  }

  getVideo(infiniteScroll?){
    this.saleskitServ.getVideoTypespot(this.activebutton,this.id_benefit,this.paged,this.buselect,this.tvtype).then(typespot =>{
      this.loadtypespot = false;
      this.typespotFile = this.typespotFile.concat(typespot['data']);
      this.typespotFile = this.typespotFile.filter(v => v.content_file_download);
      this.last_page = typespot['last_page'];
      if(this.typespotFile.length > 0){
        this.benefitDesc.push(this.typespotFile[0].benefit_desc);
      }
    }).then(()=>{
      this.loadata = false;    
    })
  }

  transform(val){
    if(val.toLowerCase().includes('.be')){
      let y = val;
      let z = y.replace("youtu.be/","");
      return this.dom.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/'+z+'/hqdefault.jpg');
    }
    return this.dom.bypassSecurityTrustResourceUrl('https://img.youtube.com/vi/'+val+'/hqdefault.jpg');
  }

  nambahborder(){
    this.number++;

    if(this.number%2==0){
      this.accordion = false;
    } else {
      this.accordion = true;
    } 
  }

}
