import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { utilClass } from '../../utils/utilclass';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export default class Login {
  loginForm!: FormGroup;


  constructor(private readonly router: Router) {

    this.loginForm = new FormGroup({
      Cedula: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}-\d{6}-\d{4}[A-Za-z]$/)]),
      Pass: new FormControl('', [Validators.required, utilClass.EspaciosValidator, Validators.minLength(5)]),
    })

  }

  esperaBtn(){
    this.router.navigate(['espera']);
  }


  formatearCedula(event: any) {
    const input = event.target.value;
    const cleaned = input.replace(/[^0-9A-Za-z]/g, '');

    const digits = cleaned.slice(0, 13).replace(/\D/g, '');
    const letter = cleaned.slice(13, 14).replace(/[^A-Za-z]/g, '').toUpperCase();

    let formatted = digits;
    // Añade guiones en las posiciones correctas
    if (digits.length > 3) formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length > 9) formatted = `${formatted.slice(0, 10)}-${formatted.slice(10)}`;

    formatted = `${formatted}${letter}`.slice(0, 16);

    // Actualiza el formulario
    this.loginForm.controls['Cedula'].setValue(formatted, { emitEvent: false });
    this.loginForm.controls['Cedula'].setErrors(/^\d{3}-\d{6}-\d{4}[A-Za-z]$/.test(formatted) ? null : { 'incorrect': true }
    );
  }
}
