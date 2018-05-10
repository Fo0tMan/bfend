import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { TableEditComponent } from 'app/table/table-edit.component';

@Component({
  template: `
    <bf-page caption="表格" [description]="description">
      <ng-template #description>列表页操作演示</ng-template>

      <nz-card>
        <form class="search-form" nz-form [nzLayout]="'inline'">
          <nz-row [nzGutter]="{ md: 8, lg: 24, xl: 48 }">
            <nz-col [nzMd]="8" [nzSm]="24">
              <nz-form-item>
                <nz-form-label nzFor="no">规则编号</nz-form-label>
                <nz-form-control>
                  <input nz-input name="no" placeholder="请输入" id="no">
                </nz-form-control>
              </nz-form-item>
            </nz-col>
            <nz-col [nzMd]="8" [nzSm]="24">
              <nz-form-item>
                <nz-form-label nzFor="status">使用状态</nz-form-label>
                <nz-form-control>
                  <nz-select name="status" id="status" [nzPlaceHolder]="'请选择'" [nzShowSearch]="true">
                    <nz-option [nzLabel]="'成功'" [nzValue]="1"></nz-option>
                    <nz-option [nzLabel]="'失败'" [nzValue]="0"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>
            </nz-col>
            <nz-col [nzMd]="8" [nzSm]="24" *ngIf="expandForm">
              <nz-form-item>
                <nz-form-label nzFor="callNo">调用次数</nz-form-label>
                <nz-form-control>
                  <input nz-input id="callNo">
                </nz-form-control>
              </nz-form-item>
            </nz-col>
            <nz-col [nzMd]="8" [nzSm]="24" *ngIf="expandForm">
              <nz-form-item>
                <nz-form-label nzFor="updatedAt">更新日期</nz-form-label>
                <nz-form-control>
                </nz-form-control>
              </nz-form-item>
            </nz-col>
            <nz-col [nzMd]="8" [nzSm]="24" *ngIf="expandForm">
              <nz-form-item>
                <nz-form-label nzFor="status2">使用状态</nz-form-label>
                <nz-form-control>
                  <nz-select [nzPlaceHolder]="'请选择'" nzId="status2" [nzShowSearch]="true">
                    <nz-option [nzLabel]="'成功'" [nzValue]="1"></nz-option>
                    <nz-option [nzLabel]="'失败'" [nzValue]="0"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>
            </nz-col>
            <nz-col [nzMd]="8" [nzSm]="24" *ngIf="expandForm">
              <nz-form-item>
                <nz-form-label nzFor="status3">使用状态</nz-form-label>
                <nz-form-control>
                  <nz-select [nzPlaceHolder]="'请选择'" nzId="status3" [nzShowSearch]="true">
                    <nz-option [nzLabel]="'成功'" [nzValue]="1"></nz-option>
                    <nz-option [nzLabel]="'失败'" [nzValue]="0"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>
            </nz-col>
            <nz-col [nzSpan]="expandForm ? 24 : 8" [class.text-right]="expandForm">
              <button nz-button type="submit" [nzType]="'primary'" [nzLoading]="loading">查询</button>
              <button nz-button type="reset" class="mx-sm">重置</button>
              <a (click)="expandForm=!expandForm">
                {{expandForm ? '收起' : '展开'}}
                <i class="anticon" [class.anticon-down]="!expandForm" [class.anticon-up]="expandForm"></i>
              </a>
            </nz-col>
          </nz-row>
        </form>

        <button nz-button [nzType]="'primary'" (click)="edit()" class="mb-sm">
          <i class="anticon anticon-plus"></i>
          <span>新建</span>
        </button>

        <nz-table #nzTable
                  [nzData]="data"
                  [nzFrontPagination]="false"
                  [nzTotal]="page.total"
                  [(nzPageIndex)]="page.index"
                  [(nzPageSize)]="page.size"
                  (nzPageIndexChange)="onPageIndexChange($event)"
                  [nzSize]="'middle'"
                  [nzLoading]="loading"
                  [nzLoadingDelay]="1000">
          <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th [nzWidth]="'150px'">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let data of nzTable.data">
            <td>{{data.name}}</td>
            <td>{{data.age}}</td>
            <td>{{data.address}}</td>
            <td>
          <span [acl]="'table.edit'">
            <a (click)="edit(123)">编辑</a>
            <nz-divider nzType="vertical"></nz-divider>
          </span>
              <nz-popconfirm [nzTitle]="'确定要删除吗？'">
                <a class="text-error" nz-popconfirm>删除</a>
              </nz-popconfirm>
            </td>
          </tr>
          </tbody>
        </nz-table>
      </nz-card>
    </bf-page>
  `
})
export class TableComponent implements OnInit {
  data: any;

  loading = false;

  expandForm = false;

  page = {
    index: 1,
    total: 100,
    size: 20
  };

  constructor(private nzModal: NzModalService ) {}

  ngOnInit() {
    this.data = [
      {name: 'hypo', age: 30, address: '重庆'},
      {name: 'cindy', age: 29, address: '九龙坡'},
    ];
  }

  load() {

  }

  edit(id?) {
    const modal = this.nzModal.create({
      nzTitle: id ? '编辑' : '添加',
      nzContent: TableEditComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        id
      }
    });
  }

  onPageIndexChange(index) {
    this.load();
  }
}
