import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploadingService } from 'app/Services/image-uploading.service';
import { DatePipe } from '@angular/common';
import { UserServiceService } from 'app/Services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard-home',
  templateUrl: './user-dashboard-home.component.html',
  styleUrls: ['./user-dashboard-home.component.css']
})
export class UserDashboardHomeComponent implements OnInit {

  /** Prescription Form. */
  prescriptionForm: FormGroup;
  /** User Data. */
  userData: any;

  relationsList: string[] = ['Father', 'Mother', 'Brother', 'Sister'];
  /** Image File Uploaded. */
  file: File;
  /** Image Url. */
  imageUrl: any = null;
  /** Is Uploaded. */
  isChanged: boolean = false;
  /** Minimum Date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum Date allowed. */
  maxDate = new Date();
  /** Image Quality. */
  imageQuality: boolean = false;
  /** Is Loading Quality. */
  isLoadingQuality: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private imageService: ImageUploadingService,
              private userService: UserServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private _snackBar: MatSnackBar,
              private cd: ChangeDetectorRef) { 
    this.route.data.subscribe((data: { userData: any }) => {
      this.userData = data.userData.data;
      console.log(this.userData)
    });
  }

  ngOnInit(): void {
    this.setPrescriptionForm();
    this.selectValueChanges();
  }

  /**
   * Listen to selection changes.
   */
  selectValueChanges() {
    this.prescriptionForm.get('relations').valueChanges.subscribe((value: any) => {
      console.log(value)
      this.prescriptionForm.get('contact').setValue(value.contact_number);
      this.prescriptionForm.get('first_name').setValue(value.first_name);
      this.prescriptionForm.get('last_name').setValue(value.last_name);
      this.prescriptionForm.get('dob').setValue(new Date(value.dob));
      this.prescriptionForm.get('nic').setValue(value.nic);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * Set Prescription FOrm.
   */
  setPrescriptionForm() {
    this.prescriptionForm = this.formBuilder.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'nic': ['', Validators.required],
      'dob': ['', Validators.required],
      'relations': ['', Validators.required],
      'date': [{value: new Date(), disabled: true}],
      'image': ['', Validators.required],
      'note': [''],
      'email': ['', [Validators.required, Validators.email]],
      'contact': ['', [Validators.required, Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)]]
    })
  }

  /**
   * On File Uploading.
   * @param {any} event Event.
   */
  onFileChange(event) {
    this.isChanged = true;
    console.log(event.target.files)
    //let formData: FormData = new FormData();
    this.file = event.target.files;
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result;
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }

    this.checkImageClarity();

  }

  /**
   * Check Image Clarity.
   */
  checkImageClarity() {
    this.isLoadingQuality = true;
    this.imageService.checkImageClarity(this.file[0]).subscribe((response: any) => {
      this.isLoadingQuality  = false;
      if(response.status === 200) {
        this.imageQuality = response.data;
      } else {
        console.log("Error Calculating")
      }
    })
  }

  /**
   * Submit Prescription Form.
   */
  submit() {
    console.log("Submitting")
    const dateFormat = "dd MMMM yyyy";
    const dob = this.prescriptionForm.value.dob;
    this.prescriptionForm.patchValue({
      dob: this.datePipe.transform(dob, dateFormat)
    });
    const formData = this.prescriptionForm.value;
    formData.date = this.datePipe.transform(new Date(), dateFormat);
    this.imageService.getImageUrl(this.file[0]).subscribe((response: any) => {
      if(response.status === 200) {
        formData.image = response.data.url;
        console.log(formData)
        this.userService.uploadPrescription(formData).subscribe((response: any) => {
          if(response.status === 201) {
            //console.log(response.status)
            this.openSnackBar(response.message, "OK");
            this.router.navigate(['../place-order'], { relativeTo: this.route });
          } else {
            this.openSnackBar(response.message, "OK");
          }
        });
      } else {
        this.openSnackBar(response.message, "OK");
      }
    })
  }

}