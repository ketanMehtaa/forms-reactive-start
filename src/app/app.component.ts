import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

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
        username: new FormControl(null, [Validators.required,this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
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
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.noUser.indexOf(control.value) !== -1) {
      // console.log(this.noUser.indexOf(control.value));
      return { nameIsForbidden: true };
    }
    // console.log(this.noUser.indexOf(control.value));

    return null;
  }
}
