import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserServiceService} from "../../../../Services/user-service.service"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    public user :UserServiceService,
    public route :ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  orderId='5eff659d686b0a0f7d277841'

  sendFeedback(name,feedback,form:NgForm){
    const id =this.route.snapshot.params.id
    if(form.invalid){
      return;
    }
    // console.log(name,feedback)
    this.user.sendCustomerFeedback(this.orderId,name,feedback) //set id
    .subscribe(result=>{
      console.log(result)

    }
    )

  }

}
