import { Component, OnInit } from '@angular/core';
import { WorkItems } from '../models/WorkItems';
import { WorkItemsService } from './work-items.service';

@Component({
  selector: 'app-work-items',
  templateUrl: './work-items.component.html',
  styleUrls: ['./work-items.component.css']
})
export class WorkItemsComponent implements OnInit {

  sortoption: string = "";
  isFormInvoked: boolean = false;
  hide: boolean = false;
  items!: WorkItems[];
  errorMessage!: string;
  constructor(private workI: WorkItemsService) { }

  getItems() {
    this.workI.getItems().subscribe({
      next: items => this.items = items,
      error: error => this.errorMessage = <any>error
    })
  }

  addItem(items: WorkItems): void {
    this.workI.addItems(items).subscribe({
      next: (item: any) => {
        this.items.push(item);
        this.isFormInvoked = false;
        this.hide = false;
        console.log(this.isFormInvoked, this.hide)
        // window.location.reload();
        this.getItems();
      },
      error: (error: any) => {
        console.log(error)
        this.getItems();
        this.isFormInvoked = false;
        this.hide = false;
        console.log(this.isFormInvoked, this.hide)
      }
    })
      ;
  }

  ngOnInit() {
    this.getItems();
  }

}

