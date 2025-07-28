import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import { StepperOrientation, MatStepperModule, MatStepper,
} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Data, Person } from '../../services/data/data';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PAISES } from '../../services/data/paises';
import { CARERRASTECNICA } from '../../services/data/carrerratecnica';
import { DIMENSIONNACIONALIDAD } from '../../services/data/dimensionnacionalidad';
import { DEPARTAMENTOS } from '../../services/data/departamentos';
import { MUNICIPIOS } from '../../services/data/municipios';
import { SEXO } from '../../services/data/sexo';
import { ETNIAS } from '../../services/data/etnias';
import { TIPOS_SANGRE } from '../../services/data/tiposangre';
import { TIPOS_IDENTIDAD } from '../../services/data/tipoidentidad';
import { ZONAS_PROCEDENCIA } from '../../services/data/zonaprocedencia';
import { OPCIONES_CLASIFICO } from '../../services/data/opcionclasifico';
import { ESTADO_CIVIL } from '../../services/data/estadocivil';
import { TIPO_CONEXION } from '../../services/data/tipoconexion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-form-estudiantes',
  imports: [MatStepperModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule, CommonModule, MatInputModule, MatDatepickerModule, NgSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './form-estudiantes.html',
  styleUrl: './form-estudiantes.css',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
})
export default class FormEstudiantes {
  // private _formBuilder = inject(FormBuilder);
  @ViewChild('stepper') private stepper: MatStepper | undefined;
  stepperOrientation: Observable<StepperOrientation>;
  estudiantesForm!: FormGroup;

   paises = PAISES;
   carrerastecnica = CARERRASTECNICA
   dimensionNacionalidad = DIMENSIONNACIONALIDAD
   departamentos = DEPARTAMENTOS
   municipio = MUNICIPIOS 
   sexo = SEXO
   etnias = ETNIAS
   tiposangre = TIPOS_SANGRE
   tipoidentidad = TIPOS_IDENTIDAD
   procedencia = ZONAS_PROCEDENCIA
   opcionclasifico = OPCIONES_CLASIFICO
   estadocivil = ESTADO_CIVIL
   tipoconexion = TIPO_CONEXION

  people$!: Observable<Person[]>;
	selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  constructor(private readonly dataService: Data) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.estudiantesForm = new FormGroup({
      // Stpper 1
      Nombres: new FormControl('', [Validators.required]),
      Apellidos1: new FormControl('', [Validators.required]),
      Apellido2: new FormControl('', [Validators.required]),
      Codigo_MINED: new FormControl('', [Validators.required]),
      Codigo_Persona: new FormControl('', [Validators.required]),
      Anio_bachillerato: new FormControl('', [Validators.required]),
      // pendiente
      Carrera_tecnica: new FormControl('', [Validators.required]),
      Numero_identidad: new FormControl('', [Validators.required]),
      Fecha_nacimiento: new FormControl('', [Validators.required]),
      FNota_promedio_ingreso: new FormControl('', [Validators.required]),
      Nota_final_ingreso: new FormControl('', [Validators.required]),
      Anio_ingreso_carrera: new FormControl('', [Validators.required]),

      // Stepper 2
      Id_dimension_nacionalidad: new FormControl(null,[Validators.required]),
      Id_pais_origen: new FormControl(null,[Validators.required]),
      Id_departamento_origen: new FormControl(null, [Validators.required]), //para filtrar el municipio este no es guardado
      Id_municipio_origen: new FormControl(null,[Validators.required]),
      //PENDIENTE COMUNIDAD 
      Id_comunidad_origen: new FormControl(null,[Validators.required]),
      //PENDIENTE provicia
      Id_estado_provincia: new FormControl(null,[Validators.required]), //queda pendiente
      Id_sexo: new FormControl(null,[Validators.required]),
      Id_etnia: new FormControl(null,[Validators.required]),
      Id_tipo_sangre: new FormControl(null,[Validators.required]),
      Id_tipo_identidad: new FormControl(null,[Validators.required]),
      Id_zona_procedencia: new FormControl(null,[Validators.required]),
      //hay muchos datos para ponere en centro secu
      Id_centro_secundaria: new FormControl(null,[Validators.required]),
      Id_carrera_tecnica: new FormControl(null,[Validators.required]),
      Id_opcion_clasifico: new FormControl(null,[Validators.required]),

      // Stepper 3
      Id_municipio_residencia: new FormControl(null,[Validators.required]),
      Id_comunidad_residencia: new FormControl(null,[Validators.required]),
      Id_zona_residencia: new FormControl(null,[Validators.required]),
      Id_estado_civil: new FormControl(null,[Validators.required]),
      Id_tipo_conexion: new FormControl(null,[Validators.required]),
      Id_ocupacion: new FormControl(null,[Validators.required]),
      Id_sector_ocupacion: new FormControl(null,[Validators.required]),
      Id_entidad_laboral: new FormControl(null,[Validators.required]),
      Id_empesa_internet: new FormControl(null,[Validators.required]),
      Tiene_hijos: new FormControl(false),
      Numero_hijos: new FormControl(null,[Validators.required]),
      Direccion_residencia: new FormControl('', [Validators.required]),
      Peso_libras: new FormControl('', [Validators.required]),
      Altura_cm: new FormControl('', [Validators.required]),
      Embarazo: new FormControl('', [Validators.required]),
      Meses_embarazo: new FormControl('', [Validators.required]),
      Domina_lenguas: new FormControl(false),
      Dominio_lengua: new FormControl(null, [Validators.required]),
      Domina_idioma: new FormControl(false),
      Dominio_idioma: new FormControl(null, [Validators.required]),
      // PregTrabaja: new FormControl(false),
      Trabaja: new FormControl('', [Validators.required]),

      // Stepper 4
      Id_periodo: new FormControl(null,[Validators.required]),
      Id_oferta: new FormControl(null,[Validators.required]),
      Id_ingreso: new FormControl(null,[Validators.required]),
      Motivo_traslado: new FormControl(null,[Validators.required]),
      Numero_asignaturas_segun_plan: new FormControl(null,[Validators.required]),
      Numero_asignaturas_inscritas: new FormControl(null,[Validators.required]),
      Numero_asignaturas_inscritas_mas1: new FormControl(null,[Validators.required]),
      Numero_asignaturas_convalidadas: new FormControl(null,[Validators.required]),
      Numero_asignaturas_aprovadas: new FormControl(null,[Validators.required]),
      Numero_asignaturas_reprobadas: new FormControl(null,[Validators.required]),
      Movilidad_academica: new FormControl(null,[Validators.required]),
    });
  }
  ngOnInit() {
    this.people$ = this.dataService.getPeople();
   
  }

  datos = [
    {
      id: '5a15b13c36e7a7f00cf0d7cb',
      name: 'John Doe', 
    },
    {
      id: '5a15b13c36e7a7f00cf0d7cc',
      name: 'Jane Smith',}
  ]


}
