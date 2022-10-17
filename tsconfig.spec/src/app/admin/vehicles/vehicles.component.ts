import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../models/Vehicle';
import { VehiclesService } from '../vehicles/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  addVehicleClick: boolean = false;
  updateStatus: boolean = false;
  vehicles: Vehicle[] = [];
  errorMessage!: String
  vehicleForm!: FormGroup;
  vehicleStatusForm!: FormGroup;
  successInsert!: String;
  vehicleName: String = ''
  vehicleNum: String = ''
  vehicleStatus: String = ''
  isVehicleCreated!: boolean;
  updateSuccess!: String;

  isData: boolean = false;
  isError: boolean = false;

  constructor(private vehicleService: VehiclesService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fetchAllVehicles();
    this.vehicleForm = this.formBuilder.group({
      vehicleNumber: ['', [Validators.required, Validators.pattern('[A-Za-z]{2}[0-9]{4}')]],
      vehicleName: ['', [Validators.required, Validators.maxLength(30)]],
      maxLiftingCapacity: ['', [Validators.required]],
      retireDate: ['', Validators.required],
      vehicleStatus: ['', Validators.required],
      harborLocation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      country: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
    });

    this.vehicleStatusForm = this.formBuilder.group({
      vehicleStatus: ['', Validators.required]
    });
  }
  
  insertVehicle() {
    let date = this.vehicleForm.get('retireDate')?.value;
    console.log(date)
    this.isError = false;
    this.isData = false;
    let vehicle = new Vehicle();
    vehicle.vehicleName = this.vehicleForm.get('vehicleName')?.value;
    vehicle.country = this.vehicleForm.get('country')?.value;
    vehicle.vehicleNumber = this.vehicleForm.get('vehicleNumber')?.value;
    vehicle.maxLiftingCapacity = this.vehicleForm.get('maxLiftingCapacity')?.value;
    vehicle.retireDate = this.vehicleForm.get('retireDate')?.value;
    vehicle.vehicleStatus = this.vehicleForm.get('vehicleStatus')?.value;
    vehicle.harborLocation = this.vehicleForm.get('harborLocation')?.value;
    console.log(this.vehicleForm.get('retireDate')?.value);
    this.vehicleService.insertVehicle(this.vehicleForm.value).subscribe(
      {
        next: (data: any) => {
          this.isVehicleCreated = true;
          this.successInsert = data.message
          //this.ngOnInit();
          alert(this.successInsert)
          window.location.reload()
        },
        error: (error: any) => {
          this.isVehicleCreated = false;
          this.isError = true;
          this.errorMessage = error
          //window.location.reload()
        }
      }
    );
  }

  fetchAllVehicles() {
    this.updateStatus = false;
    this.addVehicleClick = false;
    this.isData = false;
    this.isError = false;
    this.vehicleService.fetchAllVehicles().subscribe(
      (data: any) => this.vehicles = data,
      (error: any) => {
        this.isError = true;
        this.errorMessage = error
      }
    );
  }

  fetchVehicleByName() {
    if (this.vehicleName === '') {
      this.fetchAllVehicles()
    }
    else {
      this.vehicleService.fetchVehicleByName(this.vehicleName).subscribe(
        (data: any) => {
          this.isError = false;
          this.vehicles = data
        },
        (error: any) => {
          this.isError = true;
          this.errorMessage = error
        }
      );
    }

  }

  fetchVehicleByNumber() {
    if (this.vehicleNum === '') {
      this.fetchAllVehicles()
    }
    else {
      this.vehicleService.fetchVehicleByNumber(this.vehicleNum).subscribe(
        (data: any) => {
          this.isError = false;
          this.vehicles = []
          this.vehicles[0] = data
        },
        (error: any) => {
          this.isError = true;
          this.errorMessage = error
        }
      );
    }
  }

  updateVehicleStatus() {
    console.log(this.vehicleNum)
    this.vehicleService.updateVehicleStatus(this.vehicleNum, this.vehicleStatusForm.value).subscribe(
      (data: any) => {
        this.isData = true;
        this.isError = false;
        this.vehicleStatus = this.vehicleStatusForm.value.vehicleStatus
        this.updateSuccess = data.message
      },
      (error: any) => {
        this.isError = true;
        this.isData = false;
        this.errorMessage = error
      }
    )
  }

  removeVehicle(id: String) {
    if (confirm("Are you sure you want to remove vehicle : " + id)) {
      this.vehicleService.removeVehicle(id).subscribe(
        {
          next: (data: any) => {
            this.isData = true;
            this.isError = false;
            this.fetchAllVehicles();
            alert("Vehicle deleted!")
          },
          error: (error: any) => {
            this.isError = false
            this.isData = false;
          }
        }
      );
    }
  }

  renderStatusForm(num: String, status: String) {
    this.vehicleNum = num;
    this.vehicleStatus = status;
    this.updateStatus = true
  }

  renderAddForm() {
    this.addVehicleClick = true;
    this.isError = false;
    this.isData = false;
  }
}
// const d = new Date("1-Nov-2019");

// function transform(d:any) {
//   return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
// }

