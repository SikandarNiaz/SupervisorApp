import { Component, OnInit, Input, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { Config } from 'src/assets/config';

@Component({
  selector: 'section-five-view',
  templateUrl: './section-five-view.component.html',
  styleUrls: ['./section-five-view.component.scss']
})
export class SectionFiveViewComponent implements OnInit {

  @Input('data') data;
  @ViewChild('childModal') childModal: ModalDirective;
  @Output('showModal') showModal: any = new EventEmitter<any>();
  @Input('isEditable') isEditable: any;
  selectedShop: any = {};
  selectedImage: any = {};
  // ip=environment.ip;
  configFile = Config;
  reevaluatorRole: any;
  audio = new Audio();
  userType: any;

  ip: any = this.configFile.BASE_URI;
  hover = 'hover';
  zoomOptions = {
    Mode: 'hover'
  };
  zoomedImage = 'https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg';


  constructor() { }

  ngOnInit() {
    this.reevaluatorRole = localStorage.getItem('Reevaluator');
    this.userType = localStorage.getItem('user_type');
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.data = changes.data.currentValue;
    this.selectedImage = this.data.imageList[0];

  }

  openSurvey(img) {
    // tslint:disable-next-line:triple-equals
    window.open(`${environment.hash}dashboard/ce_evaluation/list/details/${img.surveyId}`, '_blank');

  }

  setSelectedImage(img) {
    this.selectedImage = img;
  }


  showChildModal(shop): void {
    this.selectedShop = shop;
    this.showModal.emit(this.selectedImage);

    // this.childModal.show();
  }

  hideChildModal(): void {
    // this.childModal.hide();
  }
  playAudio() {
    this.audio.src = "assets/test.mp3";
    this.audio.src = this.ip + this.data.audioFileUrl.toString();
    console.log(this.ip + this.data.audioFileUrl.toString());
    this.audio.load();

    this.audio.play();
  }
  toggleVideo(){
  }


}
