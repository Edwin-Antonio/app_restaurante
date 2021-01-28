import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Estudiante } from 'src/app/models/estudiante';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  studentsCollection: AngularFirestoreCollection<Estudiante>;
  students: Observable<Estudiante[]>;
  studentsDoc: AngularFirestoreDocument<Estudiante>;

  editingStudent: Estudiante;

  constructor(private firestore: AngularFirestore) {
    this.studentsCollection = this.firestore.collection('apprestaurante');
    this.students = this.studentsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const datas = a.payload.doc.data() as Estudiante;
        datas.id = a.payload.doc.id;
        return datas;
      });
    }));
  }

  createStudent(student: Estudiante) {
    return this.firestore.collection('apprestaurante').add(student);
  }

  getStudents() {
    return this.firestore.collection('apprestaurante').snapshotChanges();
  }

  updateStudent(student: Estudiante, id: string) {
    this.firestore.doc('apprestaurante/' + id).update(student);
  }

  updateState(student: Estudiante){
    this.studentsDoc = this.firestore.doc(`apprestaurante/${student.id}`);
    this.studentsDoc.update(student);
  }

  deleteStudent(student: Estudiante) {
    this.studentsDoc = this.firestore.doc(`apprestaurante/${student.id}`);
    this.studentsDoc.delete();
  }
}
