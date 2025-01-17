import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../core/models/users";
import {Subscription} from "rxjs";
import {UsersService} from "../../services/users.service";
import {UsersStoreService} from "../../services/users-store.service";
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit, OnDestroy {

  headers: string[] = ['user name'];
  usersList: User[] = [];

  private userSubscription!: Subscription;

  constructor(private usersService: UsersService, private usersStoreService:UsersStoreService) {
  }

  ngOnInit() {
    this.userSubscription = this.usersService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.usersStoreService.users = users;
      }
    })
    this.usersStoreService.users$.subscribe(users => this.usersList = users);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // delete(id: number) {
  //   this.usersService.deleteUser(id).subscribe(v => {
  //     this.usersStoreService.deleteUserById(id);
  //   })
  // }

}
