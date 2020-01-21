export interface PropertyDescriptorI {
  propertyToPick: string;
  propertyToInit: string;
}

export class CSVPropertyDescriptor implements PropertyDescriptorI {
  private _propertyToInit: string;
  private _propertyToPick: string;

  constructor(propertyToInit: string, propertyToPick: string) {
    this._propertyToInit = propertyToInit;
    this._propertyToPick = propertyToPick;
  }

  get propertyToInit(): string {
    return this._propertyToInit;
  }

  set propertyToInit(value: string) {
    this._propertyToInit = value;
  }

  get propertyToPick(): string {
    return this._propertyToPick;
  }

  set propertyToPick(value: string) {
    this._propertyToPick = value;
  }
}
