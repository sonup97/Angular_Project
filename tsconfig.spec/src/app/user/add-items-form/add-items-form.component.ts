import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-items-form',
  templateUrl: './add-items-form.component.html',
  styleUrls: ['./add-items-form.component.css']
})
export class AddItemsFormComponent implements OnInit {

  @Output() registerEvent = new EventEmitter<any>();
  registerForm!: FormGroup;
  submitted!: boolean;
  workItem!: any;

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      itemName: ['', { updateOn: 'change', validators: [Validators.required] }],
      itemType: ['', { updateOn: 'change', validators: [Validators.required] }],
      itemDescription: ['', { updateOn: 'submit', validators: [Validators.required] }],
      messageToRecipient: ['', { updateOn: 'submit', validators: [Validators.required] }],
      quantity: ['', { updateOn: 'submit', validators: [Validators.required] }],
      sourceCountry: ['', { updateOn: 'submit', validators: [Validators.required] }],
      destinationCountry: ['', { updateOn: 'submit', validators: [Validators.required] }],
      originHarborLocation: ['', { updateOn: 'submit', validators: [Validators.required] }],
      selectedHarborLocations: ['', { updateOn: 'submit', validators: [Validators.required] }],
      shippingDate: ['', { updateOn: 'submit', validators: [Validators.required] }],
      amount: ['', { updateOn: 'submit', validators: [Validators.required] }]
    });
  }

  addItem(itemName: string, itemType: string, itemDescription: string, messageToRecipient: string, quantity: string, sourceCountry: string, destinationCountry: string, originHarborLocation: string, selectedHarborLocations: string, shippingDate: string, amount: string): any {
    this.workItem = {
      itemName, itemType, itemDescription, messageToRecipient, quantity,
      sourceCountry, destinationCountry, originHarborLocation, selectedHarborLocations,
      shippingDate, amount
    }
    this.registerEvent.emit(this.workItem);
    alert("Data added successfully !")
  }


}
