
import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, DestroyRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StormCardData } from '@common/interfaces';
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { filter, tap } from 'rxjs';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";

@Component({
  selector: 'card-storm-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelectModule,
    CollectionSelect
  ],
  templateUrl: './card-storm-form.html',
  styleUrl: './card-storm-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardStormForm),
      multi: true
    }
  ]
})
export class CardStormForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  collectionType = CollectionType.ART;

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    art: ['', Validators.required],
    description: ['', Validators.required]
  });

  private onChange: (v: StormCardData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }
  setValue(value: StormCardData | null) { this.onChange(value); }

  writeValue(patch: StormCardData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }


  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as StormCardData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
