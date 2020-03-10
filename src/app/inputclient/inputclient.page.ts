import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActionSheetController, AlertController, ToastController, Platform } from '@ionic/angular';
import { CamServiceService } from '../service/cam/cam-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, DirectoryEntry, FileEntry  } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
@Component({
  selector: "app-inputclient",
  templateUrl: "./inputclient.page.html",
  styleUrls: ["./inputclient.page.scss"]
})
export class InputclientPage implements OnInit {
  status: string;
  education: string;
  hobi = [];
  editedHobby = [];
  hobby_select: string;
  id_client_account: number;
  child: number;
  sosmed = {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  }
  desc: string;
  like: string;
  dislike: string;
  email: string;
  phone: string;
  photo: string;
  images = [];
  dataImage = [];
  nota = [];

  constructor(
    public router: ActivatedRoute,
    public location: Location,
    public route: Router,
    public action: ActionSheetController,
    public camServ: CamServiceService,
    public alert: AlertController,
    private filePath: FilePath,
    private storage: Storage, 
    private webview: WebView,
    private imageResizer: ImageResizer,
    private camera: Camera,
    private file: File, 
    private platform: Platform,
    public ref: ChangeDetectorRef,
    public toastController: ToastController
  ) {
    this.router.params.subscribe(params => {
      this.id_client_account = params.id_client_account;
      this.email = params.email;
      this.phone = params.phone !== null ? params.phone : 'not set';
      this.photo = params.photo;
    });
  }

  setimage(item) {
    return `assets/icon/${item}`;
  }

  ngOnInit() {
    console.log(this.images);
    this.hobi = [];
    this.gethobi()
      .then(g => (this.hobi = this.hobi.concat(g)))
      .then(() => {
        this.hobi.map((v, i) => {
          this.editedHobby = this.editedHobby.concat({
            name: `hobbi${i}`,
            type: "radio",
            label: v.name_hobby,
            value: v.name_hobby,
            checked: false
          });
        });
      });
  }

  async gethobi() {
    this.hobi = [];
    const a = await this.camServ.getHobby().then(x => x);
    return a;
  }
  async actionStatus() {
    const actionSheet = await this.action.create({
      header: "Status",
      buttons: [
        {
          text: "Single",
          handler: () => {
            this.status = "Single";
          }
        },
        {
          text: "Married",
          handler: () => {
            this.status = "Married";
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async actionEducation() {
    const actionSheet = await this.action.create({
      header: "Education",
      buttons: [
        {
          text: "Elementary",
          handler: () => {
            this.education = "Elementary";
          }
        },
        {
          text: "Junior High School",
          handler: () => {
            this.education = "Junior High School";
          }
        },
        {
          text: "Senior High School",
          handler: () => {
            this.education = "Senior High School";
          }
        },
        {
          text: "Diploma",
          handler: () => {
            this.education = "Diploma";
          }
        },
        {
          text: "Bachelor Degree",
          handler: () => {
            this.education = "Bachelor Degree";
          }
        },
        {
          text: "Master Degree",
          handler: () => {
            this.education = "Master Degree";
          }
        },
        {
          text: "Doctor Degree",
          handler: () => {
            this.education = "Doctor Degree";
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlertCheckbox() {
    const alert = await this.alert.create({
      header: "Hobby",
      inputs: this.editedHobby,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            
          }
        },
        {
          text: "Ok",
          handler: (data) => {
            this.hobby_select = data;
          }
        }
      ]
    });

    await alert.present();
  }

  goback() {
    this.location.back();
  }
  
  saving(){

    let hobbies = this.hobby_select ? this.hobi.filter(x => x.name_hobby.toLowerCase().indexOf(this.hobby_select.toLowerCase()) > -1) : null;
    var educate;
    switch (this.education) {
      case "Elementary":
        educate = "SD";
        break;
      case "Junior High School":
        educate = "SMP";
        break;
      case "Senior High School":
        educate = "SMA";
        break;
      case "Diploma":
        educate = "D3";
        break;
      case "Bachelor Degree":
        educate = "S1";
        break;
      case "Master Degree":
        educate = "S2";
        break;
      case "Doctor Degree":
        educate = "S3";
        break;
      case undefined : 
        educate = null;
        break;
    }
    let a  = [];
    a.push(this.sosmed.facebook, this.sosmed.twitter, this.sosmed.instagram, this.sosmed.linkedin);
    let form = {
      id_client_account: this.id_client_account,
      status: this.status === 'Single' ? 'SINGLE' : 'MARRIAGE',
      no_of_children: this.child,
      hobby: hobbies ? hobbies[0].id_hobby : null,
      last_education: educate,
      sosmed: a,
      description: this.desc ? this.desc : null,
      like: this.like ? this.like : null,
      dislike: this.dislike ? this.dislike : null,
      photo: this.dataImage.length > 0 ? this.dataImage[0] : '',
      phone_number: this.phone === 'not set' ? null : this.phone,
      email: this.email ? this.email : null, 
    }
    console.log(form);
    this.camServ.saveClient(form).then(x => console.log(x));
  }

  async readImage(){
    const actionSheet = await this.action.create({
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
      console.log(this.images);
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

async testToast(text) {
  const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
  });
  toast.present();
}

async presentToast(text) {
  const toastw = await this.toastController.create({
    message: text,
    duration: 2000
  });
  toastw.present();
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
}
