import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'card-form',
  imports: [],
  templateUrl: './card-form.html',
  styleUrl: './card-form.scss',
})
export class CardForm {
  @Input() form!: FormGroup;
}
