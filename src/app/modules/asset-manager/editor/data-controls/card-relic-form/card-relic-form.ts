
import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, DestroyRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RelicCardData, GameResources } from '@common/interfaces';
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { ResourcesSelector } from "@common/ui/resources-selector/resources-selector";

@Component({
  selector: 'card-relic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelectModule,
    MatSlideToggleModule,
    CollectionSelect,
    ResourcesSelector
  ],
  templateUrl: './card-relic-form.html',
  styleUrl: './card-relic-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardRelicForm),
      multi: true
    }
  ]
})
export class CardRelicForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  collectionType = CollectionType.ART

  form: FormGroup = this.fb.group({
    title: [null],
    art: [null],
    description: [null],
    disassemble: [null],
    isPassive: [false]
  });

  private onChange: (v: RelicCardData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }
  setValue(value: RelicCardData | null) { this.onChange(value); }

  writeValue(patch: RelicCardData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as RelicCardData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
