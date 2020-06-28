import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploadingService } from 'app/Services/image-uploading.service';
import { DatePipe } from '@angular/common';
import { UserServiceService } from 'app/Services/user-service.service';

@Component({
  selector: 'app-user-dashboard-home',
  templateUrl: './user-dashboard-home.component.html',
  styleUrls: ['./user-dashboard-home.component.css']
})
export class UserDashboardHomeComponent implements OnInit {

  prescriptionForm: FormGroup;
  relationsList: string[] = ['Father', 'Mother', 'Brother', 'Sister'];
  file: File;
  imageUrl: any = null;
  isChanged: boolean = false;
  /** Minimum Date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum Date allowed. */
  maxDate = new Date();
  imageQuality: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private imageService: ImageUploadingService,
              private userService: UserServiceService,
              private datePipe: DatePipe,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setPrescriptionForm();
  }

  setPrescriptionForm() {
    this.prescriptionForm = this.formBuilder.group({
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

  checkImageClarity() {
    this.imageService.checkImageClarity(this.file[0]).subscribe((response: any) => {
      if(response.status === 200) {
        this.imageQuality = response.data;
      } else {
        console.log("Error Calculating")
      }
    })
  }

  submit() {
    const dateFormat = "dd MMMM yyyy";
    const formData = this.prescriptionForm.value;
    formData.date = this.datePipe.transform(new Date(), dateFormat);
    this.imageService.getImageUrl(this.file).subscribe((response: any) => {
      if(response.status === 200) {
        formData.image = response.data;
        this.userService.uploadPrescription(formData).subscribe((response: any) => {
          if(response.status === 200) {
            alert(response.message);
          } else {
            alert(response.message);
          }
        });
      } else {

      }
    })
  }

}