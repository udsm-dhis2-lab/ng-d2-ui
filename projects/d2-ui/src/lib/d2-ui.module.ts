import { NgModule } from '@angular/core';
import { d2UiComponents } from './components';

@NgModule({
  declarations: [...d2UiComponents],
  imports: [],
  exports: [...d2UiComponents],
})
export class NgD2UiModule {}
