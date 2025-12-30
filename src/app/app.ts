import { Component, computed, inject, signal } from '@angular/core';
import { projectedSignal } from './lib/projected-signal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataStore } from './store/data.store';
import { getState } from '@ngrx/signals';
import { form, max, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, Field],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly store = inject(DataStore);

  readonly data = computed(() => getState(this.store));
  
  readonly projected = projectedSignal({
    computation: () => this.data(),
    update: newVal => this.store.setXY(newVal.x, newVal.y)
  });

  readonly form = form(this.projected, path => {
    max(path.x, 20), 
    max(path.y, 20)
  });
}
