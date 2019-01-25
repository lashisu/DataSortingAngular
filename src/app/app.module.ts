import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpHelperService } from './http-helper.service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MemberComponent } from './member/member.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports :[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
