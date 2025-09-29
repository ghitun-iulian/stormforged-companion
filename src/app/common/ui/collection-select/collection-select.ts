import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CollectionService } from '@common/services/collection.service';
import { filter, tap } from 'rxjs';
import { CollectionSelectDialog } from './collection-dialog/collection-select-dialog';
import { CollectionItem, CollectionType } from './collection.interface';

@Component({
  selector: 'collection-select',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './collection-select.html',
  styleUrls: ['./collection-select.scss'],
  providers: [
    CollectionService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CollectionSelect),
      multi: true
    }
  ]
})
export class CollectionSelect implements ControlValueAccessor {


  private dialog = inject(MatDialog);

  @Input() controllerLabel: string = 'Background';
  @Input() set collectionType(value: CollectionType) {
    this.collectionItem!.type = this.collectionItem!.type || value;
  };

  collectionItem: CollectionItem | null = {
    label: 'nothing selected',
    type: null,
    path: '',
    filetype: ''
  };

  private onChange: (v: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(obj: any): void { this.collectionItem = obj ?? null; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setValue(item: CollectionItem) {
    this.collectionItem = item
    this.onChange(item);
  }

  selectItem() {
    this.onTouched();
    const ref = this.dialog.open(CollectionSelectDialog, {
      panelClass: 'custom-dialog',
      height: '80vh',
      width: '50vw',
    });

    ref.componentInstance.type = this.collectionItem?.type || CollectionType.BACKGROUND;
    ref.componentInstance.item = this.collectionItem;

    ref.afterClosed().pipe(
      filter(item => !!item),
      tap((item) => {
        if (item === 'empty') item = null;
        this.setValue(item);
      })
    ).subscribe()
  }

}
