import {Component, effect, inject, signal} from '@angular/core';
import {ProductResponse, ProductsService} from '../../api';
import {catchError, of} from 'rxjs';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private api = inject(ProductsService);
  products = signal<ProductResponse[]>([]);

  constructor() {
    effect(() => {
      this.api.getProductsApiV1ProductsGet()
        .pipe(
          catchError((err) => {
            console.error('Error fetching products:', err);
            return of([]); // Return an empty array on error
          })
        )
        .subscribe((data) => {
          this.products.set(data);
        });
    });
  }
}
