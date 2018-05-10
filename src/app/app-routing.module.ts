import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { AuthGuard } from 'bfend';
import { LayoutComponent } from './shared/layout.component';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      // 仪表盘
      {
        path: 'dashboard',
        canLoad: [AuthGuard],
        data: {acl: 'dashboard.*'},
        canActivateChild: [AuthGuard],
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'table',
        data: {acl: 'table.*'},
        canActivateChild: [AuthGuard],
        loadChildren: 'app/table/table.module#TableModule',
      }
    ]
  },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutesModule {
}
