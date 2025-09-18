import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CollectionFilters } from "@common/ui/collection-select/collection.interface";
import { Observable, switchMap } from "rxjs";


@Injectable()

export class CollectionService {

    private http = inject(HttpClient);

    collection$ = (filters: Observable<CollectionFilters>) => {
        return filters.pipe(
            switchMap((filters) => {
                let params = new HttpParams();
                Object.entries(filters)
                    .filter(([key, value]) => !!value)
                    .forEach(([key, value]) => { params = params.append(key, String(value)) });

                return this.http.get<any[]>('/api/collection', { params });
            })
        );
    }

}