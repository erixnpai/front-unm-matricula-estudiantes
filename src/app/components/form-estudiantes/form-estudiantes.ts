import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  StepperOrientation,
  MatStepperModule,
  MatStepper,
} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  provideNativeDateAdapter,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CatalogosService } from '../../services/matricula/catalogos/catalogos';

@Component({
  selector: 'app-form-estudiantes',
  imports: [
    MatStepperModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    NgSelectModule,
    MatInputModule,
  ],
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

  listpais = signal([]);
  listzona = signal([]);
  listzonaresidencia = signal([]);
  carrerastecnica = signal([]);
  dimensionNacionalidad = signal([]);
  listdepartamentos = signal([]);
  listmunicipio = signal<any[]>([]);
  listdepartamentosresidencia = signal([]);
  listmunicipioresidencia = signal<any[]>([]);
  listcomunidadorigen = signal<any[]>([]);
  listcomunidadresidencia = signal<any[]>([]);
  listsexo = signal([]);
  listetnias = signal([]);
  tiposangre = signal([]);
  tipoidentidad = signal([]);
  procedencia = signal([]);
  opcionclasifico = signal([]);
  listestadocivil = signal([]);
  tipoconexion = signal([]);
  anio_ingreso = signal([]);
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  catalogosService = inject(CatalogosService);

  constructor() {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.estudiantesForm = new FormGroup({
      // Stpper 1
      Id_estado_civil: new FormControl(null, [Validators.required]), //tabla detalle_estudiante
      Codigo_MINED: new FormControl('', [Validators.required]), //tabla estudiante
      Id_tipo_sangre: new FormControl(null, [Validators.required]), //tabla estudiante
      Id_etnia: new FormControl(null, [Validators.required]), //tabla estudiante
      Embarazo: new FormControl('', [Validators.required]), //tabla detalle_estudiante
      Meses_embarazo: new FormControl('', [Validators.required]), //tabla detalle_estudiante
      Tiene_hijos: new FormControl(false), // solo lo ocupo para el toggle
      Numero_hijos: new FormControl('', [Validators.required]), //tabla detalle_estudiante
      Dominio_lengua: new FormControl(null, [Validators.required]), //tabla detalle_estudiante lo ocupo para el toggle
      Dominio_idioma: new FormControl(null, [Validators.required]), //tabla detalle_estudiante lo ocupo para el toggle
      Id_idioma_lengua: new FormControl(null, [Validators.required]), //tabla Detalle_Estudiante_Lengua
      Id_nivel_alcanzado: new FormControl(null, [Validators.required]), //Detalle_Estudiante_Lengua

      // Stepper 2
      Id_dimension_nacionalidad: new FormControl(null, [Validators.required]), //tabla estudiante
      Id_pais_origen: new FormControl(null, [Validators.required]), //tabla estudiante
      Id_departamento_origen: new FormControl(null, [Validators.required]), //para filtrar el municipio este no es guardado
      Id_municipio_origen: new FormControl(null, [Validators.required]), //tabla estudiante 
      Id_zona_procedencia: new FormControl(null, [Validators.required]), //tabla estudiante 
      Id_comunidad_origen: new FormControl(null, [Validators.required]), //tabla estudiante 
      Id_departamento_residencia: new FormControl(null, [Validators.required]), //para filtrar el municipio este no es guardado
      Id_municipio_residencia: new FormControl(null, [Validators.required]), //tabla detalle_estudiante 
      Id_zona_residencia: new FormControl(null, [Validators.required]), //tabla detalle_estudiante 
      Id_comunidad_residencia: new FormControl(null, [Validators.required]), //tabla detalle_estudiante 

      // pendiente
      tiene_tecnica: new FormControl(false),
      Carrera_tecnica: new FormControl('', [Validators.required]),

      // Stepper 2
      //PENDIENTE provicia
      Id_estado_provincia: new FormControl(null, [Validators.required]), //queda pendiente
      Id_sexo: new FormControl(null, [Validators.required]),
      Id_tipo_identidad: new FormControl(null, [Validators.required]),
      //hay muchos datos para ponere en centro secu
      Id_centro_secundaria: new FormControl(null, [Validators.required]),
      Id_carrera_tecnica: new FormControl(null, [Validators.required]),
      Id_opcion_clasifico: new FormControl(null, [Validators.required]),

      // Stepper 3
      Id_tipo_conexion: new FormControl(null, [Validators.required]),
      // Id_ocupacion: new FormControl(null,[Validators.required]),
      // Id_sector_ocupacion: new FormControl(null,[Validators.required]),
      Id_entidad_laboral: new FormControl(null, [Validators.required]),
      Id_empesa_internet: new FormControl(null, [Validators.required]),
      Direccion_residencia: new FormControl('', [Validators.required]),
      Peso_libras: new FormControl('', [Validators.required]),
      Altura_cm: new FormControl('', [Validators.required]),
      // PregTrabaja: new FormControl(false),
      Trabaja: new FormControl('', [Validators.required]),

      // Stepper 4
      Id_periodo: new FormControl(null, [Validators.required]),
      Id_oferta: new FormControl(null, [Validators.required]),
      Id_ingreso: new FormControl(null, [Validators.required]),
      Motivo_traslado: new FormControl(null, [Validators.required]),
      Numero_asignaturas_segun_plan: new FormControl(null, [Validators.required]),
      Numero_asignaturas_inscritas: new FormControl(null, [Validators.required]),
      Numero_asignaturas_inscritas_mas1: new FormControl(null, [Validators.required]),
      Numero_asignaturas_convalidadas: new FormControl(null, [Validators.required]),
      Numero_asignaturas_aprovadas: new FormControl(null, [Validators.required]),
      Numero_asignaturas_reprobadas: new FormControl(null, [Validators.required]),
      Movilidad_academica: new FormControl(null, [Validators.required]),

      // ESTRUCTURA FAMILIAR STEPPER 6
      Id_tipo_parentesco: new FormControl(null, [Validators.required]),
      Id_ocupacion: new FormControl(null, [Validators.required]),
      Id_sector_ocupacion: new FormControl(null, [Validators.required]),
      NombresTutor: new FormControl('', [Validators.required]),
      Apellidos1tutor: new FormControl('', [Validators.required]),
      Apellidos2tutor: new FormControl('', [Validators.required]),
      Centro_trabajo: new FormControl('', [Validators.required]),
      Fecha_nacimientoTutor: new FormControl('', [Validators.required]),
      TrabajaTutor: new FormControl('', [Validators.required]),
      Depende_economicamente: new FormControl('', [Validators.required]),
      Ingreso_mensual: new FormControl('', [Validators.required]),
      // -----------------------------------------------------------
    });

    this.getCatalogos();
  }

  async getCatalogos() {
    try {
      const { data } = await this.catalogosService.getAllCatalogos([
        'sexo',
        'etnia',
        'dimension_Nacionalidad',
        'pais',
        'departamento',
        'comunidad_Comarca',
        'tipo_Sangre',
        'zona',
        'opcion_Clasifico',
        'estado_Civil',
        'tipo_Conexion',
        'ocupacion',
        'sector_Ocupacion',
        'entidad_Laboral',
        'empresa_Internet',
        'discapacidad',
        'deficiencia',
        'compania_Telefonica',
      ]);

      this.tiposangre.set(Array.isArray(data.tipo_Sangre) ? data.tipo_Sangre : []);
      this.listsexo.set(Array.isArray(data.sexo) ? data.sexo : []);
      this.listestadocivil.set(Array.isArray(data.estado_Civil) ? data.estado_Civil : []);
      this.listetnias.set(Array.isArray(data.etnia) ? data.etnia : []);
      this.dimensionNacionalidad.set(Array.isArray(data.dimension_Nacionalidad) ? data.dimension_Nacionalidad : []);
      this.listpais.set(Array.isArray(data.pais) ? data.pais : []);
      this.listzona.set(Array.isArray(data.zona) ? data.zona : []);
      this.listzonaresidencia.set(Array.isArray(data.zona) ? data.zona : []);
      this.listdepartamentos.set(Array.isArray(data.departamento) ? data.departamento : []);
      this.listdepartamentosresidencia.set(Array.isArray(data.departamento) ? data.departamento : []);
      this.listcomunidadorigen.set(Array.isArray(data.comunidad_Comarca) ? data.comunidad_Comarca : []);
      this.listcomunidadresidencia.set(Array.isArray(data.comunidad_Comarca) ? data.comunidad_Comarca : []);

      console.log('Catalogos obtenidos:', data);
    } catch (error) {
      console.log(error);
    }
  }

  async getMunicipiosByDepartamento() {
    try {
      const idDepartamento = this.estudiantesForm.get('Id_departamento_origen')?.value;

      if (!idDepartamento) {
        this.listmunicipio.set([]);
        this.estudiantesForm.get('Id_municipio_origen')?.reset();
        this.estudiantesForm.get('Id_comunidad_origen')?.reset();
        return;
      }
      const { data } = await this.catalogosService.getMunicipioBydepartamento(idDepartamento);

      if (!Array.isArray(data)) {
        this.listmunicipio.set([]);
        return;
      }
      this.listmunicipio.set(data);
      this.estudiantesForm.get('Id_municipio_origen')?.reset();
      console.log('datos municipios', data);
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listmunicipio.set([]);
      this.estudiantesForm.get('Id_municipio_origen')?.reset();
    }
  }

  async getMunicipioByComunidadesOrigen(){
    try {
      const idMunicipioOrigen = this.estudiantesForm.get('Id_municipio_origen')?.value;
      const {data} = await this.catalogosService.getMunicipioByComunidad(idMunicipioOrigen)

       if (!Array.isArray(data)) {
        this.listcomunidadorigen.set([]);
        return;
      }
      this.listcomunidadorigen.set(data)
      this.estudiantesForm.get('Id_comunidad_origen')?.reset();
      console.log('DAtos comunidad', data);
      
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listmunicipio.set([]);
      this.estudiantesForm.get('Id_comunidad_origen')?.reset();
    }
  }

  async getMunicipiosByDepartamentoResidencia() {
    try {
      const idDepartamentoResidencia = this.estudiantesForm.get('Id_departamento_residencia')?.value;

      if (!idDepartamentoResidencia) {
        this.listmunicipioresidencia.set([]);
        this.estudiantesForm.get('Id_municipio_residencia')?.reset();
        this.estudiantesForm.get('Id_comunidad_residencia')?.reset();
        return;
      }
      const { data } = await this.catalogosService.getMunicipioBydepartamento(idDepartamentoResidencia);

      if (!Array.isArray(data)) {
        this.listmunicipioresidencia.set([]);
        return;
      }
      this.listmunicipioresidencia.set(data);
      this.estudiantesForm.get('Id_municipio_residencia')?.reset();
      console.log('datos municipios', data);
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listmunicipioresidencia.set([]);
      this.estudiantesForm.get('Id_municipio_residencia')?.reset();
    }
  }

  async getMunicipioByComunidadesResidencia(){
    try {
      const idMunicipioResidencia = this.estudiantesForm.get('Id_municipio_residencia')?.value;
      const {data} = await this.catalogosService.getMunicipioByComunidad(idMunicipioResidencia)

       if (!Array.isArray(data)) {
        this.listcomunidadresidencia.set([]);
        return;
      }
      this.listcomunidadresidencia.set(data)
      this.estudiantesForm.get('Id_comunidad_residencia')?.reset();
      console.log('DAtos comunidad residencia', data);
      
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listmunicipio.set([]);
      this.estudiantesForm.get('Id_comunidad_residencia')?.reset();
    }
  }
}
