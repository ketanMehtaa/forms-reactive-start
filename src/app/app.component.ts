import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  noUser = ["ketan", "manjeet"];
  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    // the above line is for the latest code changes
    // this.signupForm.statusChanges.subscribe((status) => console.log(status));

    // this.signupForm.setValue({})
    // in set value u have to set every value in the form

    // this.signupForm.patchValue({
    //   userData: {
    //     username:'ketan mehta'
    //   }
    // })
    // in patch value you can set a single value in a form containing multiple values

  }
  // get controls() {
  //   return (this.signupForm.get('hobbies') as FormArray).controls;
  // }
  getControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }
  onSubmit() {
    console.log(this.signupForm);
    // this.signupForm.reset();
    // above line is to reset the form
    // we can also reset specific value of the form by passing object or something
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.noUser.indexOf(control.value) !== -1) {
      // console.log(this.noUser.indexOf(control.value));
      return { nameIsWrong: true };
    }
    // console.log(this.noUser.indexOf(control.value));

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
