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
import { SweetModal } from '../../utils/sweetalert';

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
  dimensionNacionalidad = signal([]);
  listdepartamentos = signal([]);
  listmunicipio = signal<any[]>([]);
  listdepartamentosresidencia = signal([]);
  listmunicipioresidencia = signal<any[]>([]);
  listdepartamentosculmino = signal([]);
  listmunicipioculmino = signal<any[]>([]);
  listcentrosecundario = signal<any[]>([]);
  listcomunidadorigen = signal<any[]>([]);
  listcomunidadresidencia = signal<any[]>([]);
  listTipoConexion = signal([]);
  listproveedorInternet = signal([]);
  listDiscapacidad = signal([]);
  listDeficiencia = signal([]);
  listCompaniaTelef = signal<{ Id: number; Nombre: string }[]>([]);
  listsexo = signal([]);
  listIdiomas = signal([]);
  listLenguas = signal<{ Id: number; Nombre: string }[]>([]);
  listNivelAlcanzadoIdiomas = signal([]);
  listNivelAlcanzadoLenguas = signal([]);
  listetnias = signal([]);
  tiposangre = signal([]);
  tipoidentidad = signal([]);
  listestadocivil = signal([]);
  listocupacion = signal([]);
  listsectorocupacion = signal([]);
  listentidadlaboral = signal([]);
  listdispositivos = signal<any[]>([]);

  nuevoTelefono: any = {
    Id_compania_telefonica: null,
    Numero_telefono: '',
  };
  telefonosAgregados: any[] = [];

  lenguasAgregadas: any[] = [];
  // dominaLenguas: boolean = false;
  nuevaLengua: any = {
    Id_idioma_lengua: null,
    Id_nivel_alcanzado: null
  };

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
      Altura_cm: new FormControl('', [Validators.required]), //tabla detalle_estudiante
      Peso_libras: new FormControl('', [Validators.required]), //tabla detalle_estudiante
      Id_discapacidad: new FormControl(null, [Validators.required]), //tabla Detalle_Discapacidad
      Id_deficiencia: new FormControl(null, [Validators.required]), //tabla Detalle_Deficiencia

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
      Direccion_residencia: new FormControl(null, [Validators.required]), //tabla detalle_estudiante

      // Stepper 3
      Trabaja: new FormControl('', [Validators.required]), //tabla detalle_estudiante
      Id_ocupacion: new FormControl(null, [Validators.required]), //tabla detalle_estudiante
      Id_sector_ocupacion: new FormControl(null, [Validators.required]), //tabla detalle_estudiante
      Id_entidad_laboral: new FormControl(null, [Validators.required]), //tabla detalle_estudiante
      Numero_inss: new FormControl('', [Validators.required]), //tabla estudiante

      // Stepper 4
      Id_departamento_culmino: new FormControl(null, [Validators.required]), //para filtrar el municipio este no es guardado
      Id_municipio_culmino: new FormControl(null, [Validators.required]), //para filtrar los centro secundaira este no es guardado
      Id_centro_secundaria: new FormControl(null, [Validators.required]), //tabla estudiante
      Anio_bachillerato: new FormControl(null, [Validators.required]), //tabla estudiante
      tiene_tecnica: new FormControl(false), // lo ocupo solo en toggle
      Carrera_tecnica: new FormControl(null, [Validators.required]), //tabla estudiante
      Anio_ingreso_carrera: new FormControl(null, [Validators.required]), //tabla estudiante

      // Stepper 5
      Id_dispositivo: new FormControl(null, [Validators.required]), // tabla Detalle_Dispositivo
      Id_empesa_internet: new FormControl(null, [Validators.required]), // tabla Detalle_Estudiante
      Id_tipo_conexion: new FormControl(null, [Validators.required]), // tabla Detalle_Estudiante
      Numero_telefono: new FormControl(null, [Validators.required]), // tabla telefono
      Id_compania_telefonica: new FormControl(null, [Validators.required]), // tabla telefono

      // -----------------------------------------------------------
    });

    this.getCatalogos();
    this.getDispositivos();
    this.getLenguas()
    this.getIdiomas()
    this.getNivelAlcanzadoIdiomas()
    this.getNivelAlcanzadoLenguas()
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
      this.listestadocivil.set(
        Array.isArray(data.estado_Civil) ? data.estado_Civil : []
      );
      this.listetnias.set(Array.isArray(data.etnia) ? data.etnia : []);
      this.dimensionNacionalidad.set(
        Array.isArray(data.dimension_Nacionalidad)
          ? data.dimension_Nacionalidad
          : []
      );
      this.listpais.set(Array.isArray(data.pais) ? data.pais : []);
      this.listzona.set(Array.isArray(data.zona) ? data.zona : []);
      this.listzonaresidencia.set(Array.isArray(data.zona) ? data.zona : []);
      this.listdepartamentos.set(Array.isArray(data.departamento) ? data.departamento : []);
      this.listdepartamentosresidencia.set(Array.isArray(data.departamento) ? data.departamento : []);
      this.listcomunidadorigen.set(Array.isArray(data.comunidad_Comarca) ? data.comunidad_Comarca : []);
      this.listcomunidadresidencia.set(Array.isArray(data.comunidad_Comarca) ? data.comunidad_Comarca : []);
      this.listocupacion.set(Array.isArray(data.ocupacion) ? data.ocupacion : []);
      this.listsectorocupacion.set(Array.isArray(data.sector_Ocupacion) ? data.sector_Ocupacion : []);
      this.listentidadlaboral.set(Array.isArray(data.entidad_Laboral) ? data.entidad_Laboral : []);
      this.listdepartamentosculmino.set(Array.isArray(data.departamento) ? data.departamento : []);
      this.listTipoConexion.set(Array.isArray(data.tipo_Conexion) ? data.tipo_Conexion : []);
      this.listproveedorInternet.set(Array.isArray(data.empresa_Internet) ? data.empresa_Internet : []);
      this.listDiscapacidad.set(Array.isArray(data.discapacidad) ? data.discapacidad : []);
      this.listDeficiencia.set(Array.isArray(data.deficiencia) ? data.deficiencia : []);
      this.listCompaniaTelef.set(Array.isArray(data.compania_Telefonica) ? data.compania_Telefonica : []);

      console.log('Catalogos obtenidos:', data);
    } catch (error) {
      console.log(error);
    }
  }

  async getMunicipiosByDepartamento() {
    try {
      const idDepartamento = this.estudiantesForm.get(
        'Id_departamento_origen'
      )?.value;

      if (!idDepartamento) {
        this.listmunicipio.set([]);
        this.estudiantesForm.get('Id_municipio_origen')?.reset();
        this.estudiantesForm.get('Id_comunidad_origen')?.reset();
        return;
      }
      const { data } = await this.catalogosService.getMunicipioBydepartamento(
        idDepartamento
      );

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

  async getMunicipioByComunidadesOrigen() {
    try {
      const idMunicipioOrigen = this.estudiantesForm.get(
        'Id_municipio_origen'
      )?.value;
      const { data } = await this.catalogosService.getMunicipioByComunidad(
        idMunicipioOrigen
      );

      if (!Array.isArray(data)) {
        this.listcomunidadorigen.set([]);
        return;
      }
      this.listcomunidadorigen.set(data);
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
      const idDepartamentoResidencia = this.estudiantesForm.get(
        'Id_departamento_residencia'
      )?.value;

      if (!idDepartamentoResidencia) {
        this.listmunicipioresidencia.set([]);
        this.estudiantesForm.get('Id_municipio_residencia')?.reset();
        this.estudiantesForm.get('Id_comunidad_residencia')?.reset();
        return;
      }
      const { data } = await this.catalogosService.getMunicipioBydepartamento(
        idDepartamentoResidencia
      );

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

  async getMunicipioByComunidadesResidencia() {
    try {
      const idMunicipioResidencia = this.estudiantesForm.get(
        'Id_municipio_residencia'
      )?.value;
      const { data } = await this.catalogosService.getMunicipioByComunidad(
        idMunicipioResidencia
      );

      if (!Array.isArray(data)) {
        this.listcomunidadresidencia.set([]);
        return;
      }
      this.listcomunidadresidencia.set(data);
      this.estudiantesForm.get('Id_comunidad_residencia')?.reset();
      console.log('DAtos comunidad residencia', data);
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listmunicipio.set([]);
      this.estudiantesForm.get('Id_comunidad_residencia')?.reset();
    }
  }

  async getMunicipiosByDepartamentoCulmino() {
    try {
      const idDepartamentoCulmino = this.estudiantesForm.get(
        'Id_departamento_culmino'
      )?.value;

      if (!idDepartamentoCulmino) {
        this.listmunicipioculmino.set([]);
        this.estudiantesForm.get('Id_municipio_culmino')?.reset();
        this.estudiantesForm.get('Id_centro_secundaria')?.reset();
        return;
      }
      const { data } = await this.catalogosService.getMunicipioBydepartamento(
        idDepartamentoCulmino
      );

      if (!Array.isArray(data)) {
        this.listmunicipioculmino.set([]);
        return;
      }
      this.listmunicipioculmino.set(data);
      this.estudiantesForm.get('Id_municipio_culmino')?.reset();
      console.log('datos municipios', data);
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listmunicipioculmino.set([]);
      this.estudiantesForm.get('Id_municipio_culmino')?.reset();
    }
  }

  async getMunicipiosByCentroSecundaria() {
    try {
      const idMunicipioCulmino = this.estudiantesForm.get(
        'Id_municipio_culmino'
      )?.value;
      const { data } =
        await this.catalogosService.getMunicipioByCentroSecundaria(
          idMunicipioCulmino
        );

      if (!Array.isArray(data)) {
        this.listcentrosecundario.set([]);
        return;
      }
      this.listcentrosecundario.set(data);
      this.estudiantesForm.get('Id_centro_secundaria')?.reset();
      console.log('DAtos centro', data);
    } catch (error) {
      console.error('Error al obtener municipios:', error);
      this.listcentrosecundario.set([]);
      this.estudiantesForm.get('Id_centro_secundaria')?.reset();
    }
  }

  async getIdiomas(){
    try {
      const { data } = await this.catalogosService.getIdiomasLenguasByNumber(1);
      this.listIdiomas.set(data);
    } catch (error) {
      console.error('Error al obtener idiomas:', error);
      this.listIdiomas.set([]);
    }
  }
  async getLenguas(){
    try {
      const { data } = await this.catalogosService.getIdiomasLenguasByNumber(2);
      this.listLenguas.set(data);
    } catch (error) {
      console.error('Error al obtener idiomas:', error);
      this.listLenguas.set([]);
    }
  }

  async getDispositivos() {
    try {
      const { data } = await this.catalogosService.getDispositivos();
      this.listdispositivos.set(data);
      console.log('Dispositivos obtenidos:', data);
    } catch (error) {
      console.error('Error al obtener dispositivos:', error);
      this.listdispositivos.set([]);
    }
  }

  async getNivelAlcanzadoIdiomas() {
    try {
      const { data } = await this.catalogosService.getNivelAlcanzado();
      this.listNivelAlcanzadoIdiomas.set(data);
      console.log('Nivel alcanzado obtenido:', this.listNivelAlcanzadoIdiomas);
    } catch (error) {
      console.error('Error al obtener nivel alcanzado:', error);  
      this.listNivelAlcanzadoIdiomas.set([]);
    }
  }
  async getNivelAlcanzadoLenguas() {
    try {
      const { data } = await this.catalogosService.getNivelAlcanzado();
      this.listNivelAlcanzadoLenguas.set(data);
      console.log('Nivel alcanzado obtenido:', this.listNivelAlcanzadoLenguas);
    } catch (error) {
      console.error('Error al obtener nivel alcanzado:', error);  
      this.listNivelAlcanzadoLenguas.set([]);
    }
  }

  formatearTelefono(event: any) {
    const input = event.target.value;

    // 1. Eliminar todos los caracteres no numéricos excepto guiones
    const cleaned = input.replace(/[^\d-]/g, '');

    // 2. Limitar a 8 dígitos + guión
    const digits = cleaned.replace(/-/g, '').slice(0, 8);

    // 3. Insertar guión después de 4 dígitos
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }

    // 4. Actualizar el valor del formulario
    this.estudiantesForm.controls['Numero_telefono'].setValue(formatted, {
      emitEvent: false,
    });

    // 5. Forzar validación
    this.estudiantesForm.controls['Numero_telefono'].updateValueAndValidity();
  }

  // Función para agregar teléfono
  agregarTelefono() {
    if (
      this.nuevoTelefono.Id_compania_telefonica &&
      this.nuevoTelefono.Numero_telefono
    ) {
      // Clonar el objeto para evitar referencia
      const nuevo = { ...this.nuevoTelefono };

      this.telefonosAgregados.push(nuevo);

      // Resetear el formulario
      this.nuevoTelefono = {
        Id_compania_telefonica: null,
        Numero_telefono: '',
      };
    }
  }

  
  // Función para obtener nombre de compañía
  obtenerNombreCompania(id: number): string {
    const compania = this.listCompaniaTelef().find((c) => c.Id === id);
    return compania ? compania.Nombre : 'Desconocida';
  }
  
  // Función para eliminar teléfono
  eliminarTelefono(index: number) {
    this.telefonosAgregados.splice(index, 1);
  }
  
  toggleDominioLenguas() {
    const dominioLengua = this.estudiantesForm.get('Dominio_lengua')?.value;
    if (!dominioLengua) {
      this.lenguasAgregadas = []; // Limpiar lista si desactiva
    }
  }
  agregarLengua() {
  if (this.nuevaLengua.Id_idioma_lengua && this.nuevaLengua.Id_nivel_alcanzado) {
    const nueva = {...this.nuevaLengua};
    this.lenguasAgregadas.push(nueva);
    
    // Resetear formulario
    this.nuevaLengua = {
      Id_idioma_lengua: null,
      Id_nivel_alcanzado: null
    };
  }
}

eliminarLengua(index: number) {
  this.lenguasAgregadas.splice(index, 1);
}

obtenerNombreLengua(id: number): string {
  const lengua = this.listLenguas().find(l => l.Id === id);
  return lengua ? lengua.Nombre : 'Lengua desconocida';
}

obtenerNivelLengua(id: number): string {
  const niveles = this.listNivelAlcanzadoLenguas() as { Id: number; Nombre: string }[];
  const nivel = niveles.find(n => n.Id === id);
  return nivel ? nivel.Nombre : 'Nivel desconocido';
}
  async buttonSweet() {
    SweetModal({
      icon: 'info',
      title: 'Estado de cuenta',
      html: `
                <p class="mb-2 text-center">Está seguro de guardar sus datos?</p>
            `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#6b7280',
    });
  }
}
