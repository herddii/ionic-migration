import { Component, OnInit } from '@angular/core';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalController, ToastController, ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import { UniquePipe } from 'ngx-pipes';
import { FiletaskmodalPage } from '../filetaskmodal/filetaskmodal.page';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.page.html',
  styleUrls: ['./add-file.page.scss'],
})
export class AddFilePage implements OnInit {
  modultype: any;
  typeModule: any;
  progName = [];
  id_program_periode: any;
  selectedfile = [];
  modultypes = [{
    id: 'slskt_prog',
    text: 'Saleskit Program'
  },
  {
    id: 'slskt_rate',
    text: 'Saleskit Ratecard'
  },
  {
    id: 'slskt_spc',
    text: 'Saleskit Special Offer'
  },
  {
    id: 'sam_concept',
    text: 'SAM Concept'
  },
  {
    id: 'sam_packet',
    text: 'SAM Paket'
  }];

  programSelect:boolean=true;
  selectfile:boolean=true;
  idactive: any;
  id_cam: any;
  id_module: any;
  
  constructor(
    public camServ: CamServiceService,
    public modalCtrl: ModalController,
    public unique: UniquePipe,
    public loadingController: LoadingController,
    public toast: ToastController,
    public routing: Router,
    public route: ActivatedRoute,
    public location: Location) { }

  ngOnInit() {
    // this.getmodule();
    this.route.params.subscribe(params => {
      this.idactive = params['id_acti'];
      this.id_cam = params['id_cam'];
      if(params['edit']){
        
      }
    });
  }

  modulChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.getmodule(event.value.id);
    // console.log('picam:', event.value);
  }
  
  selectFile(){
    console.log(this.typeModule)
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

  myBackButton(){
    this.location.back();
  }
  addEvent(){
    if(this.selectedfile.length < 1){
      this.presentToast('Please Insert field correctly !');
    }
    let form = {
          fileChoose: this.selectedfile,
          id_activity: this.idactive,
          id_cam: this.id_cam,
          fornew: 'untuk tambah baru'
    }
    this.presentLoading();
        this.camServ.deleteFile(form).then((saving)=>{
          this.loadingController.dismiss();
        this.presentToast('Success Stored the Data !');
        this.routing.navigateByUrl('tabs');
    })
  }
  async presentToast(text) {
    const toastw = await this.toast.create({
      message: text,
      duration: 2000
    });
    toastw.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please Wait !! Sending the Data ...',
      duration: 2000,
      spinner: 'dots'
    });
    await loading.present();
  }
  getmodule(value){
    this.programSelect = false;
    this.progName = [];
    let val = value;
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

  progNameChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.selectfile = false;
    this.id_program_periode = event.value.id_program_periode;
    // console.log('picam:', event.value);
  }

}
