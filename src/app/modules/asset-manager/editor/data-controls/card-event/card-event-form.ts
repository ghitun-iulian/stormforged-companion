
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EventCardData } from '@common/interfaces';
import { filter, tap } from 'rxjs';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { CollectionPicker } from "@common/ui/collection-picker/collection-picker";

@Component({
  selector: 'card-event-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelectModule,
    CollectionSelect,
    CollectionPicker
  ],
  templateUrl: './card-event-form.html',
  styleUrl: './card-event-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardEventForm),
      multi: true
    }
  ]
})
export class CardEventForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  collectionType = CollectionType.ART

  form: FormGroup = this.fb.group({
    title: [null],
    art: [null],
    description: [null]
  });

  private onChange: (v: EventCardData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }
  setValue(value: EventCardData | null) { this.onChange(value); }

  writeValue(patch: EventCardData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as EventCardData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
