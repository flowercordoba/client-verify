import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selector-fecha',
  templateUrl: './selector-fecha.component.html',
  styleUrls: ['./selector-fecha.component.scss']
})
export class SelectorFechaComponent {
  @Output() fechaSeleccionada = new EventEmitter<number>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      yearSelect: ['']
    });
  }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  }

  onSubmit() {
    this.fechaSeleccionada.emit(this.form.value.yearSelect);
  }
}
