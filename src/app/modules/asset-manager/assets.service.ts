import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class AssetsService {
  private http = inject(HttpClient);

  collection$ = this.http.get<any[]>('/api/collection').pipe(
    map((x) => {
      return Object.values(
        x.reduce((acc, item) => {
          if (!acc[item.type]) {
            acc[item.type] = { label: item.type, items: [] };
          }
          acc[item.type].items.push(item);
          return acc;
        }, {} as Record<string, { label: string; items: typeof x }>)
      );
    })
  );

  postAsset(asset: any) {
    return this.http.post<any>('/api/assets', asset);
  }
}
