import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FinancieroComponent } from "./financiero.component";

const routes: Routes = [
  { path: "", component: FinancieroComponent, children: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancieroRoutingModule {}
