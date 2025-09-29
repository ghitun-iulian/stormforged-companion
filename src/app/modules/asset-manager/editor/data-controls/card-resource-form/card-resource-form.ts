
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { primaryColor, ResourceCardData } from '@common/interfaces';
import { ResourcePicker } from '@common/ui/resource-picker/resource-picker';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'card-resource-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    ResourcePicker,
    MatFormField,
    MatInputModule
  ],
  templateUrl: './card-resource-form.html',
  styleUrl: './card-resource-form.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardResourceForm),
      multi: true
    }
  ]
})

export class CardResourceForm implements ControlValueAccessor {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  form: FormGroup = this.fb.group({
    resource: [null, Validators.required],
    color: [primaryColor]
  });

  private onChange: (v: ResourceCardData | null) => void = () => { };
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(): void { }
  setValue(value: ResourceCardData | null) { this.onChange(value) }

  writeValue(patch: ResourceCardData | null): void {
    if (!patch) return
    this.form.patchValue(patch, { emitEvent: false });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      tap((data) => this.setValue(data as ResourceCardData | null)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
