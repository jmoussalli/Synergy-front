import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { UsersStoreService } from '../../services/users-store.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css'],
})
export class RegisterUsersComponent {
  formUser!: FormGroup;
  modalRef?: BsModalRef;
  registerForm!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private usersStoreService: UsersStoreService,
    private router: Router
  ) {
    this.createForm();
  }
  createForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  save() {
    const newUser = { ...this.formUser.value };
    this.usersService.addUser(newUser).subscribe((v) => {
      this.usersStoreService.addUser(newUser);
      this.router.navigate(['/users']);
    });
  }
}
