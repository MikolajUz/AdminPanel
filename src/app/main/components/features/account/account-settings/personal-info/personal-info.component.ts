import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const phoneNumberPattern = /^[0-9]{9,15}$/;

    const valid = phoneNumberPattern.test(control.value);

    return valid ? null : { invalidPhoneNumber: { value: control.value } };
  };
}
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
  accountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
      emailAddress: ['', [Validators.required, Validators.email]],
    });
  }

  onSaveChanges() {
    console.log('Changes saved:', this.accountForm.value);
  }
}
