import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-date-filter',
  templateUrl: './search-date-filter.component.html',
})
export class SearchDateFilterComponent {
  searchText: string = '';
  fromDate!: string;
  toDate!: string;

  @Output() search = new EventEmitter<string>();
  @Output() dateFilter = new EventEmitter<{ from?: string; to?: string }>();
  @Output() clear = new EventEmitter<void>();

  onSearchChange() {
    this.search.emit(this.searchText);
  }

  onDateChange() {
    this.dateFilter.emit({ from: this.fromDate, to: this.toDate });
  }

  clearFilter() {
    this.searchText = '';
    this.fromDate = '';
    this.toDate = '';
    this.clear.emit();
  }
}
