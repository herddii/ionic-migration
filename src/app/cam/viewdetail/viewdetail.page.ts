import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamServiceService } from '../../service/cam/cam-service.service';
import { Location } from "@angular/common";
// import { ScrollHideConfig } from '../../scroll-hide.directive';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { getSymbolIterator } from '@angular/core/src/util';




@Component({
  selector: 'app-viewdetail',
  templateUrl: './viewdetail.page.html',
  styleUrls: ['./viewdetail.page.scss'],
})
export class ViewdetailPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  // footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  // headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 60 };
  sub: any;
  detailtask = [];
  partner = [];
  client = [];
  brand = [];
  systeminfo = [];
  entertainment = [];
  file = [];
  id_cam: any;
  idactive: any;
  segmentChoose: any = 'Details';
  comment = [];
  userid: string;
  editorMsg: string;
  images: string;
  loadView: boolean = true;
  buttonclose: boolean = false;

  //ini buat cost
  idactiv_for: any;
  cam_cost: any;
  title: any;
  nota: any;
  cost_by: any;
  cost: any;
  desc: any;
  numbered: any;

  //ini buat file
  nameFile: any;
  modul: any;
  created_at: any;
  id_activityFile:any;
  id_cam_fileFile:any;
  id_file: any;
  id_module:any;
  gambarfile = [];
  forimages = [];
  constructor(

    private route: ActivatedRoute,
    public cam: CamServiceService,
    public location: Location,
    public loading: LoadingController,
    public toast: ToastController,
    public routing: Router

  ) { 

    

  }

  ngOnInit() {
    this.cam.getMe().then(x => {
      this.userid = x['USER_NAME'];
      this.images = x['IMAGES'];
    });
    this.route.params.subscribe(params => {
      this.idactive = params['id_acti'];
      this.id_cam = params['id_cam'];
      this.getDetailTask(this.idactive, this.id_cam);
    });
  }
  onPress(ev,identity,index){
    // console.log(identity)
    console.log({
      ev:ev, 
      identity:identity, 
      index:index,
      entertainment: this.entertainment
    })
    this.buttonclose = true;
    this.entertainment[index].choosen = true;
    // if(index - 1 > 0){
    //   // this.entertainment[index-1].choosen = false;
    // }
    // this.entertainment[index+1].choosen = false;
    this.idactiv_for = identity.id_activity;
    this.cam_cost = parseInt(identity.id_cam_cost);
    this.title = identity.title;
    this.nota = identity.nota;
    this.cost_by = identity.cost_by;
    this.cost = identity.cost;
    this.desc = identity.desc;
    this.numbered = index;
    console.log(this.cam_cost);
  }

  onPressFile(ev, identity, index) {
    
    console.log({
      ev:ev, 
      identity:identity, 
      index:index
    })
    this.buttonclose = true;
    this.file[index].choosen = true;

    this.nameFile = identity.nameFile;
    this.modul = identity.modul;
    this.created_at = identity.created_at;
    this.id_activityFile = identity.id_activity;
    this.id_cam_fileFile = identity.id_cam_file;
    this.id_file = identity.id_file;
    this.id_module = identity.id_module;
  }

  gotoview(identity,index){
    this.entertainment[index].choosen = false;
    this.buttonclose = false;
  }

  gotoviewFile(identity,index){
    this.file[index].choosen = false;
    this.buttonclose = false;
  }

  onPressUp(ev){
    console.log(ev);
  }
  getDetailTask(idactive, idcam) {
    this.buttonclose = false;
    this.cam.getDetailTask(idactive, idcam).then((data) => {
      let detail = [];
      detail = detail.concat(data);
      detail.forEach((b, a) => {
        this.detailtask = [];
        this.partner = [];
        this.client = [];
        this.brand = [];
        this.systeminfo = [];
        this.entertainment = [];
        this.file = [];
        this.comment = [];
        this.getdetailtask(b,a);
        this.get_entertainment(b);
        this.getImages(b);
        this.get_comment(b);
        this.get_cam_partner(b);
        this.get_cam_client(b);

      }) 
    })
    setTimeout(()=>{this.loadView = false;},2000);

  }


  getFile(ev){
    this.cam.getFilesImage(ev).then((data) =>{
      return data['image'];
          })
  }

  getdetailtask(b,a) {
    let getdatestart_query = new Date(b.start_date);
    let getdateEnd_query = new Date(b.end_date);
    this.detailtask = this.detailtask.concat({
      subject: b['cam_activity'][a].subject,
      status: b['cam_activity'][a].status,
      from: b.user.USER_NAME,
      description: b['cam_activity'][a].description,
      agencypintu: b.agencypintu.nama_agencypintu,
      advertiser: b.advertiser.nama_adv,
      location: b['cam_activity'][a].location,
      tanggal: `${this.addZero(getdatestart_query.getDate())} ${getdatestart_query.toLocaleString('default', { month: 'short' })} ${this.addZero(getdatestart_query.getFullYear())}`,
      waktu_start: `${this.addZero(getdatestart_query.getHours())} : ${this.addZero(getdatestart_query.getMinutes())}`,
      waktu_end: `${this.addZero(getdateEnd_query.getHours())} : ${this.addZero(getdateEnd_query.getMinutes())}`
    });
    this.systeminfo = this.systeminfo.concat({
      start: b.start_date,
      end: b.end_date,
      tanggal: `${this.addZero(getdatestart_query.getDate())} - ${this.addZero(getdatestart_query.getMonth())} - ${getdatestart_query.getFullYear()}`,
      hours: `${this.addZero(getdatestart_query.getHours())}:${this.addZero(getdatestart_query.getMinutes())} - ${this.addZero(getdateEnd_query.getHours())}:${this.addZero(getdateEnd_query.getMinutes())}`

    });
  }

  async get_cam_bran(val){
    await val['cam_brand'].forEach(f => {
      this.brand = this.brand.concat({
        brand: f['brand'].nama_brand
      })
    })
  }


  async get_entertainment(val){
    await val['cam_activity'][0].cam_cost.forEach(v => {
      this.entertainment = this.entertainment.concat({
        title: v.title,
        nota: v.nota,
        cost_by: v.cost_by,
        cost: v.cost,
        desc: v.cost_description,
        id_cam_cost: v.id_cam_cost,
        id_activity: v.id_activity,
        choosen: false
      });
    })
  }

  async get_cam_partner(val){
    await val['cam_partner'].forEach(d => {
      this.partner = this.partner.concat({
        partner: d['name_partner'].USER_NAME
      });
    });
  }

  async get_comment(val){
    await val['commen'].forEach(b => {
      this.comment = this.comment.concat({
        userId: b.name_komen.USER_NAME,
        chat: b.comment,
        images: b.name_komen.IMAGES
      })
    })
  }

  async get_cam_client(val){
   await val['cam_client'].forEach(e => {
      this.client = this.client.concat({
        client: e['name_userclient_account']['edit_namaclient'].nama
      });
    });
  }

  async getImages(val) {
    await val['cam_activity'][0].cam_file.forEach((m, n) => {
      this.cam.getFilesImage(m.id_cam_file).then((xxxs) => {
        this.forimages = this.forimages.concat(xxxs['image']);
      }).then(ooo => {
        this.file = this.file.concat({
          nameFile: m.name_file,
          modul: m.module,
          choosen: false,
          created_at: m.created_at,
          id_activity: m.id_activity,
          id_cam_file: m.id_cam_file,
          id_file: m.id_file,
          id_module: m.id_module,
          images: this.forimages[n]
        })
        console.log(this.file);
      })
    })
  }
  

  addRowEntertainment(){
    this.routing.navigate(['/add-entertainment',{
      id_acti: this.idactive,
      id_cam: this.id_cam
    }]);
  }

  editCost(){
    this.routing.navigate(['/add-entertainment', {
      id_cam_cost: this.cam_cost,
      id_acti: this.idactiv_for,
      title: this.title,
      nota: this.nota,
      cost_by: this.cost_by,
      cost: this.cost,
      desc: this.desc,
    }]);
  }

  addRowFile(){
    this.routing.navigate(['/add-file',{
      id_acti: this.idactive,
      id_cam: this.id_cam,
      id_module: this.id_module
    }]);
  }

  editFile(){
    this.routing.navigate(['/add-file', {
      id_acti: this.idactive,
      id_cam: this.id_cam,
      id_module: this.id_module
    }]);
  }


  editCam(){
    console.log(this.idactive, this.id_cam);
    this.routing.navigate(['/editcam',{
      id_acti : this.idactive,
      id_cam: this.id_cam
    }]);
  }


  sendMsg(){
    let form = {
      id_cam: this.id_cam,
      comment: this.editorMsg
    }
    this.cam.sendMsg(form).then( x => {
      this.getDetailTask(this.idactive, this.id_cam);
      this.editorMsg = '';
    });
  }

  segmentChanged(ev){
    this.segmentChoose = ev.detail.value;
  }

  myBackButton(){
    this.location.back();
  }

  deleteCost(){
    console.log(this.cam_cost);
    this.cam.deleteCamCost(this.cam_cost,this.idactiv_for).then((cc)=>{
      this.presentToast(cc['data']);
      this.getDetailTask(this.idactive, this.id_cam);
    })
  }

  deleteFile(){
    let form = {
      id_activity: this.id_activityFile,
      module: this.modul,
      id_file: this.id_file,
      id_module: this.id_module
    }
    this.cam.deleteFile(form).then((cc)=>{
      this.presentToast(cc['data']);
      this.getDetailTask(this.idactive, this.id_cam);
    })
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  deleteAct(){
    // console.log(this.id_cam)
    this.presentLoadingWithOptions();
    this.cam.deleteCam(this.id_cam).then(x =>{
      this.presentToast(x['data']);
    }).then(x => {
      this.loading.dismiss();
      this.routing.navigateByUrl('tabs');
    });
  }

  async presentLoadingWithOptions() {
    const loading = await this.loading.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async presentToast(text) {
    const toastw = await this.toast.create({
      message: text,
      duration: 2000
    });
    toastw.present();
  }

}
