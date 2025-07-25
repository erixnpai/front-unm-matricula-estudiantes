import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espera',
  imports: [],
  templateUrl: './espera.html',
  styleUrl: './espera.css'
})
export default class Espera {
  constructor(private readonly router: Router) {}

    async formregistro() { 
    this.router.navigate(['/formulario']);
  }
}
