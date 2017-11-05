import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { listingTypes, bathrooms, beds, propertyTypes, sorts } from '../app-const/app-const.filters-fields';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})

export class FilterComponent implements OnInit {
  public form: FormGroup;
  public listingTypes = listingTypes;
  public bathrooms = bathrooms;
  public beds = beds;
  public propertyTypes = propertyTypes;
  public sorts = sorts;

  @Output() onUpdateFilter = new EventEmitter<FormGroup>();
  update(form) {
    this.onUpdateFilter.emit(form);
  }

  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.form = fb.group({
      listingType: 'buy',
      sort: 'relevancy',
      property: 'flat',
      beds: [],
      bathrooms: [],
      price: {0: 1, 1: 1000000}
    });
  }

  ngOnInit() {
    this.form
      .valueChanges
      .subscribe(data => this.update(data));
  }
}
