import { LayoutModule } from "@angular/cdk/layout";
import { OverlayModule } from "@angular/cdk/overlay";
import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule,} from "@angular/material/menu";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AgmCoreModule } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { AgmJsMarkerClustererModule } from "@agm/js-marker-clusterer";
import { FormsModule } from "@angular/forms";
import { Config } from "src/assets/config";
import {
  LocationStrategy,
  HashLocationStrategy,
  KeyValuePipe,
} from "@angular/common";
//import {MaterialTimePickerModule} from '@candidosales/material-time-picker';
import { MatDialogRef } from '@angular/material/dialog';








// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
   // MaterialTimePickerModule,
   // MatDialogRef,
	MatButtonModule,
    OverlayModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true,
      autoDismiss: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: Config.API_KEY,
      libraries: ["places", "geometry"],
    }),
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule,
  ],

  exports: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    KeyValuePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
