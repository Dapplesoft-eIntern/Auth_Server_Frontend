



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


import { TokenStateService } from '../../../../../libs/token/token-state.service';
import { Token } from '../../../../../libs/token/token.model';

@Component({
  selector: 'app-page-tokens',
  standalone: true,
  imports: [
    CommonModule,

    TableModule,
    ButtonModule
  ],
  templateUrl: './page-tokens.component.html',
  styleUrls: ['./page-tokens.component.css'],
})
export class PageTokensComponent implements OnInit {

  tokens: Token[] = [];

  constructor(private tokenState: TokenStateService) {}

  ngOnInit(): void {

    this.tokenState.tokens$.subscribe(data => this.tokens = data);


    this.tokenState.loadTokens();
  }

  revokeToken(id: bigint): void {
    this.tokenState.revokeToken(id);
  }
}
