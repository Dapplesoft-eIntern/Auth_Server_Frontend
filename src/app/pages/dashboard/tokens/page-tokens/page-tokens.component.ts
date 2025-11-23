import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TokenService } from '../../../../../libs/token/token-data.service';
import { Token } from '../../../../../libs/token/token.model';
import { SearchDateFilterComponent } from "../../../shared/components/search-date-filter.component";

@Component({
  selector: 'app-page-tokens',
  standalone: true,
  imports: [CommonModule,SearchDateFilterComponent, TableModule, ButtonModule],
  templateUrl: './page-tokens.component.html',
  styleUrls: ['./page-tokens.component.css'],
})
export class PageTokensComponent implements OnInit {

  tokens: Token[] = [];

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.getTokens().subscribe(data => {
      this.tokens = data;
    });
  }

  revokeToken(id: bigint): void {
    this.tokenService.revokeToken(id);
  }
}
