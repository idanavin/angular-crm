import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSliderChange } from '@angular/material/slider';
import { RangeType } from '../range-slider/range-slider.component';

@Component({
  selector: 'app-simple-slider',
  templateUrl: './simple-slider.component.html',
  styleUrls: ['./simple-slider.component.scss']
})
export class SimpleSliderComponent implements OnInit {

  isMinValueInit = true;
  isMaxValueInit = true;
  thumbLabel = true;
  @Input() minValue!: number;
  @Input() maxValue!: number;
  @Input() color: ThemePalette = 'primary';

  @Input() showRuler = false;

  @Output() output = new EventEmitter<RangeType>();

  @Input() formatLabel = (v: any) => v;

  constructor() { }

  ngOnInit(): void {
  }

  maxConf = 75;

  @Input()
  set max(m: number) {
    this.maxConf = parseInt(m.toString(), 10);
  }
  get max(): number {
    return this.maxConf;
  }

  minConf = 18;

  @Input()
  set min(m: number) {
    this.minConf = parseInt(m.toString(), 10);
  }
  get min(): number {
    return this.minConf;
  }

  @Input()
  set value(v: { min: number, max: number }) {
    this.minValue = v.min;
    this.maxValue = v.max;
  }

  valueChange(): void {
    this.output.emit({min: this.minValue, max: this.maxValue});
  }

  minValueInput(a: MatSliderChange): void {
    this.isMinValueInit = (a.value === this.min);
    if (a.value && a.value >= this.maxValue) {
      a.source.value = this.maxValue;
    }
  }

}
