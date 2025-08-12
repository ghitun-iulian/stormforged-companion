import { Component, inject } from '@angular/core';
import { AssetsService } from '../assets.service';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SvgDirective } from '@common/directives';

@Component({
  selector: 'collection',
  imports: [CommonModule, SvgDirective],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection {
  private assetsService = inject(AssetsService);

  collection$: Observable<any[]> = this.assetsService.collection$.pipe(
    tap((x) => console.log('Collection:', x))
  );
}
