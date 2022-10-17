import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { SharedService } from 'src/app/services/shared.service';
import { WorkItemAssociation } from '../models/workItemAssociation';
import { WorkItems } from '../models/WorkItems';
import { WorkItemsService } from './work-items.service';


@Component({
  selector: 'app-work-items',
  templateUrl: './work-items.component.html',
  styleUrls: ['./work-items.component.css']
})
export class WorkItemsComponent implements OnInit {
  isAdmin!: boolean;
  userId!:string;
  addWorkItemsClick = false;
  updateWorkItem = false;
  openWorkItemStatusClick = false;
  addWorkItemsFormGroup!: FormGroup;
  updateWorkItemsFormGroup!: FormGroup;
  countriesList: string[] = [];
  harborList: string[] = [];
  workItemsList: WorkItems[] = [];
  workItemId!: string;
  successMsg: any;
  errorMsg: any;
  workItemAssociation: WorkItemAssociation = new WorkItemAssociation();

  constructor(private fb: FormBuilder, private sharedService: SharedService, private workItemsService: WorkItemsService,private authService: AuthenticationService) {
    // this.sharedService.valueEmmiter.subscribe({
    //   next:(response)=>{
    //     this.isAdmin = response.isAdmin;
    //     this.userId = response.userId;
    //   }
    // });
    if(this.authService.role === 'admin'){
      this.isAdmin=true;
    }
    else{
      this.userId=authService.id.toString();
    }

  }

