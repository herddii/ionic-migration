import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-viewvideo',
  templateUrl: './viewvideo.page.html',
  styleUrls: ['./viewvideo.page.scss'],
})
export class ViewvideoPage implements OnInit {

  safeUrl: any;
  value;

  constructor(

    public dom: DomSanitizer,
    public socialshare: SocialSharing,
    public router: ActivatedRoute,
    public route: Router,
    public location: Location

  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
    //   // this.value = this.value.concat(params['video']);
    //   console.log(params.video);
      if (this.route.getCurrentNavigation().extras.state) {
        this.value = this.route.getCurrentNavigation().extras.state.video;
      }
    });
    // console.log(this.value);
    this.transform(this.value);
  }

  transform(val){
    console.log(val);
    // val.forEach((x)=>{
    //   console.log(x);
    // })
    // console.log(val);
    if(val.content_file_download.toLowerCase().includes('.be')){
      let y = val.content_file_download;
      let z = y.replace('youtu.be/','');
      this.safeUrl = this.dom.bypassSecurityTrustResourceUrl('https://youtube.com/embed/'+z+'?rel=0&showinfo=0&ecver=1&autoplay=1');
    } else {
      this.safeUrl = this.dom.bypassSecurityTrustResourceUrl('https://youtube.com/embed/'+val.content_file_download+'?rel=0&showinfo=0&ecver=1&autoplay=1');
    }
  }

  share(val){
    var option = {
      message: 'Please See this Video',
      url: 'https://youtu.be/'+val
    }
    this.socialshare.shareWithOptions(option);
  }

  closeModal(){
    this.location.back();
  }

}
