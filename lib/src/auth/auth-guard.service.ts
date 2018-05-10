import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import 'rxjs/add/operator/concatAll';

import { AuthService } from './auth.service';
import { ACLService, ACLType } from './acl.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private nzMessage: NzMessageService,
    private authService: AuthService,
    private aclService: ACLService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.check(state.url, typeof route.data.acl !== 'undefined' ? route.data.acl : null);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.check(state.url, typeof route.data.acl !== 'undefined' ? route.data.acl : null);
  }

  canLoad(route: Route) {
    return this.check(`/${route.path}`, typeof route.data.acl !== 'undefined' ? route.data.acl : null);
  }

  private check(url: string, acl?: string | string[] | ACLType): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (!this.authService.isLoggedIn()) {
        this.authService.logout();
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        resolve(false);
      }

      const sub = this.authService.valid$.subscribe(user => {
        if (!this.aclService.can(acl)) {
          this.nzMessage.error('权限不足');
          resolve(false);
        }

        resolve(true);
        setTimeout(() => sub.unsubscribe());
      });
    });
  }
}
