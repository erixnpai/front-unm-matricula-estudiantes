import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StepperOrientation, MatStepperModule, MatStepper} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-form-estudiantes',
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-estudiantes.html',
  styleUrl: './form-estudiantes.css'
})
export default class FormEstudiantes {
  private _formBuilder = inject(FormBuilder);
  @ViewChild('stepper') private stepper: MatStepper | undefined;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(){
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

}
