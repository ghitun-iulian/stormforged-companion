
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { primaryColor, ResourceHexData } from '@common/interfaces';
import { CollectionType } from '@common/ui/collection-select/collection.interface';
import { ResourcesSelector } from "@common/ui/resources-selector/resources-selector";
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'hex-resource-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelectModule,
    ResourcesSelector
  ],
  templateUrl: './hex-resource-form.html',
  styleUrl: './hex-resource-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HexResourceForm),
      multi: true
    }
  ]
})
export class HexResourceForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  form: FormGroup = this.fb.group({
    resources: [null, Validators.required],
    color: [primaryColor]
  });

  private onChange: (v: ResourceHexData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { }
  setValue(value: ResourceHexData | null) { this.onChange(value) }

  writeValue(patch: ResourceHexData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as ResourceHexData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
