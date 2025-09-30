import { Component, forwardRef, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GraphicsDirective } from '@common/directives';
import { primaryColor } from '@common/interfaces';
import { CollectionService } from '@common/services/collection.service';
import { CollectionItem2, CollectionType, GraphicsConfig } from '../collection-select/collection.interface';
import { CollectionSelectDialog } from '../collection-select/collection-dialog/collection-select-dialog';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'collection-picker',
  imports: [
    CommonModule,
    MatDialogModule,
    GraphicsDirective,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './collection-picker.html',
  styleUrl: './collection-picker.scss',
  providers: [
    CollectionService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CollectionPicker),
      multi: true
    }
  ]
})

export class CollectionPicker implements ControlValueAccessor {

  private dialog = inject(MatDialog);

  controlLabel = input<string>('Icon');
  type = input<CollectionType>(CollectionType.ICON);

  emptyItem: CollectionItem2 = {
    type: CollectionType.ICON,
    label: 'empty',
    filetype: 'svg',
    color: primaryColor
  };

  item: CollectionItem2 = this.emptyItem;

  private onChange: (v: any) => void = () => { };
  writeValue(item: any): void {
    if (!item) return;
    this.item = item;
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { }

  setValue(item: CollectionItem2 | null) {
    this.emptyItem.color = this.item.color;
    this.item = item || this.emptyItem;
    this.onChange(item);
  }


  setColor(color: string) {
    this.item = { ...this.item, color };
    this.setValue(this.item);
  }

  selectItem() {
    const ref = this.dialog.open(CollectionSelectDialog, {
      panelClass: 'custom-dialog',
      height: '80vh',
      width: '50vw',
    });

    ref.componentInstance.type = this.type() || this.item.type!;
    ref.componentInstance.item = this.item!;

    ref.afterClosed().pipe(
      filter(item => !!item),
      tap((item) => {
        if (item === 'empty') {
          this.setValue(null);
          return;
        };

        this.setValue({ ...item, color: this.item.color });
      })
    ).subscribe()
  }

}
