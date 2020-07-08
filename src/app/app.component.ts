import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "nz-demo-tree-select-checkable",
  templateUrl: "./app.component.html"
})


export class NzDemoTreeSelectCheckableComponent {
  radioValue = 'U'
  value: string[] = ["0-0-0"];
  phoneCode
  nodes = [
    {
      title: "Access Management",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "Access Management - Manage Access",
          value: "0-0-0",
          key: "0-0-0",
          isLeaf: true
        },
        {
          title: "Access Management - Report",
          value: "0-0-1",
          key: "0-0-1",
          isLeaf: true
        }
      ]
    },
    {
      title: "Session Management",
      value: "1-0",
      key: "1-0",
      children: [
        {
          title: "Session Managemetn - Manage Sessions",
          value: "1-0-0",
          key: "1-0-0",
          isLeaf: true
        },
        {
          title: "Session Management - Report",
          value: "1-0-1",
          key: "1-0-1",
          isLeaf: true
        }
      ]
    },
    {
      title: "Fee Management",
      value: "2-0",
      key: "2-0",
      children: [
        {
          title: "Fee Management - Manage Fees",
          value: "2-0-0",
          key: "2-0-0",
          isLeaf: true
        },
        {
          title: "Fee Management - Report",
          value: "2-0-1",
          key: "2-0-1",
          isLeaf: true
        }
      ]
    }
   
  ];

  onChange($event: string[]): void {
    console.log($event);
  }

  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  auth = 'custom'

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  log(event) {
    console.log(event);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],

      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, ],
      website: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
  }
}
