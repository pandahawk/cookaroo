import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDialog} from './confirm-dialog';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Mock} from 'vitest';


describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;
  let dialogRefMock: { close: Mock };
  const dialogData = { title: 'Delete recipe', message: 'Are you sure?' };

  beforeEach(async () => {
    dialogRefMock = {
      close: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
      providers: [
        {provide: ActivatedRoute, useValue: {},},
        {provide: MatDialogRef, useValue: dialogRefMock,},
        {provide: MAT_DIALOG_DATA, useValue: dialogData},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the dialog', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should confirm the dialog', () => {
    component.confirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

});
