import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Terminal } from '../models/Terminal';
import { TerminalsService } from './terminal.service';
@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.css']
})
export class TerminalsComponent implements OnInit {

  addTerminalClick: boolean = false;
  updateTerminalClick: boolean = false;
  terminalsAvailable: boolean = false;

  terminalForm!: FormGroup;
  updateTerminalForm!: FormGroup;

  terminalArray: Terminal[] = [];
  terminalIdToUpdate: string = "";

  errorMessage: string = "";
  successMessage: string = "";

  searchType: string = "";
  filterItemType: string = "";
  filterTerminalId!:number;

  testVariable: string = "";

  // Test code 
  // t:Terminal=new Terminal();
  // t.terminalId = "1";
  // t.terminalName = "vikas";
  // t.country = "india";
  // t.itemType = "nkasc";
  // t.terminalDescription = "aincaicniac";
  // t.capacity = 50;
  // t.availableCapacity = 20;
  // t.status = "good";
  // t.harbourLocation = "mumbai";

  constructor(private terminalService: TerminalsService, private formBuilder: FormBuilder) { }
  // constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.errorMessage = "";
    this.successMessage = "";
    this.testVariable = "Loaded";

    this.getAllTerminals();

    this.terminalForm = this.formBuilder.group({
      terminalId: ['', { updateOn: 'blur', validators: [Validators.minLength(1), Validators.maxLength(20), Validators.required] }],
      terminalName: ['', { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(20), Validators.required] }],
      country: ['', { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(20), Validators.required] }],
      itemType: ['', { updateOn: 'blur', validators: [Validators.minLength(4), Validators.maxLength(30), Validators.required] }],
      terminalDescription: ['', { updateOn: 'blur', validators: [Validators.maxLength(25), Validators.pattern("^T[0-9]{1}[-][a-zA-Z]+"), Validators.required] }],
      capacity: ['', { updateOn: 'blur', validators: [Validators.max(99999), Validators.pattern("^[0-9]+"), Validators.required] }],
      availableCapacity: ['', { updateOn: 'blur', validators: [Validators.max(99999), Validators.pattern("^[0-9]+"), Validators.required] }],
      status: ['', { updateOn: 'blur', validators: [Validators.pattern("^(Available|NotAvailable)$"), Validators.required] }],
      harbourLocation: ['', { updateOn: 'blur', validators: [Validators.minLength(5), Validators.maxLength(25), Validators.required] }]
    });

    /*  this.terminalForm = this.formBuilder.group({
      terminalName: ['', Validators.required],
      country: ['', Validators.required],
      itemType: ['', Validators.required],
      terminalDescription: ['', Validators.required],
      capacity: ['', Validators.required],
      status: ['', Validators.required],
      harbourLocation: ['', Validators.required]
    });*/

    this.updateTerminalForm = this.formBuilder.group({
      capacityToReduce: ['', [Validators.required, Validators.min(0)]],
    });
  }

  updateTerminalRequest(terminalId: string) {
    this.terminalIdToUpdate = terminalId;
    this.updateTerminalClick = true;
  }

  getAllTerminals() {
    this.filterItemType = "";
    this.errorMessage = "";
    this.successMessage = "";
    this.terminalService.getAllTerminals().subscribe(
      hero => {
        console.log(hero);

        this.terminalArray = hero.sort((a: any, b: any) => {
          if (a.terminalId < b.terminalId) {
            return -1;
          } else if (a.terminalId > b.terminalId) {
            return 1;
          } else {
            return 0;
          }
        });
        if (this.terminalArray.length > 0) {
          this.terminalsAvailable = true;
        }
        else {
          this.terminalsAvailable = false;
        }
      },
      error => this.errorMessage = <any>error);
  }



  getTerminalsByTerminalId(terminalId: number) {
    this.errorMessage = "";
    this.successMessage = "";
    this.terminalService.getTerminalsByTerminalId(this.filterTerminalId).subscribe(
      data => {
        console.log(data);
        this.terminalsAvailable = true;
        this.terminalArray = [];
        this.terminalArray.push(data);
        console.log(this.terminalArray);
      },
      error => {
        this.terminalsAvailable = false;
        this.errorMessage = <any>error
      }
    )

  }

  getTerminalsByItemType(itemType: string) {
    this.errorMessage = "";
    this.successMessage = "";
    this.terminalService.getTerminalsByItemType(itemType).subscribe(
      data => {
        console.log(data);
        this.terminalsAvailable = true;
        this.terminalArray = data
      },
      error => {
        this.terminalsAvailable = false;
        this.errorMessage = <any>error
      }
    )
  }

  deleteTerminal(terminalId: string) {
    this.errorMessage = "";
    this.successMessage = "";
    if (confirm('Are you sure you want to delete the terminal?')) {
      // this.successMessage = "Deleted"
      this.terminalService.deleteTerminal(terminalId).subscribe(
        hero => {
          this.successMessage = hero.message;
          // alert(this.successMessage);
          this.getAllTerminals();
        },
        error => {

          this.errorMessage = <any>error
          // alert(this.errorMessage)
          this.getAllTerminals()
        }
      )
    } else {
      console.log('Deletion cancelled');
    }
    this.getAllTerminals();
  }

  updateTerminal() {
    this.errorMessage = "";
    this.successMessage = "";
    // let capToReduce = this.updateTerminalForm.get('capacityToReduce')?.value;
    this.terminalService.updateTerminal(this.terminalIdToUpdate, this.updateTerminalForm.get('capacityToReduce')?.value)
      .subscribe(
        (hero) => {
          // this.successMessage = hero.message;
          this.updateTerminalClick = false;
          this.ngOnInit();
        },
        error => {
           this.errorMessage = <any>error.error.text;
          if(this.errorMessage.includes("Updated successfully")){
            this.successMessage=this.errorMessage;
            this.updateTerminalClick = false;
            this.ngOnInit();
        }
        else{
          this.errorMessage=<any>error.error.text;
        }
      }
       );
  }

  addTerminal() {
    this.addTerminalClick = true;
    this.errorMessage = "";
    this.successMessage = "";
  }

  insertNewTerminal() {
    this.errorMessage = "";
    this.successMessage = "";
    let terminal = new Terminal();
    terminal.terminalId =  this.terminalForm.get('terminalId')?.value;
    terminal.terminalName = this.terminalForm.get('terminalName')?.value;
    terminal.country = this.terminalForm.get('country')?.value;
    terminal.itemType = this.terminalForm.get('itemType')?.value;
    terminal.terminalDescription = this.terminalForm.get('terminalDescription')?.value;
    terminal.capacity = this.terminalForm.get('capacity')?.value;
    terminal.availableCapacity = this.terminalForm.get('capacity')?.value;
    terminal.status = this.terminalForm.get('status')?.value;
    terminal.harborLocation = this.terminalForm.get('harbourLocation')?.value;
    terminal.availableCapacity = this.terminalForm.get('availableCapacity')?.value;


    this.terminalService.insertNewTerminal(terminal)
      .subscribe(
        hero => {
          // this.terminalArray.push(hero)
          this.addTerminalClick = false;
          this.ngOnInit();
        },
        error => {
          console.log(error);
          
          console.log(this.errorMessage);
        }
      );
  }

  cancelUpdate() {
    this.updateTerminalClick = false
    this.ngOnInit();
  }


  cancelAdd() {
    this.addTerminalClick = false
    this.ngOnInit();
  }

}
