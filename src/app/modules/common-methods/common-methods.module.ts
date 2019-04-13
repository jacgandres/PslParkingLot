import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CommonMethodsModule {
   
  constructor() { }


  public ConvertObjectToArray(snapshot: any) {
    var resultArray = Object.keys(snapshot).map(function (arrayIndex) {
      let itemArray = snapshot[arrayIndex];
      return itemArray;
    });

    return resultArray;
  }

}
