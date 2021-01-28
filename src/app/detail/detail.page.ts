import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { Tab2Page } from '../tab2/tab2.page';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  students: Tab2Page;
  student: Estudiante;
  constructor(private service: EstudianteService, private actroute: ActivatedRoute, private route: Router, private toast: ToastController){
    this.actroute.queryParams.subscribe( params => {
      if (params && params.special){
        this.student = JSON.parse(params.special) as Estudiante;
        console.log(this.student);
      }
    });
  }

  ngOnInit() {
  }

  delete(id: Estudiante){
    this.service.deleteStudent(id);
    this.presentToast();
    this.route.navigate(['/']);
  }

  updateState(id: Estudiante){
    this.service.updateState(id);
    this.presentToastUpdate();
    this.route.navigate(['/']);
  }

  async presentToast(){
    const t = await this.toast.create({
      message: 'Order deleted',
      duration: 2000
    });

    t.present();
  }

  async presentToastUpdate(){
    const t = await this.toast.create({
      message: 'Student update',
      duration: 2000
    });

    t.present();
  }

}
