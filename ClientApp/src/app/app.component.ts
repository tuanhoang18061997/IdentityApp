import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ClientApp';

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.accountService.getJWT();
    if(jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: _ => {
          this.accountService.logout();
        }
      })
    }else {
      console.log("Khong co JWT");
      this.accountService.refreshUser(null).subscribe();
    }
  }
}
