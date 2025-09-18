import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { filter, Observable, startWith } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'hex-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hex-form.html',
  styleUrl: './hex-form.scss',
})
export class HexForm {
  @Input() form!: FormGroup;

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);


  assetDataForm: FormGroup = this.fb.group({});

  templates: Record<string, TemplateRef<any>> = {};
  @ViewChild('resource', { read: TemplateRef })
  set resourceTpl(t: TemplateRef<any>) { if (t) this.templates['resource'] = t; }
  @ViewChild('exploration', { read: TemplateRef })
  set explorationTpl(t: TemplateRef<any>) { if (t) this.templates['exploration'] = t; }
  @ViewChild('tracker', { read: TemplateRef })
  set trackerTpl(t: TemplateRef<any>) { if (t) this.templates['tracker'] = t; }
  @ViewChild('location', { read: TemplateRef })
  set locationTpl(t: TemplateRef<any>) { if (t) this.templates['location'] = t; }
  @ViewChild('platform', { read: TemplateRef })
  set platformTpl(t: TemplateRef<any>) { if (t) this.templates['platform'] = t; }


  typesGroups: Record<string, any> = {
    resource: { resources: [[], Validators.required] },
    exploration: { icon: ['', Validators.required] },
    tracker: { dial: [[], Validators.required], icon: ['', Validators.required] },
    location: { icon: ['', Validators.required], dockingPoints: [[], Validators.required], minorReward: [[]], majorReward: [[]] },
    platform: { level: [0, Validators.required], icon: ['', Validators.required], dial: [[], Validators.required] }
  };

  type$!: Observable<string>;

  ngOnInit() {
    this.type$ = this.form?.get('type')!.valueChanges.pipe(
      startWith(this.form.get('type')!.value),
      filter(type => !!type),
      tap((x) => console.log(x)),
      tap(type => {
        const group = this.typesGroups[type] || {};
        this.assetDataForm = this.fb.group(group);
        this.form.setControl('data', this.assetDataForm);
      })
    )
  }


}
