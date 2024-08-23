import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trading-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './trading-card.component.html',
  styleUrl: './trading-card.component.css'
})
export class TradingCardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() rarity!: 'Common' | 'Rare' | 'Mythic';
}
