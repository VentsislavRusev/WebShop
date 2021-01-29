import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core'


@Component({
    selector:'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges{
    @Input() starRating!: number;
    starWidth!: number;

    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.starRating * 75 / 5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.starRating} was clicked`)
    }
}