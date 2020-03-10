import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CamServiceService } from '../../service/cam/cam-service.service';

@Component({
  selector: 'app-filetaskmodal',
  templateUrl: './filetaskmodal.page.html',
  styleUrls: ['./filetaskmodal.page.scss'],
})
export class FiletaskmodalPage implements OnInit {

  programID: number;
  typeModule: string;
  progList = [];
  title: string;
  test: any;
  selected = [];

  constructor(

    private modalController: ModalController,
    private navParams: NavParams,
    public camServ: CamServiceService

  ) { }

  ngOnInit() {
    this.programID = this.navParams.data.id;
    this.typeModule = this.navParams.data.typeModule;
    this.getData();
  }

  getData(){
    let form = {
      id: this.programID,
      type_module: this.typeModule,
      id_activity: ''
    };
    if(this.typeModule === 'SALESKIT_P'){
      this.title = 'Program List';
    } else if(this.typeModule === 'SALESKIT_R'){
      this.title = 'Ratecard List';
    } else if(this.typeModule === 'SALESKIT_S'){
      this.title = 'Specialoffer List';
    } else {
      this.title = 'SAM List';
    }
    this.camServ.getDatafile(form).then((datafile)=>{
      // console.log(datafile);
      this.progList = this.progList.concat(datafile);
      console.log(this.progList);
    })
  }

  async closeModal() {
    // const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(this.selected);
  }

  getVal(e,v){
    this.selected = this.selected.concat(e);
  }

}
