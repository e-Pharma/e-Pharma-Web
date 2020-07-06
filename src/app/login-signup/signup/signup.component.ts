import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services. */
import { UserServiceService } from 'app/Services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  // relationshipCount: number = 0;
  /** Minimum Date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum Date allowed. */
  maxDate = new Date();

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private userService: UserServiceService
    ) { }

  ngOnInit(): void {
    this.createSignupForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * Initialize Signup Form.
   */
  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'address': ['', Validators.required],
      'contact': ['', [Validators.required, Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)]],
      'nic': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'), Validators.maxLength(50), Validators.minLength(8)]],
      'rePassword': ['', [Validators.required, this.confirmPassword('password')]]
    });
  }

  /**
   * Confirm Change Password of Users.
   * @param controlNameToCompare Form Control Name to be compared.
   */
  confirmPassword(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors|null => {
        if (c.value == null || c.value.length === 0) {
            return null;
        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? {'notequal': true} : null;
    };
  }

  /**
   * Submits Registration Form.
   */
  submit() {
    // let relationshipsArray: any[] = new Array();
    const registerForm = this.signupForm.value;
    // for(let i=0;i<this.relationshipCount;i++) {
    //   const nicId = 'nic' + (this.relationshipCount-1);
    //   const firstNameId = 'firstName' + (this.relationshipCount);
    //   const lastNameId = 'lastName' + (this.relationshipCount);
    //   const dobId = 'dob' + (this.relationshipCount);
    //   const relationshipId = 'relationship' + (this.relationshipCount);
    //   const contactNumberId = 'contact_number' + (this.relationshipCount);
    //   const genderId = 'gender' + (this.relationshipCount);
    //   relationshipsArray.push({firstName: this.signupForm.value[firstNameId], lastName: this.signupForm.value[lastNameId],
    //                       dob: this.signupForm.value[dobId], nic: this.signupForm.value[nicId], relationship: this.signupForm.value[relationshipId],
    //                       contact_number: this.signupForm.value[contactNumberId], gender: this.signupForm.value[genderId]});
    // }
    // registerForm.relationships = relationshipsArray;
    console.log(registerForm)
    this.userService.registerUser(registerForm).subscribe(response => {
      console.log(response.status)
      if (response.status === 201 ) {
        const token = response.data;
        console.log(token)
        let from = 'epharmatest123@gmail.com';
        let to = registerForm.email;
        let subject = 'Verify Your Account';
        let message = this.getMessage(token);
        let data = {from: from, to: to, message: message, subject: subject };
        this.userService.verificationMail(data).subscribe(response => {
          if (response.status === 200 ) {
            this.openSnackBar(response.message, "OK");
            this.router.navigate(['../login'], { relativeTo: this.route} );
          } else {
            this.openSnackBar(response.message, "OK");
          }
        });
      }
      else throw new Error();
  
    });
  }

  // addNewRelationship() {
  //   this.relationshipCount = this.relationshipCount + 1;
  //   const nicId = 'nic' + (this.relationshipCount-1);
  //   const firstNameId = 'firstName' + (this.relationshipCount-1);
  //   const lastNameId = 'lastName' + (this.relationshipCount-1);
  //   const dobId = 'dob' + (this.relationshipCount-1);
  //   const relationshipId = 'relationship' + (this.relationshipCount-1);
  //   const contactNumberId = 'contact_number' + (this.relationshipCount-1);
  //   const genderId = 'gender' + (this.relationshipCount-1);
  //   console.log(nicId)
  //   this.signupForm.addControl(nicId, new FormControl(''));
  //   this.signupForm.addControl(firstNameId, new FormControl(''));
  //   this.signupForm.addControl(lastNameId, new FormControl(''));
  //   this.signupForm.addControl(dobId, new FormControl(''));
  //   this.signupForm.addControl(relationshipId, new FormControl(''));
  //   this.signupForm.addControl(contactNumberId, new FormControl('', [Validators.pattern('^\\d+$'), Validators.minLength(10), Validators.maxLength(10)]));
  //   this.signupForm.addControl(genderId, new FormControl(''));
  // }

  // showItem(stringVal: string) {
  //   console.log(parseInt(stringVal, 10)===this.relationshipCount-1)
  //   return parseInt(stringVal, 10) === (this.relationshipCount-1);
  // }

  // checkError(id: string, error: string) {
  //   const contact_number = 'contact_number'+id;
  //   return this.signupForm.controls[contact_number].hasError(error);
  // }


  /**
   * Get message.
   * @param link Verification Link.
   */
  getMessage(token: any){
    const link:any = 'http://localhost:4200/verify_email/'+token;
    let _href="<a href="+link+" title='Verify Email' style='Margin:0;border:0 solid #4f9c45;border-radius:9999px;color:#fefefe;display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:1.3;margin:0;padding:8px 16px 8px 16px;text-align:left;text-decoration:none' target='_blank'  data-saferedirecturl="+link+">";

    let message="<!DOCTYPE html><html><head><meta charset='UTF-8'>"+
    "<meta content='width=device-width, initial-scale=1' name='viewport'>"+
    "<meta name='x-apple-disable-message-reformatting'>"+
    "<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
    "<meta content='telephone=no' name='format-detection'>"+
    "<title></title>"+
    "</head>"+
    "<body>"+
    "<div id=':mx' class='ii gt'><div id=':mw' class='a3s aXjCH msg1283199651525359358'><u></u>"+
    "<div marginwidth='0' marginheight='0' bgcolor='#F6F6F6' style='Margin:0;box-sizing:border-box;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important'>"+
    "<table class='m_1283199651525359358body' border='0' cellspacing='0' cellpadding='0' width='100%' height='100%' style='Margin:0;background:#e4e8ee;border-collapse:collapse;border-spacing:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;height:100%;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;width:100%'>"+
      "<tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
        "<td align='center' valign='top' bgcolor='#F6F6F6' style='Margin:0;background:#e4e8ee!important;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;padding-bottom:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
          "<center style='min-width:580px;width:100%'>"+
            "<table align='center' style='Margin:0 auto;background:#1e2530;border-bottom:none;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
              "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;background:transparent;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
              "<table class='m_1283199651525359358row m_1283199651525359358collapse' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
                "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:588px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
                "<h1 style='Margin:0;Margin-bottom:px;color:#ffffff;font-family:Georgia,serif;font-size:30px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:px;padding:0;text-align:left;word-wrap:normal'>"+
                  "E-Pharma"+
                "</h1>"+
                "</th>"+
                "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
              "</tr></tbody></table>"+
              "</td></tr></tbody></table>"+
            "</td></tr></tbody></table>"+
            "<table style='Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
            "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;Margin-top:10px;background:#ffffff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;margin-top:10px;padding:0;text-align:center;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
              "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
              "<table class='m_1283199651525359358row' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
                "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:564px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
                "<h3 class='m_1283199651525359358avoid-auto-linking' style='Margin:0;color:#5d6879;font-family:Georgia,serif;font-size:24px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;word-wrap:normal'>"+
                   "Verify Email"+
                "</h3>"+
              "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                "<p style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
                 "Hello,"+
                "</p>"+
                "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
                "</p><p>You are required to verify your email.</p>"+
                "<p></p>"+
                "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
                  "<center style='min-width:532px;width:100%'>"+
                "<table class='m_1283199651525359358button' style='Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;float:none;margin:0 0 16px 0;padding:0;text-align:center;vertical-align:top;width:auto'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;border-radius:9999px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;background:#4f9c45;border:none;border-collapse:collapse!important;border-radius:9999px;color:#fefefe;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
                  _href+
                    "Verify Email"+
                  "</a>"+
                "</td></tr></tbody></table></td></tr></tbody></table>"+
                "</center>"+
      "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
      "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
        "</p><p>If you ignore this message, you will not be eligible to change the password.</p>"+
      "<p>If you didn't signup for the E Pharma Platform, let us know.</p>"+
      "<p></p>"+
      "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
      "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
      "If the button above does not appear, please copy and paste this link into your browser's address bar:<br>"+
      "</p><p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'><a href='"+link+"' target='_blank' data-saferedirecturl='http://localhost:4200/home'>"+link+"</a></p>"+
      "<p></p>"+
      "</th>"+
      "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
      "</tr></tbody></table>"+
      "<table align='center' style='background:#e4e8ee;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
      "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='10px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:normal;line-height:10px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
      "</td></tr></tbody></table>"+
      "</td></tr></tbody></table>"+
      "</center>"+
      "</td>"+
      "</tr>"+
      "</tbody></table>"+
      "<div style='display:none;white-space:nowrap;font:15px courier;line-height:0'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>"+
      "<img src='https://ci3.googleusercontent.com/proxy/HdehxmK1b5Akulro3QsNjlwrJMiBNkzLUs0IYl8Z7p_ejpSw3dIWm7lXD6m7zHJlvgGaN-mqZMPnBh4J4B5rRaHEkCLMp6AieRvDJpV5yOL591GlcKzQUrvZuowvjaJrHCn3bhojFOnOHMjJGdnTjjoCjQ3jCZ6uTix1MpEvdqcf7i6DrxF6r9yS3CbNBCbTKzMLVvjbO2m7GR1Fk0_S8ScA_2d34ykilEQJ0rKKt5wgxFrtkNd7KPOfkiVdBmFe3ukWrco6Z9mHZonVzFB_fGesWWYFWEPuhE3ZvM8zsr-Z31mFLhJo7AHDrA17SXoW0HB6vCqwFh_lzU7w2_fA21qDy9BmdeMa1vWcSrBC1kJWcEBcE1IBiGYOryKRgj7pYiF6SlFCVbeJ53aF7mCH97bhwE6RJQ_-xyJjUJjsdlfQ37EPzxYlC27c7dUcNfkpcMC-b2AfylwgCfc=s0-d-e1-ft#http://email-link.overleaf.com/wf/open?upn=hHCzDyOaMqV-2BKGOubZbS-2FsKms-2B0H-2B625sn5WlmTP-2BdsG1hT-2FhQhCa3xVME-2FGESiKhhgcDaS1J1-2BOmBIa4G9G9c-2FGq8dbpuqq73ttdsHIiW7NDaBwShUOC6U-2BR-2FppzUOyd3eg80BZm-2FHUeF1YCI-2FtEaxGoE7POnsXXROKVWjSSmAaLd0Lh9m0Ht97EIp4tq0uirvv0VAVWQPtd9QQSh0WYw7-2BNV3f39zYKbNOiiD2SIGe1AAKrUJGiWTHzlsUxEkg' alt='' width='1' height='1' border='0' style='height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important' class='CToWUd'></div><div class='yj6qo'></div><div class='adL'>"+
      "</div></div></div>"+
      "</body>"+
      "</html>";


    // let message="<!DOCTYPE html><html><head><meta charset='UTF-8'>"+
    //     "<meta content='width=device-width, initial-scale=1' name='viewport'>"+
    //     "<meta name='x-apple-disable-message-reformatting'>"+
    //     "<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
    //     "<meta content='telephone=no' name='format-detection'>"+
    //     "<title></title>"+
    //     "</head>"+
    //     "<body>"+
    //     "<div id=':mx' class='ii gt'><div id=':mw' class='a3s aXjCH msg1283199651525359358'><u></u>"+
    //     "<div marginwidth='0' marginheight='0' bgcolor='#F6F6F6' style='Margin:0;box-sizing:border-box;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;min-width:100%;padding:0;text-align:left;width:100%!important'>"+
    //     "<table class='m_1283199651525359358body' border='0' cellspacing='0' cellpadding='0' width='100%' height='100%' style='Margin:0;background:#e4e8ee;border-collapse:collapse;border-spacing:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;height:100%;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;width:100%'>"+
    //       "<tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
    //         "<td align='center' valign='top' bgcolor='#F6F6F6' style='Margin:0;background:#e4e8ee!important;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;padding-bottom:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
    //           "<center style='min-width:580px;width:100%'>"+
    //             "<table align='center' style='Margin:0 auto;background:#1e2530;border-bottom:none;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:20px;text-align:left;vertical-align:top;word-wrap:break-word'>"+
    //               "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;background:transparent;border-collapse:collapse;border-spacing:0;margin:0 auto;padding:0;text-align:inherit;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
    //               "<table class='m_1283199651525359358row m_1283199651525359358collapse' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
    //                 "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:0;padding-left:0;padding-right:0;text-align:left;width:588px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
    //                 "<h1 style='Margin:0;Margin-bottom:px;color:#ffffff;font-family:Georgia,serif;font-size:30px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:px;padding:0;text-align:left;word-wrap:normal'>"+
    //                   "E-Pharma"+
    //                 "</h1>"+
    //                 "</th>"+
    //                 "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
    //               "</tr></tbody></table>"+
    //               "</td></tr></tbody></table>"+
    //             "</td></tr></tbody></table>"+
    //             "<table style='Margin:0 auto;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //             "<table align='center' class='m_1283199651525359358container' style='Margin:0 auto;Margin-top:10px;background:#ffffff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;margin-top:10px;padding:0;text-align:center;vertical-align:top;width:580px'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
    //               "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //               "<table class='m_1283199651525359358row' style='border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'>"+
    //                 "<th class='m_1283199651525359358small-12 m_1283199651525359358columns' style='Margin:0 auto;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:16px;text-align:left;width:564px'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><th style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left'>"+
    //                 "<h3 class='m_1283199651525359358avoid-auto-linking' style='Margin:0;color:#5d6879;font-family:Georgia,serif;font-size:24px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;word-wrap:normal'>"+
    //                    "Verify Email"+
    //                 "</h3>"+
    //               "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //                 "<p style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
    //                  "Hello,"+
    //                 "</p>"+
    //                 "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
    //                 "</p><p>You have to verify your Email to enter to the EPharma.</p>"+
    //                 "<p></p>"+
    //                 "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //                   "<center style='min-width:532px;width:100%'>"+
    //                 "<table class='m_1283199651525359358button' style='Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;float:none;margin:0 0 16px 0;padding:0;text-align:center;vertical-align:top;width:auto'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;border-radius:9999px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'><table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;background:#4f9c45;border:none;border-collapse:collapse!important;border-radius:9999px;color:#fefefe;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
    //                   _href+
    //                     "Verify Email"+
    //                   "</a>"+
    //                 "</td></tr></tbody></table></td></tr></tbody></table>"+
    //                 "</center>"+
    //       "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //       "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
    //         "</p><p>If you ignore this message, you will not be eligible to enter to the ePharma.</p>"+
    //       "<p>If you didn't request a email verification, let us know.</p>"+
    //       "<p></p>"+
    //       "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='20px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //       "<p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'>"+
    //       "If the button above does not appear, please copy and paste this link into your browser's address bar:<br>"+
    //       "</p><p class='m_1283199651525359358avoid-auto-linking' style='Margin:0;Margin-bottom:10px;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;margin:0;margin-bottom:10px;padding:0;text-align:left'><a href='"+link+"' target='_blank' data-saferedirecturl='http://localhost:4200/home'>"+link+"</a></p>"+
    //       "<p></p>"+
    //       "</th>"+
    //       "<th class='m_1283199651525359358expander' style='Margin:0;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0!important;text-align:left;width:0'></th></tr></tbody></table></th>"+
    //       "</tr></tbody></table>"+
    //       "<table align='center' style='background:#e4e8ee;border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:normal;line-height:1.3;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>"+
    //       "<table style='border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%'><tbody><tr style='padding:0;text-align:left;vertical-align:top'><td height='10px' style='Margin:0;border-collapse:collapse!important;color:#5d6879;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:normal;line-height:10px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word'>&nbsp;</td></tr></tbody></table>"+
    //       "</td></tr></tbody></table>"+
    //       "</td></tr></tbody></table>"+
    //       "</center>"+
    //       "</td>"+
    //       "</tr>"+
    //       "</tbody></table>"+
    //       "<div style='display:none;white-space:nowrap;font:15px courier;line-height:0'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>"+
    //       "<img src='https://ci3.googleusercontent.com/proxy/HdehxmK1b5Akulro3QsNjlwrJMiBNkzLUs0IYl8Z7p_ejpSw3dIWm7lXD6m7zHJlvgGaN-mqZMPnBh4J4B5rRaHEkCLMp6AieRvDJpV5yOL591GlcKzQUrvZuowvjaJrHCn3bhojFOnOHMjJGdnTjjoCjQ3jCZ6uTix1MpEvdqcf7i6DrxF6r9yS3CbNBCbTKzMLVvjbO2m7GR1Fk0_S8ScA_2d34ykilEQJ0rKKt5wgxFrtkNd7KPOfkiVdBmFe3ukWrco6Z9mHZonVzFB_fGesWWYFWEPuhE3ZvM8zsr-Z31mFLhJo7AHDrA17SXoW0HB6vCqwFh_lzU7w2_fA21qDy9BmdeMa1vWcSrBC1kJWcEBcE1IBiGYOryKRgj7pYiF6SlFCVbeJ53aF7mCH97bhwE6RJQ_-xyJjUJjsdlfQ37EPzxYlC27c7dUcNfkpcMC-b2AfylwgCfc=s0-d-e1-ft#http://email-link.overleaf.com/wf/open?upn=hHCzDyOaMqV-2BKGOubZbS-2FsKms-2B0H-2B625sn5WlmTP-2BdsG1hT-2FhQhCa3xVME-2FGESiKhhgcDaS1J1-2BOmBIa4G9G9c-2FGq8dbpuqq73ttdsHIiW7NDaBwShUOC6U-2BR-2FppzUOyd3eg80BZm-2FHUeF1YCI-2FtEaxGoE7POnsXXROKVWjSSmAaLd0Lh9m0Ht97EIp4tq0uirvv0VAVWQPtd9QQSh0WYw7-2BNV3f39zYKbNOiiD2SIGe1AAKrUJGiWTHzlsUxEkg' alt='' width='1' height='1' border='0' style='height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important' class='CToWUd'></div><div class='yj6qo'></div><div class='adL'>"+
    //       "</div></div></div>"+
    //       "</body>"+
    //       "</html>";

    return message;
  }

}
