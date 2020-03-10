import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform, LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UrlService } from '../service/url/url.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { SaleskitService } from '../service/saleskit/saleskit.service';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-viewimage',
  templateUrl: './viewimage.page.html',
  styleUrls: ['./viewimage.page.scss'],
})
export class ViewimagePage implements OnInit {
  
  result;
  load = true;
  urlimage: any;
  urlopen: any;

  constructor(

    public modalCtrl: ModalController,
    public navParams: NavParams,
    public socialShare: SocialSharing,
    public url: UrlService,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public transfer: FileTransfer,
    public file: File,
    public saleskitServ: SaleskitService,
    public photoLibrary: PhotoLibrary,
    public fileOpener: FileOpener,
    public statusbar: StatusBar

  ) { 
    this.statusbar.backgroundColorByHexString('#000000');
  }

  ngOnInit() {
    this.result = this.navParams.data.val;
    // console.log(this.result);
    let path = '';
    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    } else if(this.platform.is('android')){
      path = this.file.dataDirectory;
    }
    let nameFile = this.result.content_file_download;
    let urlimage = this.url.urlphoto+'/datafile/'+this.result.id_filetype+'/'+this.result.content_file_download;
    console.log(urlimage);
    const transfer = this.transfer.create();
    transfer.download(urlimage, path+nameFile).then((entry) => {
      this.urlimage = entry.nativeURL; 
      // console.log(entry)
      this.urlopen = entry.nativeURL;
    });
  }

  async closeModal(value?) {
    this.statusbar.backgroundColorByHexString('#ee3158');
    await this.modalCtrl.dismiss(value);
  }

  downloadpict(value){
    this.load = true;
    this.presentLoading('Downloading Please Wait ...');
    let path = '';
    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')){
      path = this.file.dataDirectory;
    }
    let album = 'Saleskit';
    // this.photoLibrary.saveImage(this.urlimage,album);
    this.saveImage(this.urlimage,'Saleskit');
    if(value.id_master_filetype == 1){
      var setsubmodul = 'RATECARD';
    } else if(value.id_master_filetype == 2){
      var setsubmodul = 'SPECIALOFFERS';
    } else if(value.id_master_filetype == 8){
      var setsubmodul = 'PROGRAM';
    } else {
      var setsubmodul = 'PERFORMANCE';
    }

    let downloadactivity = {
      modul : 'SALESKIT',
      submodul : 'SALESKIT/'+setsubmodul,
      type_apps : 'APPS',
      action : 'download',
      title : this.result.content_title,
      id_title : this.result.id_content,
      id_master_filetype : this.result.id_master_filetype,
      file : this.result.content_file_download,
      id_file : this.result.id_filetype
    }

    this.gotopagehit(downloadactivity);
    this.load = false;
    this.fileOpener.open(this.urlopen, 'image/jpg').then(()=> console.log('success')).catch( e => console.log('error',e));

  }

  share(value){
    let urlPerformance = 'Tap Here to Show Details http://mncmediakit.com/saleskit';
    let urlRatecard = 'Tap Here to Show Details http://mncmediakit.com/saleskit/detail-ratecard/'+btoa(value.id_program_periode);
    let urlSpecialOffers = 'Tap Here to Show Details http://mncmediakit.com/saleskit/detail-specialoffers/'+btoa(value.id_program_periode);
    let urlProgram = 'Tap Here to Show Details http://mncmediakit.com/saleskit/detail-program/'+btoa(value.id_program_periode);
    this.presentLoading('Retrieving Data');
    
    this.load = false;
      
      if(value.filetype){
        let fa = value.filetype;
        this.load = true;
        this.presentLoading('Retrieving Data');
        if(fa.id_master_filetype === 1){
          
          this.socialShare.share(urlRatecard, null, this.urlimage, null);

        }else if(fa.id_master_filetype === 2){
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/SPECIALOFFERS',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.id_program_periode,
            id_master_filetype: fa.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlSpecialOffers, null, this.urlimage, null);
        }else if(fa.id_master_filetype === 8){
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/PROGRAM',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.id_program_periode,
            id_master_filetype: fa.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlProgram, null, this.urlimage, null);
          console.log(this.urlimage);
        } else if(fa.id_master_filetype === 21) {
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/PERFORMANCE',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.content_use,
            id_master_filetype: fa.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlPerformance, null, this.urlimage, null);
        }
        this.load = false;
      }
      else {
        this.load = true;
        this.presentLoading('Retrieving Data');
        if(value.id_master_filetype == 1){
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/RATECARD',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.id_program_periode,
            id_master_filetype: value.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlRatecard, null, this.urlimage, null);
        } else if(value.id_master_filetype == 2){
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/SPECIALOFFERS',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.id_program_periode,
            id_master_filetype: value.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlSpecialOffers, null, this.urlimage, null);
        } else if(value.id_master_filetype == 8){
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/PROGRAM',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.id_program_periode,
            id_master_filetype: value.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlProgram, null, this.urlimage, null);
        } else if(value.id_master_filetype == 21){
          let shareactivity = {
            modul: 'SALESKIT',
            submodul: 'SALESKIT/PERFORMANCE',
            type_apps: 'APPS',
            action: 'SHARE',
            title: value.content_title,
            id_title: value.content_use,
            id_master_filetype: value.id_master_filetype,
            file: value.content_file_download,
            id_file: value.id_content
          }
          this.gotopagehit(shareactivity);
          this.socialShare.share(urlPerformance, null, this.urlimage, null);
        }
      }
      // this.load = false;
    this.load = false;
  }​

  async gotopagehit(parameter){
    await this.saleskitServ.getActivity(parameter).then(success => console.log(success)).catch(e => console.log('error',e));
  }

  async presentLoading(text) {
    const loading = await this.loadingCtrl.create({
      message: text,
      duration: 2000
    });
    await loading.present();

    if(this.load = false){
      await loading.onDidDismiss();
    }

    console.log('Loading dismissed!');
  }

  saveImage(val,album){
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }
  


}
