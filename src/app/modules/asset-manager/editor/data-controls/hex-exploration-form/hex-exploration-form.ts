
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ExplorationHexData } from '@common/interfaces';
import { tap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { ResourcePicker } from "@common/ui/resource-picker/resource-picker";
import { CollectionSelect } from "@common/ui/collection-select/collection-select";
import { CollectionType } from '@common/ui/collection-select/collection.interface';

@Component({
  selector: 'hex-exploration-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    CollectionSelect
  ],
  templateUrl: './hex-exploration-form.html',
  styleUrl: './hex-exploration-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HexExplorationForm),
      multi: true
    }
  ]
})
export class HexExplorationForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  iconCollectionType = CollectionType.ICON;

  form: FormGroup = this.fb.group({
    icon: [null, Validators.required],
    color: [null]
  });

  private onChange: (v: ExplorationHexData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { }
  setValue(value: ExplorationHexData | null) { this.onChange(value) }

  writeValue(patch: ExplorationHexData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as ExplorationHexData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
