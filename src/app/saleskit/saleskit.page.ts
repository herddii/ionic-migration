import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, ModalController, IonInfiniteScroll, Platform, IonContent, Events } from '@ionic/angular';
import { SaleskitService } from '../service/saleskit/saleskit.service';
import { ModalbuPage } from '../modalbu/modalbu.page';
import { ViewimagePage } from '../viewimage/viewimage.page';
import { UniquePipe } from 'ngx-pipes';
import { ScrollHideConfig } from '../scroll-hide.directive';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { UrlService } from '../service/url/url.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-saleskit',
  templateUrl: './saleskit.page.html',
  styleUrls: ['./saleskit.page.scss'],
})
export class SaleskitPage implements OnInit {

  @ViewChild('pageContent') IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };

  activebutton: number = 20;
  items: any[] = [];
  programItem: any[] =[];
  ratecard: any[] = [];
  specialof: any[] = [];
  performance: any[] = [];
  progress: number;
  segmentChoose: any='all';
  segmentBenefit = 'FTA';

  loadata = true;
  opts = {
    icon: true,
    label: true,
    toolbarPos: 'top',
    scrollable: false,
  };
  paged = 1;
  last_page = 0;

  selectedbu: number = 11;


  genre = [{
    id_genre: 20,
    genre_name: 'ALL'
  }];

  viewdownload = false;
  hidebutton = false;
  oldScroll: number;
  FTAmenu = [];
  PAYmenu = [];

  constructor(
    
    private popoverCtrl: PopoverController,
    public saleskitServ: SaleskitService,
    public modalCtrl: ModalController,
    public unique: UniquePipe,
    public route: Router,
    public statusbar: StatusBar,
    public platform: Platform,
    public file: File,
    public fileopener: FileOpener,
    public transfer: FileTransfer,
    public url: UrlService,
    public event: Events,
    private dom: DomSanitizer
    
    ) {
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

  ngOnInit() {
      this.items = [];
      this.programItem = [];
      this.getdata();
      // this.statusbar.backgroundColorByHexString('#ee3158');
      let y = this.saleskitServ.getGenre().then(genre => {
        let g = [];
        g = g.concat(genre);
        this.genre = this.genre.concat(g);
      });
      this.getMenuFta();
      this.getMenuPaytv();
      // this.getDataProgram();
  }

  getMenuFta(){
    this.saleskitServ.getMenuFta().then(ftamenu => {
      this.FTAmenu = this.FTAmenu.concat(ftamenu);  
      console.log(this.FTAmenu)
    })
  }

  getMenuPaytv(){
    this.saleskitServ.getMenuPaytv().then(paytvmenu =>{
      this.PAYmenu = this.PAYmenu.concat(paytvmenu);
      console.log(this.PAYmenu)
    })
  }

  transform(ev){
    return this.dom.bypassSecurityTrustResourceUrl(ev);
  }

  getdata(infiniteScroll?){
    this.loadata = true;
    setTimeout(()=>{
      this.saleskitServ.getAllMaster(this.selectedbu,this.paged).then(saleskit => {
        this.items = this.items.concat(saleskit['data']);
        this.last_page = saleskit['last_page'];
        // this.showingdata(saleskit);
      }).then(() =>{
        this.loadata = false;
      });
    },500);
  }

  getDataProgram(infiniteScroll?){
    console.log(this.selectedbu);
    this.loadata = true;
    setTimeout(()=>{
      this.saleskitServ.getAllProgram(this.paged,this.activebutton,this.selectedbu).then(program =>{
        this.programItem = this.programItem.concat(program['data']);
        this.programItem = this.programItem.filter(x => x.program.genre);
        this.last_page = program['last_page'];
      }).then(()=>{
        this.loadata = false;
      })
    },500);
  }

  gotosaleskit(){
    this.route.navigateByUrl('awalan');
    // this.statusbar.backgroundColorByHexString('#485fed');
  }

  getDataRatecard(infiniteScroll?){
    console.log('rate')
    this.loadata = true;
    this.saleskitServ.getRatecard(this.paged,this.selectedbu).then(ratecard =>{
      this.ratecard = this.ratecard.concat(ratecard['data']);
      this.last_page = ratecard['last_page'];
    }).then(()=>{
      this.loadata = false;
    })
  }

  getDataSpecial(infiniteScroll?){
    console.log('special')
    this.loadata = true;
    this.saleskitServ.getSpecialOffers(this.paged,this.selectedbu).then(special =>{
      this.specialof = this.specialof.concat(special['data']);
      this.last_page = special['last_page'];
    }).then(()=>{
      this.loadata = false;
    })
  }

  getDataPerformance(infiniteScroll?){
    this.loadata = true;
    this.saleskitServ.getPerformance(this.paged,this.selectedbu).then(performances =>{
      this.performance = this.performance.concat(performances['data']);
      this.last_page = performances['last_page'];
    }).then(()=>{
      this.loadata = false;
    })
  }

  active(val){
    if(this.activebutton !== val){
      this.activebutton = val;
      this.programItem = [];
      this.getDataProgram();
    }
  }

  loadData(event) {
    setTimeout(() => {
      this.paged++;
      if(this.segmentChoose === 'all'){
        this.getdata(event);
      } else if(this.segmentChoose === 'program'){
        this.getDataProgram(event);
      } else if(this.segmentChoose === 'ratecard'){
        this.getDataRatecard(event);
      } else if(this.segmentChoose === 'specialoffers'){
        this.getDataSpecial(event);
      } else if(this.segmentChoose === 'performance'){
        this.getDataPerformance(event);
      }
      event.target.complete();
      if (this.paged === this.last_page) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  segmentChangeBenefit(ev){
    this.segmentBenefit = ev.detail.value;
  }
  segmentChanged(ev){
    this.segmentChoose = ev.detail.value;
    console.log(this.segmentChoose)
    this.paged = 1;
    this.items = [];
    this.programItem = [];
    this.ratecard = [];
    this.specialof = [];
    if(this.segmentChoose === 'all'){
      this.getdata();
    } else if(this.segmentChoose === 'program'){
      this.getDataProgram();
    } else if(this.segmentChoose === 'ratecard'){
      this.getDataRatecard();
    } else if(this.segmentChoose === 'specialoffers'){
      this.getDataSpecial();
    } else if(this.segmentChoose === 'performance'){
      this.getDataPerformance();
    }
  }

  async presentModal() {

    const modal = await this.modalCtrl.create({
      component: ModalbuPage,
      componentProps: {
        id: this.selectedbu
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      let t = dataReturned.data;
      let u = this.unique.transform(t);
      // console.log(dataReturned);
      if(t !== undefined){
        this.selectedbu = u;

        this.items = [];
        this.programItem = [];
        this.ratecard = [];
        this.specialof = [];
        this.performance = [];
        console.log(this.segmentChoose);
        if(this.segmentChoose === 'all'){
          this.getdata();
        } else if(this.segmentChoose === 'program'){
          this.getDataProgram();
        } else if(this.segmentChoose === 'ratecard'){
          this.getDataRatecard();
        } else if(this.segmentChoose === 'specialoffers'){
          this.getDataSpecial();
        } else if(this.segmentChoose === 'performance'){
          this.getDataPerformance();
        }
      }
    });
    return await modal.present();
  }

  test(){
    this.presentModal();
  }

  gotowhere(value){
    if(value.content_file_download.toLowerCase().lastIndexOf('.jpg') > -1 
    || value.content_file_download.toLowerCase().lastIndexOf('.jpeg') > -1
    || value.content_file_download.toLowerCase().lastIndexOf('.png') > -1
    || value.content_file_download.toLowerCase().lastIndexOf('.gif') > -1){
      this.goview(value);
    } else {
      this.godownload(value);
    }
  }

  gotobenefit(value){
    console.log(this.segmentBenefit);
    this.route.navigate(['/benefit',{
      id_benefit : value,
      tvtype: this.segmentBenefit
    }]);
  }

  async goview(value) {

    const modal = await this.modalCtrl.create({
      component: ViewimagePage,
      componentProps: {
        val: value
      }
    });
    return await modal.present();
  }

    godownload(value){
    this.viewdownload = true;
    let path = '';
    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    } else if(this.platform.is('android')){
      path = this.file.dataDirectory;
    }
    this.saleskitServ.getImage(value.id_content).then(result=>{

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
          },5000);
        this.progress = 0;
        console.log(this.progress);
        }
      });
    }, (err)=> {
      console.log(err);
    })
  }

  searchbar(value){
    console.log(value);
  }

}