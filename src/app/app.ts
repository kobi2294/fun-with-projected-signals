import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { projectedSignal } from './lib/projected-signal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataStore } from './store/data.store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly store = inject(DataStore);
  readonly data = computed(() => getState(this.store));
  readonly projected = projectedSignal({
    computation: () => this.store.sum(),
    update: newVal => this.store.setSum(newVal)
  })
}
