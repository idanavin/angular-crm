import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSliderChange } from '@angular/material/slider';

export interface RangeType {
  min: number;
  max: number;
}

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

  constructor() { }

  isMinValueInit = true;
  isMaxValueInit = true;
  thumbLabel = true;
  @Input() minValue!: number;
  @Input() maxValue!: number;
  @Input() minColor: ThemePalette = 'accent';
  @Input() maxColor: ThemePalette = 'primary';
  @Input() showRuler = false;

  @Input() formatLabel = (v: any) => v;

  @Output() output = new EventEmitter<RangeType>();

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

  get rulerArray(): number[] {
    return [...Array(this.max - this.min).keys()].map(i => i + this.min);
  }

  ngOnInit(): void {
    if (!this.minValue) {
      this.minValue = this.min;
    }
    if (!this.maxValue) {
      this.maxValue = this.max;
    }
    this.isMinValueInit = (this.minValue === this.min);
    this.isMaxValueInit = (this.maxValue === this.max);
    this.output.emit({min: this.minValue, max: this.maxValue});
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

  maxValueInput(a: MatSliderChange): void {
    this.isMaxValueInit = (a.value === this.max);
    if (a.value && a.value <= this.minValue) {
      a.source.value = this.minValue;
    }
  }
}
