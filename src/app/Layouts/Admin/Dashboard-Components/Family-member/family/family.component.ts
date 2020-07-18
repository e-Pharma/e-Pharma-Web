import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserServiceService } from 'app/Services/user-service.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})

export class FamilyComponent implements OnInit{

  relationshipForm: FormGroup;
  /** Maximum Date allowed. */
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private userService: UserServiceService) {}

  ngOnInit() {
    this.setRelationshipForm();
  }

  /**
   * Set Relationship Form.
   */
  setRelationshipForm() {
    this.relationshipForm = this.formBuilder.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'nic': ['', [Validators.required, Validators.maxLength(12), Validators.minLength(10)]],
      'relationship': ['', Validators.required],
      'dob': ['', Validators.required],
      'contact_number': ['', [Validators.required, Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)]],
      'gender': ['', Validators.required]
    });
  }

  submit() {
    const dateFormat = "dd MMMM yyyy";
    const dob = this.relationshipForm.value.dob;
    this.relationshipForm.patchValue({
      dob: this.datePipe.transform(dob, dateFormat)
    });
    const relationshipForm = this.relationshipForm.value;
    const relationsArray: any[] = new Array();
    relationsArray.push(relationshipForm);
    this.userService.createRelationship({ relations: relationsArray[0] }).subscribe((response: any) => {
      if(response.status === 201) {
        alert(response.message);
        window.location.reload();
      } else {
        alert(response.message);
      }
    })
  }

}
