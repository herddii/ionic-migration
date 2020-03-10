import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ModalController, ToastController, ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { Location } from "@angular/common";
import { CamServiceService } from '../../service/cam/cam-service.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, DirectoryEntry, FileEntry  } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-entertainment',
  templateUrl: './add-entertainment.page.html',
  styleUrls: ['./add-entertainment.page.scss'],
})
export class AddEntertainmentPage implements OnInit {

  counting: number = 1;
  titleEntertainment = [];
  partnerEntertainment = [];
  partners = [];
  hargaEntertainment = [];
  images = [];
  descEntertainment = [];
  partner: any;
  dataImage = [];
  idactive: any;
  id_cam: any;
  id_cam_cost: any;
  entertainment: any;
  title: any;
  nota: any;
  cost_by: any;
  cost: any;
  desc: any;

  constructor(
    public locate: Location,
    public camServ: CamServiceService,
    private camera: Camera,
    private file: File, 
    private platform: Platform, 
    private loadingController: LoadingController,
    public ref: ChangeDetectorRef,
    private actionSheetController: ActionSheetController, 
    private toastController: ToastController,
    private filePath: FilePath,
    private storage: Storage, 
    private webview: WebView,
    private imageResizer: ImageResizer,
    public route: ActivatedRoute,
    public routing: Router
  ) { }

  ngOnInit() {
    this.getpartner();
    this.dataImage = [];
    this.route.params.subscribe(params => {
      if (params['id_cam']) {
        this.idactive = params['id_acti'];
        this.id_cam = params['id_cam'];
      } else if (params['id_cam_cost']) {
        this.idactive = params['id_acti'];
        this.id_cam_cost = params['id_cam_cost'];
        this.title = params['title'];
        this.nota = params['nota'];
        this.cost_by = params['cost_by'];
        this.cost = params['cost'];
        this.desc = params['desc'];      }
    });
    if(this.id_cam_cost){
      this.counting = 2;
      this.titleEntertainment = this.titleEntertainment.concat(this.title);
      this.camServ.getpartner().then((partner)=>{
        this.partners = this.partners.concat(partner);
        let setValue = this.partners.filter(x => {
          return x.id === this.cost_by;
        });
        console.log({1:setValue, 2:this.partners});
        this.partnerEntertainment = this.partnerEntertainment.concat(setValue[0]);
      })
      
      this.hargaEntertainment = this.hargaEntertainment.concat(this.cost); 
      this.descEntertainment = this.descEntertainment.concat(this.desc);
    }
  }

  myBackButton(){
    this.locate.back();
  }

  async presentToast(text) {
    const toastw = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toastw.present();
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
      this.dataImage = this.dataImage.concat(reader.result);
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
      if(this.images){
        this.nota = [];
      }
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

  addRow(){
    this.counting++;
  }

  deleteRow(){
    if(this.counting > 1){
      this.counting--;
    }
  }

  getpartner(){
    this.camServ.getpartner().then((partner)=>{
      this.partners = this.partners.concat(partner);
    })
  }

  addEvent(){
    if(!this.titleEntertainment || !this.partnerEntertainment || !this.hargaEntertainment || !this.descEntertainment || !this.images){
      this.presentToast('Please Insert field correctly !');
    }
    let form = {
          id_activity: this.idactive,
          cost : this.hargaEntertainment,
          descEnt : this.descEntertainment,
          fileEnt : this.dataImage,
          titleEnt : this.titleEntertainment,
          partnerEnt : this.partnerEntertainment,
          id_cam_cost: this.id_cam_cost,
    }
    this.presentLoading();
        this.camServ.sendEntertainment(form).then((saving)=>{
          this.loadingController.dismiss();
        this.presentToast('Success Stored the Data !');
        this.routing.navigateByUrl('tabs');
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please Wait !! Sending the Data ...',
      duration: 2000,
      spinner: 'dots'
    });
    await loading.present();
  }

}
