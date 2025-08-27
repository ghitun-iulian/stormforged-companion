import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'hex-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hex-form.html',
  styleUrl: './hex-form.scss',
})
export class HexForm {
  @Input() form!: FormGroup;
}
