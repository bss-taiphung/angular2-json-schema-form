import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import {JsonSchemaFormService} from '../../library/json-schema-form.service';

@Component({
  selector: 'material-input-widget',
  template: `
      <section [class]="options?.htmlClass">
          <md-input-container>
              <input mdInput #inputControl
                     [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                     [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
                     [attr.maxlength]="options?.maxLength"
                     [attr.minlength]="options?.minLength"
                     [attr.pattern]="options?.pattern"
                     [required]="options?.required"
                     [class]="options?.fieldHtmlClass"
                     [disabled]="controlDisabled"
                     [id]="'control' + layoutNode?._id"
                     [name]="controlName"
                     [placeholder]="options?.title"
                     [readonly]="options?.readonly ? 'readonly' : null"
                     [style.width]="'100%'"
                     [type]="layoutNode?.type"
                     [value]="controlValue"
                     (input)="updateValue($event)">
              <span *ngIf="options?.fieldAddonLeft"
                    md-prefix>{{options?.fieldAddonLeft}}</span>
              <span *ngIf="options?.fieldAddonRight"
                    md-suffix>{{options?.fieldAddonRight}}</span>
              <md-hint *ngIf="options?.description && !(options?.placeholder && !formControl?.dirty)"
                       align="end">{{options?.description}}
              </md-hint>
              <md-hint *ngIf="!options?.description && options?.placeholder && !formControl?.dirty"
                       align="end">{{options?.placeholder}}
              </md-hint>
          </md-input-container>
      </section>`,
  styles: [`md-input {
      margin-top: 6px;
  }`],
})
export class MaterialInputComponent implements OnInit {
  private boundControl: boolean = false;
  private autoCompleteList: string[] = [];
  public formControl: AbstractControl;
  public controlDisabled: boolean = false;
  public controlValue: any;
  public controlName: string;
  public options: any;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(private jsf: JsonSchemaFormService) {
  }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  public updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
