import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MfaSettingsService } from '../../../../../libs/mfsettings/mfasetting-data.service';
import { MfaSetting } from './../../../../../libs/mfsettings/mfasetting.model';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-mfasettings',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    SearchDateFilterComponent,
  ],
  templateUrl: './page-mfasettings.component.html',
  styleUrls: ['./page-mfasettings.component.css']
})
export class PageMfaSettingsComponent implements OnInit {

  mfaSettings: MfaSetting[] = [];

  constructor(private mfaService: MfaSettingsService) {}

  ngOnInit(): void {
    this.mfaService.getAll().subscribe(data => {
      this.mfaSettings = data;
    });
  }

  toggleEnabled(setting: MfaSetting) {
    this.mfaService.toggleEnabled(setting.user_name);
  }
}
