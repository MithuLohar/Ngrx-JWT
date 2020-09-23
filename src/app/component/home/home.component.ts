import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { Logout } from 'src/app/store/actions/authentication.actions';
import { AppState, selectAuthenticationState } from 'src/app/store/app.state';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User;
  getState: Observable<any>;
  isAuthenticated: boolean = false;
  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
  }
  logout(): void {
    this.store.dispatch(new Logout());
  }
}