  ngOnInit(): void {
    this.addWorkItemsFormGroup = this.fb.group({
      itemName: ["", [Validators.required, Validators.min(3), Validators.max(25), Validators.pattern('^[a-zA-Z ]*$')]],
      itemType: ["", Validators.required],
      itemDescription: ["", [Validators.required, Validators.min(10), Validators.max(45), Validators.pattern('^[a-zA-Z ]*$')]],
      messageToRecipient: ["", [Validators.required, Validators.min(10), Validators.max(50), Validators.pattern('^[a-zA-Z ]*$')]],
      quantity: ["", [Validators.required, Validators.pattern("^([0-9]*|[0-9]*(kg|lit|no))?$")]],
      sourceCountry: ["", Validators.required],
      destinationCountry: ["", Validators.required],
      availableHarborLocations: ["", Validators.required],
      shippingDate: ["", Validators.required],
      amount: ["", [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.updateWorkItemsFormGroup = this.fb.group({
      availableHarborLocations: ["", Validators.required],
      shippingDate: ["", Validators.required],
      status: [""]
    });

    if(this.isAdmin) {
      this.populateWorkItems();
    } else {
      this.populateWorkItemsForUser();
    }
  }

  populateWorkItems() {
    this.workItemsService.fetchWorkItems().subscribe(
      response => this.workItemsList = response,
      error => this.errorMsg = <any>error
    );
  }

  populateWorkItemsForUser() {
    this.workItemsService.fetchWorkItemsByUserId(parseInt(this.userId)).subscribe(
      response => this.workItemsList = response,
      error => this.errorMsg = <any>error
    );
  }

  populateAvailableCountries(){
    this.harborList = [];
    this.workItemsService.fetchAvailableCountries().subscribe(
      response => this.countriesList = response,
      error => this.errorMsg = <any>error
    );
  }

  populateAvailableHarborLocations(){
    this.workItemsService.fetchAvailableHarborLocations(this.addWorkItemsFormGroup.value.destinationCountry).subscribe(
      response => this.harborList = response,
      error => this.errorMsg = <any>error
    );
  }

  populateAvailableHarborLocationsForUpdateWorkItems(workItemId: string, country: string){
    this.workItemId = workItemId;
    if(!this.isAdmin){
      this.workItemsService.fetchAvailableHarborLocations(country).subscribe(
        response => this.harborList = response,
        error => this.errorMsg = <any>error
      );
    }
  }

  addWorkItems() {
    this.resetMessage();
    let workItem: WorkItems = new WorkItems();
    workItem.userId = parseInt(this.userId);
    workItem.itemName = this.addWorkItemsFormGroup.value.itemName;
    workItem.itemType = this.addWorkItemsFormGroup.value.itemType;
    workItem.itemDescription = this.addWorkItemsFormGroup.value.itemDescription;
    workItem.messageToRecipient = this.addWorkItemsFormGroup.value.messageToRecipient;
    workItem.quantity = this.addWorkItemsFormGroup.value.quantity;
    workItem.sourceCountry = this.addWorkItemsFormGroup.value.sourceCountry;
    workItem.destinationCountry = this.addWorkItemsFormGroup.value.destinationCountry;
    workItem.originHarborLocations = this.addWorkItemsFormGroup.value.availableHarborLocations;
    workItem.shippingDate = this.addWorkItemsFormGroup.value.shippingDate;
    workItem.amount = this.addWorkItemsFormGroup.value.amount;
    this.workItemsService.createWorkItem(workItem).subscribe(
      response => {
        this.successMsg = "New workitem is created with workitem id " + response.workItemId;
        if(this.isAdmin) {
          this.populateWorkItems();
        } else {
          this.populateWorkItemsForUser();
        }
      },
      error => this.errorMsg = <any>error
    );
    this.addWorkItemsClick=false;
  }

  updateWorkItems() {
    this.resetMessage();
    let workItem: WorkItems = new WorkItems();
    workItem.workItemId = this.workItemId;
    workItem.originHarborLocations = this.updateWorkItemsFormGroup.value.availableHarborLocations;
    workItem.shippingDate = this.updateWorkItemsFormGroup.value.shippingDate;
    workItem.status = this.updateWorkItemsFormGroup.value.status;
    this.workItemsService.updateWorkItem(workItem, workItem.workItemId).subscribe(
      response => {
        this.successMsg = response.message;
        if(this.isAdmin) {
          this.populateWorkItems();
        } else {
          this.populateWorkItemsForUser();
        }
      },
      error => this.errorMsg = <any>error
    );
    this.updateWorkItem=false;
  }

  allocateVehicle(workItemId: string) {
    this.resetMessage();
    this.workItemsService.allocateVehicleforWorKitem(workItemId).subscribe(
      response => this.successMsg = response.message,
      error => this.errorMsg = <any>error
    );
  }

  assignTerminal(workItemId: string) {
    this.resetMessage();
    this.workItemsService.assignTerminalforWorKitem(workItemId).subscribe(
      response => this.successMsg = response.message,
      error => this.errorMsg = <any>error
    );
  }

  openWorkItemStatusModule(workItem: any) {
    this.resetMessage();
    this.workItemAssociation.workItemId = workItem.workItemId;
    this.workItemAssociation.userId = workItem.userId;
    this.workItemAssociation.itemName = workItem.itemName;
    this.workItemAssociation.itemType = workItem.itemType;
    this.workItemAssociation.country = workItem.destinationCountry;
    this.workItemAssociation.harborLocation = workItem.availableHarborLocations;
    this.workItemAssociation.shippingDate = workItem.shippingDate;

    this.workItemsService.fetchWorkItemStatus(workItem.workItemId).subscribe(
      response => {
        if(response != null && response != undefined) {
          this.workItemAssociation.workItemStatus = response.assignedWorkitemStatus;
          this.workItemAssociation.vehicleNumber = response.vehicle.vehicleNumber;
          this.workItemAssociation.vehicleName = response.vehicle.vehicleName;
          this.workItemAssociation.terminalId = response.terminal.terminalId;
          this.workItemAssociation.terminalName = response.terminal.terminalName;
        }
      },
      error => this.errorMsg = <any>error
    );

    this.openWorkItemStatusClick = true;
  }

  resetMessage(){
    this.successMsg = "";
    this.errorMsg = "";
  }

}


























