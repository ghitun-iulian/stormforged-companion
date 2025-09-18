import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap
} from 'rxjs';
import {
  Asset,
  AssetFilters
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

        return this.http.get<Asset<any>[]>('/api/assets', { params })
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

  deleteAsset$ = (x: Observable<string>) => {
    return x.pipe(
      switchMap((id) => {
        const url = `/api/assets/${id}`;
        return this.http.delete(url).pipe(
          tap((x: any) => {
            if (x.error) throw new Error(x.error);
            this.selectedAsset = '';
          })
        );

      })
    );
  }

  duplicateAsset = (asset: Asset<any>) => {
    asset = { ...asset };
    delete asset.id;
    asset.metadata.label += ' (Copy)';
    return this.saveAsset$(of(asset)).pipe(
      take(1)
    ).subscribe();
  }

}
