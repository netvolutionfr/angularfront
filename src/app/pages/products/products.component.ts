import {Component, effect, inject, signal} from '@angular/core';
import {ProductResponse, ProductsService} from '../../api';
import {catchError, of} from 'rxjs';
import {CurrencyPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe,
    TableModule,
    Button
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
