import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from './leave.service';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  leaveForm!: FormGroup;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) { }

  ngOnInit(): void {

    this.leaveForm = this.fb.group(
      {
        startDate: ['',Validators.required],
        endDate: ['',Validators.required],
        reason: ['',Validators.required]
      }
    )
    
  }

  applyLeave()
  {

    if(this.leaveForm.invalid)
    {
      console.log('Form is invalid.');
      return;

    }

    const {startDate,endDate,reason} = this.leaveForm.value;

    this.leaveService.applyLeave(startDate,endDate,reason).subscribe(
      {
        next: (res) => {
          console.log('Leave applied successfully',res);
          this.leaveForm.reset();

        },

        error: (err) => {

          console.error('error applying leave',err)
        }

      }
    );

  }

}
