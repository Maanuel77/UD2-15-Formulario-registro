import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-success-page',
  styleUrl: './success-page.css',
  templateUrl: './success-page.html',
})
export class SuccessPage {
  usuario = inject(ActivatedRoute).snapshot.paramMap.get('usuario');
}
