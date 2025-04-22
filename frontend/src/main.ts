import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { provideHttpClient, withFetch  } from "@angular/common/http";
bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(withFetch())]
}).catch(e => console.error(e));