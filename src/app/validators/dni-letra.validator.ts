import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DNI_NIE } from './regex';

const LETRAS = 'TRWAGMYFPDXBNJZSQVHLCKE';

export const dniLetraValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor: string = (control.value ?? '').toUpperCase();
  if (!DNI_NIE.test(valor)) return null;
  const numero = valor.slice(0, -1).replace('X', '0').replace('Y', '1').replace('Z', '2');
  const letra = LETRAS[Number(numero) % 23];
  return letra === valor.slice(-1) ? null : { letra: true };
};
