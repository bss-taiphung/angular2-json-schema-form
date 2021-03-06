import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../../library/json-schema-form.service';

@Component({
  selector: 'material-checkbox-widget',
  template: `
    <md-checkbox
      align="left"
      [color]="options?.color || 'accent'"
      [disabled]="controlDisabled || options?.readonly"
      [id]="'control' + layoutNode?._id"
      [name]="controlName"
      [checked]="controlValue"
      (change)="updateValue($event)">
      <span *ngIf="options?.title"
        [class.sr-only]="options?.notitle"
        [innerHTML]="options?.title"></span>
    </md-checkbox>`,
})
export class MaterialCheckboxComponent implements OnInit {
  private formControl: AbstractControl;
  private boundControl: boolean = false;
  private trueValue: any = true;
  private falseValue: any = false;
  public controlName: string;
  public controlValue: any;
  public controlDisabled: boolean = false;
  public options: any;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
    if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = this.options.title;
    }
  }

  public updateValue(event) {
    this.jsf.updateValue(this, event.checked ? this.trueValue : this.falseValue);
  }
}
