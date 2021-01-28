import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public myForm: FormGroup;
  public student: Estudiante;
  public students: Estudiante[];
  constructor(private studentService: EstudianteService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        mesa: [''],
        sugerencias: [''],
        pedidos: [''],
        cantidad: [0],
        active: [false]
      });
  }

  create() {
    this.student = {
      mesa: this.myForm.controls.mesa.value,
      sugerencias: this.myForm.controls.sugerencias.value,
      pedidos: this.myForm.controls.pedidos.value,
      cantidad: this.myForm.controls.cantidad.value,
      active: this.myForm.controls.active.value
    };
    this.studentService.createStudent(this.student);
    this.cleanInputs();
  }

  private cleanInputs(): void {
    const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.myForm = this.fb.group({
      sugerencias: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      mesa: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      cantidad: [0, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      pedidos: ['', Validators.compose([Validators.required, Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      )])],
      active: [true, Validators.compose([Validators.required])],
    });
  }
}
