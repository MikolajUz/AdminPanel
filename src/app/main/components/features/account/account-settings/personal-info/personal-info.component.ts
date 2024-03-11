import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // Check if the control value is empty
    if (!control.value) {
      return null; // Return null if the value is empty
    }

    // Regular expression to match a valid phone number
    const phoneNumberPattern = /^[0-9]{9,15}$/;

    // Check if the input value matches the pattern
    const valid = phoneNumberPattern.test(control.value);

    // Return validation result
    return valid ? null : { 'invalidPhoneNumber': { value: control.value } };
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
