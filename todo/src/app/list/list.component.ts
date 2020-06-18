import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [TodoService],
})
export class ListComponent implements OnInit {
  myListArray: any[];
  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.toDoService
      .getmyList()
      .snapshotChanges()
      .subscribe((item) => {
        this.myListArray = [];
        item.forEach((element) => {
          var x = element.payload.toJSON();
          x['$key'] = element.key;
          this.myListArray.push(x);
        });
        this.myListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);
  }
  delete($key: string) {
    this.toDoService.removeTitle($key);
  }
}
