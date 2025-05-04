import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {ProductResponse, ProductsService} from '../../api';
import {catchError, of} from 'rxjs';
import {CurrencyPipe, NgIf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe,
    TableModule,
    Button,
    Toolbar,
    Dialog,
    FormsModule,
    InputText,
    InputNumber,
    ConfirmDialogModule,
    Textarea,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [
    ConfirmationService
  ]
})
export class ProductsComponent {
  private api = inject(ProductsService);
  products = signal<ProductResponse[]>([]);
  selectedProducts!: ProductResponse[] | null;
  productDialog: boolean | WritableSignal<boolean> = false;
  product: ProductResponse = {} as ProductResponse;
  protected submitted: boolean = false;

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

  openNew() {
    this.product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
    };
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {

  }

  exportCSV() {

  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {

  }

  hideDialog() {

  }

  saveProduct() {

  }
}
