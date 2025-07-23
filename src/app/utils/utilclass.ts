import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export class utilClass {


    ///esta funcion sirve para convertir en mayusculas los textos ingresados
    static convertirAMayusculas(event: any, formGroup: FormGroup): void {
        const input = event.target;
        const name = input.getAttribute('formcontrolname');
        const control = formGroup.get(name); // Obtener el control directamente del FormGroup
        if (control) {
            // Aplica .trimLeft() para eliminar solo espacios al principio
            const inputValue = input.value.trimLeft().toUpperCase();
            control.setValue(inputValue, { emitEvent: false });
        }
    }

    static validarFormControls(formGroup: FormGroup, controlesAValidar: string[] = []): boolean {
        let valid = true;
        Object.keys(formGroup.controls).forEach(controlName => {
            if (!controlesAValidar.includes(controlName)) {
                return; // Saltar la validación si el control no está en la lista de controles a validar
            }
            const control = formGroup.get(controlName);
            if (!control?.valid) {
                valid = false;
                // Marcar el control como tocado si no es válido
                control?.markAsTouched({ onlySelf: true });
            }
        });
        return valid;
    }


    static EspaciosValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value && /\s/.test(control.value)) {
                return { 'espacios': true }; // Error si encuentra cualquier espacio
            }
            return null;
        };
    }

    static checkOnlySpaces(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value && control.value.toString().trim() === '') {
                return { 'soloEspacios': true }; // Devolver un error si el valor contiene solo espacios en blanco
            }
            return null; // El valor es válido
        };
    }

}