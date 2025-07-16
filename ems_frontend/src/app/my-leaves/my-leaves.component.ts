import { Component, OnInit } from '@angular/core';
import { MyLeavesService } from './my-leaves.service';
import { Leave } from './my-leaves.interface';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.scss']
})
export class MyLeavesComponent implements OnInit {

  leaves!: Leave[];

  constructor(private myLeaveService: MyLeavesService) { }

  ngOnInit(): void {
    this.getMyLeaves();
  }

  getMyLeaves() {
    this.myLeaveService.getMyLeaves().subscribe({
      next: (leaves) => {
        console.log('My leaves fetched successfully', leaves);
        this.leaves = leaves;
      },
      error: (error) => {
        console.error('Error fetching my leaves', error);
        // Handle error, e.g., show an error message
      }
    });
  }


  

}
