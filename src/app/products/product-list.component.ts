import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";

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

    filteredProducts: IProduct[];

    products: IProduct[] = [
        {
          "productId": 1,
          "productName": "Leaf Rake",
          "productCode": "GDN-0011",
          "releaseDate": "March 19, 2019",
          "description": "Leaf rake with 48-inch wooden handle.",
          "price": 19.95,
          "starRating": 3.2,
          "imageUrl": "assets/images/leaf_rake.png"
        },
        {
          "productId": 2,
          "productName": "Garden Cart",
          "productCode": "GDN-0023",
          "releaseDate": "March 18, 2019",
          "description": "15 gallon capacity rolling garden cart",
          "price": 32.99,
          "starRating": 4.2,
          "imageUrl": "assets/images/garden_cart.png"
        },
        {
          "productId": 5,
          "productName": "Hammer",
          "productCode": "TBX-0048",
          "releaseDate": "May 21, 2019",
          "description": "Curved claw steel hammer",
          "price": 8.9,
          "starRating": 4.8,
          "imageUrl": "assets/images/hammer.png"
        },
        {
          "productId": 8,
          "productName": "Saw",
          "productCode": "TBX-0022",
          "releaseDate": "May 15, 2019",
          "description": "15-inch steel blade hand saw",
          "price": 11.55,
          "starRating": 3.7,
          "imageUrl": "assets/images/saw.png"
        },
        {
          "productId": 10,
          "productName": "Video Game Controller",
          "productCode": "GMG-0042",
          "releaseDate": "October 15, 2018",
          "description": "Standard two-button video game controller",
          "price": 35.95,
          "starRating": 4.6,
          "imageUrl": "assets/images/xbox-controller.png"
        }
      ];
      
      // we want to set default values for both the filteredProducts and the _listFilter properties
      // the class constructor is a function that is executed when a component is first initialized
      constructor() {
        this.filteredProducts = this.products;
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
        console.log('In OnInit');
      }
}