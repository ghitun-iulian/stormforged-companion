import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CollectionService } from '@common/services/collection.service';
import { BehaviorSubject, tap } from 'rxjs';
import { CollectionFilters, CollectionItem, CollectionItem2, CollectionType, emptyItem } from '../collection.interface';
import { GraphicsDirective, ImgDirective } from '@common/directives';

@Component({
    selector: 'collection-select-dialog',
    templateUrl: './collection-select-dialog.html',
    styleUrls: ['./collection-select-dialog.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormField,
        MatInputModule,
        ImgDirective,
        GraphicsDirective
    ],
    providers: [CollectionService]
})

export class CollectionSelectDialog {
    private dialogRef = inject(MatDialogRef<CollectionSelectDialog>);
    private collectionService = inject(CollectionService);

    empty = emptyItem;

    item!: CollectionItem | CollectionItem2 | null;
    set type(value: CollectionType) {
        if (!value) return;
        this.filters = { type: value };
    }

    collectionTypes = Object.values(CollectionType);

    filters$ = new BehaviorSubject<CollectionFilters>({
        search: '',
        type: this.item?.type || CollectionType.BACKGROUND
    });
    set filters(value: Partial<CollectionFilters>) {
        this.filters$.next({ ...this.filters$.value, ...value });
    }

    onSearch(text: string) { this.filters = { search: text }; }
    items$ = this.filters$.pipe(this.collectionService.collection$)

    pick(item?: CollectionItem) { this.dialogRef.close(item || 'empty'); }

}
