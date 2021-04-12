import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Bai4Component } from "./bai4.component";


export const Bai4Routes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: Bai4Component
        }]
    },
];
@NgModule({
    imports: [RouterModule.forChild(Bai4Routes)],
    exports: [RouterModule]
  })
  export class Baid4RoutingModule { }
  
