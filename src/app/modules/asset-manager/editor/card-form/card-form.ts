import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { debounceTime, distinct, distinctUntilChanged, filter, Observable, startWith, takeUntil } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'card-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSlideToggleModule
  ],
  templateUrl: './card-form.html',
  styleUrl: './card-form.scss',
})
export class CardForm {

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  @Input() form!: FormGroup;
  type!: string;

  type$!: Observable<string>;
  assetDataForm: FormGroup = this.fb.group({});

  templates: Record<string, TemplateRef<any>> = {};
  @ViewChild('resource', { read: TemplateRef })
  set resourceTpl(t: TemplateRef<any>) { if (t) this.templates['resource'] = t; }
  @ViewChild('event', { read: TemplateRef })
  set eventTpl(t: TemplateRef<any>) { if (t) this.templates['event'] = t; }
  @ViewChild('storm', { read: TemplateRef })
  set stormTpl(t: TemplateRef<any>) { if (t) this.templates['storm'] = t; }
  @ViewChild('relic', { read: TemplateRef })
  set relicTpl(t: TemplateRef<any>) { if (t) this.templates['relic'] = t; }

  typesGroups: Record<string, any> = {
    resource: { resource: ['', Validators.required] },
    event: { title: ['', Validators.required], art: [''], description: [''] },
    storm: { title: ['', Validators.required], art: [''], description: [''] },
    relic: { title: ['', Validators.required], art: [''], description: [''], disassemble: [[]], isPassive: [false] },
  };

  ngOnInit() {

    this.form.get('type')!.valueChanges.pipe(
      startWith(this.form.get('type')!.value),
      filter(t => !!t),
      distinctUntilChanged(),
      tap((type) => {
        const group = this.typesGroups[type] || {};
        this.clearFormControls(this.assetDataForm);
        this.createControls(this.assetDataForm, group);
        this.type = type;
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();

    this.assetDataForm.valueChanges.pipe(
      filter(() => this.assetDataForm.valid),
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
      tap((data) => this.form.get('data')!.setValue(data)),
    ).subscribe();


  }

  private clearFormControls(form: FormGroup) {
    Object.keys(form.controls).forEach(key => form.removeControl(key));
  }

  private createControls(form: FormGroup, controls: Record<string, any>) {
    Object.keys(controls).forEach(key => {
      const [value, validator] = controls[key];
      form.addControl(key, this.fb.control(value, validator));
    });
  }

}
