import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditLeaveService } from './edit-leave.service';

@Component({
  selector: 'app-edit-leave',
  templateUrl: './edit-leave.component.html',
  styleUrls: ['./edit-leave.component.scss']
})
export class EditLeaveComponent implements OnInit {

  editleaveForm!: FormGroup;
  leaveId! : string;

  constructor(private fb: FormBuilder,private editLeaveService: EditLeaveService,private route:ActivatedRoute, private router: Router ) { }

  
  ngOnInit(): void {

    this.editleaveForm = this.fb.group(
      {
        startDate: ['',Validators.required],
        endDate: ['',Validators.required],
        reason: ['',Validators.required]
      }

    )


     this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id)
      {
        this.leaveId = id;
        this.fetchLeaveData(id);
      }
    });
  
  }

  fetchLeaveData(id: string) {
    this.editLeaveService.getLeaveById(id).subscribe({
      next: (data) => {
        this.editleaveForm.patchValue({
          startDate: data.startDate,
          endDate: data.endDate,
        reason: data.reason});
      },
      error: (err) => {
        console.error('Failed to fetch leave data', err);
      }
    });


  }
  

 
  

  updateLeave()
      {

            if (this.editleaveForm.valid)
               {
                  this.editLeaveService.updateLeave(this.leaveId, this.editleaveForm.value).subscribe({
                    next: () => this.router.navigate(['/myleaves']), // redirect on success
                    error: err => console.error('Update failed', err)
                  });
                }
      }
        
      

}
