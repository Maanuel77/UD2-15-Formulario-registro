import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dniLetraValidator } from '../../validators/dni-letra.validator';
import { CODIGO_POSTAL, DNI_NIE, ESPECIAL, MAYUSCULA, MINUSCULA, MOVIL, NUMERO, SOLO_LETRAS, USUARIO } from '../../validators/regex';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register-page',
  styleUrl: './register-page.css',
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private router = inject(Router);

  cursos = ['Angular desde cero', 'Java y Spring Boot', 'Python para datos', 'Desarrollo Android con Kotlin', 'JavaScript moderno'];
  regex = { MAYUSCULA, MINUSCULA, NUMERO, ESPECIAL };

  registerForm = new FormGroup({
    personales: new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(SOLO_LETRAS)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(SOLO_LETRAS)]),
      dni: new FormControl('', [Validators.required, Validators.pattern(DNI_NIE), dniLetraValidator]),
      movil: new FormControl('', [Validators.required, Validators.pattern(MOVIL)]),
    }),
    cuenta: new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(USUARIO)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(MAYUSCULA),
        Validators.pattern(MINUSCULA),
        Validators.pattern(NUMERO),
        Validators.pattern(ESPECIAL),
      ]),
    }),
    preferencias: new FormGroup({
      curso: new FormControl('', [Validators.required]),
      horas: new FormControl<number | null>(null, [Validators.required, Validators.min(2), Validators.max(40)]),
      codigoPostal: new FormControl('', [Validators.required, Validators.pattern(CODIGO_POSTAL)]),
    }),
  });

  hasError(field: string, error: string) {
    const control = this.registerForm.get(field);
    return control?.hasError(error) && (control.dirty || control.touched);
  }

  mostrar(field: string) {
    const control = this.registerForm.get(field);
    return control?.invalid && (control.dirty || control.touched);
  }

  passwordTocada() {
    const control = this.registerForm.get('cuenta.password');
    return control?.dirty || control?.touched;
  }

  passwordCumple(regex: RegExp) {
    return regex.test(this.registerForm.get('cuenta.password')?.value ?? '');
  }

  registrar() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);
    this.router.navigate(['/bienvenida', this.registerForm.value.cuenta?.usuario]);
  }
}
