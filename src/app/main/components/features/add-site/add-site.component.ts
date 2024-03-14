import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }

    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    const valid = urlPattern.test(control.value);

    return valid ? null : { invalidUrl: { value: control.value } };
  };
}

@Component({
  selector: 'app-add-site',

  templateUrl: './add-site.component.html',
  styleUrl: './add-site.component.scss',
})
export class AddSiteComponent {
  siteForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.siteForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, urlValidator()]],
      isActive: [true],
    });
  }

  onSaveChanges() {
    const newSiteData = this.siteForm.value;
    console.log('newSiteData', newSiteData);
    this.authService.addWebsiteMethod(newSiteData);
  }
}
