import { Component, OnInit } from '@angular/core';
import { ManagerLeavesService } from './manager-leaves.service';
import { Leave } from '../my-leaves/my-leaves.interface';

@Component({
  selector: 'app-manager-leaves',
  templateUrl: './manager-leaves.component.html',
  styleUrls: ['./manager-leaves.component.scss']
})
export class ManagerLeavesComponent implements OnInit {

  leaves!: Leave[];

  constructor(private managerLeavesService: ManagerLeavesService) { }

  ngOnInit(): void {
    this.getManagerLeaves();
  }

  getManagerLeaves() {
    this.managerLeavesService.getManagerLeaves().subscribe({
      next: (data) => {
        console.log('Manager Leaves:', data);
        this.leaves = data;
      },
      error: (error) => {
        console.error('Error fetching manager leaves:', error);
      }
    });
  }

  manageLeave(leaveId: string, status: string) {
    this.managerLeavesService.manageLeave(leaveId, status).subscribe({
      next: () => {
        console.log(`Leave ${leaveId} updated to ${status}`);
        this.getManagerLeaves(); // Refresh the list after managing a leave
      },
      error: (error) => {
        console.error('Error managing leave:', error);
      }
    });
  }

}
