import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  myList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}
  getmyList() {
    this.myList = this.firebasedb.list('titles');
    return this.myList;
  }
  addTitle(title: string) {
    this.myList.push({ title: title, isChecked: false });
  }
  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.myList.update($key, { isChecked: flag });
  }
  removeTitle($key: string) {
    this.myList.remove($key);
  }
}
