import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  switchMap,
  tap
} from 'rxjs';
import {
  Asset,
  AssetFilters,
  CollectionGroup,
  CollectionItem
} from './asssets.interface';

@Injectable()
export class AssetsService {
  private http = inject(HttpClient);

  selectedAsset$ = new BehaviorSubject<string>('');
  get selectedAsset() { return this.selectedAsset$.value; }
  set selectedAsset(id: string) { this.selectedAsset$.next(id); }

  asset$ = this.selectedAsset$.pipe(
    filter((id) => !!id),
    switchMap((id) => {
      return this.http.get<Asset<any>>(`/api/assets/${id}`);
    }),
  );

  assets$ = (filters: Observable<AssetFilters>) => {
    return filters.pipe(
      switchMap((filters) => {
        let params = new HttpParams();
        Object.entries(filters)
          .filter(([key, value]) => !!value)
          .forEach(([key, value]) => { params = params.append(key, String(value)) });

        return this.http.get<Asset<any>[]>('/api/assets', { params }).pipe(
          map((x) => x)
        );
      })
    );
  }


  saveAsset$ = (x: Observable<Asset<any>>) => {
    return x.pipe(
      switchMap((asset) => {

        const method = asset.id ? 'put' : 'post';
        const url = `/api/assets${asset.id ? `/${asset.id}` : ''}`;

        return this.http[method](url, asset).pipe(
          tap((x: any) => {
            if (x.error) throw new Error(x.error);
            this.selectedAsset = x.id;
          })
        );

      })
    );
  }


  collection$: Observable<CollectionGroup[]> = this.http
    .get<CollectionItem[]>('/api/collection')
    .pipe(
      map((x) => {
        return [] as CollectionGroup[];
      })
    );


}
