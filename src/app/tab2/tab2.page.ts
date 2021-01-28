import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public id2: string;
  public obj: object;
  public students: Estudiante[];
  public editingStudent: Estudiante;
  constructor(private service: EstudianteService, private router: Router, private db: AngularFirestore) {
    this.service.getStudents().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id, ...e.payload.doc.data() as Estudiante,
          id2: e.payload.doc.data()
        };
      });
    });
  }

  update(student: Estudiante, active: boolean) {
    student.active = active;
    this.service.updateStudent(student, this.id2);
  }

  detail(student: Estudiante) {
    this.editingStudent = student;
    const navext: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(student)
      }
    };
    this.router.navigate(['/detail'], navext);
  }
}

