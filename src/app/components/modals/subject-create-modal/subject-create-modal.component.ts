import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../../common/services/subject.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'subject-create-modal',
  templateUrl: './subject-create-modal.component.html',
  styleUrls: ['subject-create-modal.component.scss'],
})

export class SubjectCreateModalComponent implements OnInit {
  public subjectForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SubjectCreateModalComponent>,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    ) {
  }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  public async createSubject(): Promise<void> {
    try {
      await this.subjectService.createSubject(
        {
          name: this.subjectForm.get('name').value,
          title: this.subjectForm.get('title').value,
        });
      this.close();
    } catch (error) {
      console.log(error);
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
