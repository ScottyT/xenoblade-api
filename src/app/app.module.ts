import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { XenobladeSharedModule } from './shared';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        XenobladeSharedModule,
        MatDialogModule
    ],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: { hasBackdrop: false } }],
    bootstrap: [AppComponent]
})
export class AppModule {}
