import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SettingsService } from '../../settings.service';
import { AppService } from '../../app.service';
import { NgProgress } from 'ngx-progressbar';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bf-layout',
  template: `
    <nz-layout class="layout">
      <ng-progress [showSpinner]="false" [color]="'orange'"></ng-progress>
      <nz-header>
        <bf-header></bf-header>
      </nz-header>
      <nz-layout>
        <nz-sider
          [nzWidth]="settings.layout.aside_width"
          [nzCollapsible]="false"
          class="aside"
          [ngClass]="{'aside--collapsed': settings.layout.collapsed}">
          <bf-aside></bf-aside>
        </nz-sider>
        <nz-layout class="primary">
          <nz-content>
            <router-outlet></router-outlet>
          </nz-content>
          <nz-footer>
            <bf-footer></bf-footer>
          </nz-footer>
        </nz-layout>
      </nz-layout>
    </nz-layout>
  `,
  styleUrls: ['./layout.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  private sub = new Subscription();

  constructor(
    private ngProgress: NgProgress,
    private app: AppService,
    public settings: SettingsService
  ) {
    this.loading$ = this.app.loading$;
  }

  ngOnInit() {
    this.sub.add(this.loading$.subscribe(loading => {
      if (loading) {
        this.ngProgress.start();
      } else {
        this.ngProgress.done();
      }
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
