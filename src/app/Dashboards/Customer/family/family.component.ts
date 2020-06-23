import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  newMember = ' ';
  inputValue=' ';

  addNewMember() {
    this.newMember=this.inputValue;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
