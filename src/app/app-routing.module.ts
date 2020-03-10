import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './service/datacompiler/datacompiler.service';
const routes: Routes = [
  { path: 'awalan', loadChildren: './dashboard/awalan/awalan.module#AwalanPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'addcam', loadChildren: './cam/addcam/addcam.module#AddcamPageModule' },
  { path: 'monthly', loadChildren: './cam/monthly/monthly.module#MonthlyPageModule' },
  { path: 'viewdetail', loadChildren: './cam/viewdetail/viewdetail.module#ViewdetailPageModule' },
  { path: 'filetaskmodal', loadChildren: './cam/filetaskmodal/filetaskmodal.module#FiletaskmodalPageModule' },
  { path: 'editcam', loadChildren: './cam/editcam/editcam.module#EditcamPageModule' },
  { path: 'add-entertainment', loadChildren: './cam/add-entertainment/add-entertainment.module#AddEntertainmentPageModule' },
  { path: 'add-file', loadChildren: './cam/add-file/add-file.module#AddFilePageModule' },
  { path: 'transaction', loadChildren: './cam/transaction/transaction.module#TransactionPageModule' },
  { path: 'view-image', loadChildren: './cam/view-image/view-image.module#ViewImagePageModule' },
  { path: 'saleskit', loadChildren: './saleskit/home/home.module#HomePageModule' },
  { path: 'benefit', loadChildren: './saleskit/benefit/benefit.module#BenefitPageModule' },
  { path: 'modalbu', loadChildren: './modalbu/modalbu.module#ModalbuPageModule' },
  { path: 'viewimage', loadChildren: './viewimage/viewimage.module#ViewimagePageModule' },
  { path: 'viewvideo', loadChildren: './viewvideo/viewvideo.module#ViewvideoPageModule' },
  { path: 'download', loadChildren: './download/download.module#DownloadPageModule' },
  { path: 'popover', loadChildren: './popover/popover.module#PopoverPageModule' },
  { path: 'reimburse', loadChildren: './cam/reimburse/reimburse.module#ReimbursePageModule' },
  { path: 'reportcam', loadChildren: './cam/reportcam/reportcam.module#ReportcamPageModule' },
  { path: 'detailarticle', loadChildren: './dashboard/detailarticle/detailarticle.module#DetailarticlePageModule' },
  { path: 'client', loadChildren: './cam/client/client.module#ClientPageModule' },
  { path: 'birthday', loadChildren: './cam/birthday/birthday.module#BirthdayPageModule' },
  { path: 'company', loadChildren: './cam/company/company.module#CompanyPageModule' },
  { path: 'listam', loadChildren: './cam/listam/listam.module#ListamPageModule' },
  { path: 'detailclient', loadChildren: './cam/detailclient/detailclient.module#DetailclientPageModule' },
  { path: 'inputclient', loadChildren: './cam/inputclient/inputclient.module#InputclientPageModule' },
  { path: 'samconcept', loadChildren: './samconcept/samconcept.module#SamconceptPageModule' },
  { path: 'modalsam', loadChildren: './modalsam/modalsam.module#ModalsamPageModule' },
  { 
    path: 'photoviewer', 
    loadChildren: './photoviewer/photoviewer.module#PhotoviewerPageModule',
    resolve: {
      special: DataResolverService
    }},
  { path: 'companydet', loadChildren: './cam/companydet/companydet.module#CompanydetPageModule' },
  { path: 'reportactivity', loadChildren: './cam/reportactivity/reportactivity.module#ReportactivityPageModule' },
  // { path: '', loadChildren: './splash/splash.module#SplashPageModule' },
  // { path: 'transactionpage', loadChildren: './transactionpage/transactionpage.module#TransactionpagePageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
