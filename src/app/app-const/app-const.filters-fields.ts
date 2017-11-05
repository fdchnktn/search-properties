import {SelectItem} from 'primeng/primeng';

export  const listingTypes: SelectItem[] = [
  {label: 'To rent', value: 'buy', styleClass: 'fill-width'},
  {label: 'For sale', value: 'shape', styleClass: 'fill-width'}
  ];

export  const sorts: SelectItem[] = [
  {label: 'Relevancy', value: 'relevancy'},
  {label: 'Bedroom (low to high)', value: 'bedroom_lowhigh'},
  {label: 'Bedroom (high to low)', value: 'bedroom_highlow'},
  {label: 'Price (low to high)', value: 'price_lowhigh'},
  {label: 'Price (high to low)', value: 'price_highlow'},
  {label: 'Newest', value: 'newest'},
  {label: 'Oldest', value: 'oldest'}
];

export  const beds: SelectItem[] = [
  {label: 'Studio', value: 0, styleClass: 'fill-width'},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4+', value: 4}
];

export  const bathrooms: SelectItem[] = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4+', value: 4}
];

export  const propertyTypes: SelectItem[] = [
  {label: 'All', value: 'all', styleClass: 'fill-width'},
  {label: 'Flat', value: 'flat'},
  {label: 'House', value: 'house'}
];
