import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product list';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    // For our filter I would like to create a new Iproduct[] array that holds
    // our filtered products, without losing the actual products
    _listFilter: string;
    get listFilter() {
      return this._listFilter;
    }
    set listFilter(value:string) {
      this._listFilter = value;
      // if the listFilter is empty it will display the list of products. If the listFilter is not empty it will perform the performFilter operation
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts!: IProduct[];

    products: IProduct[] = [];
      
      // we want to set default values for both the filteredProducts and the _listFilter properties
      // the class constructor is a function that is executed when a component is first initialized
      constructor(private productService: ProductService) {
        this._listFilter = '';
      }

      onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
      }

      // this code starts by converting the filter criteria to lowercase 
      performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        // then we return the filtered list of products 
        // we are using the array filter method to create a new array with elements that pass the test defined in the provided function 'filter'
        return this.products.filter((product:IProduct) =>
        // for each product in the list the product name is converted to lowercase 
        //the indexOf is used to determine if the filter text is found in the product name
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      toggleImage(): void {
        this.showImage = !this.showImage;
      }

      ngOnInit(): void {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
      }
}