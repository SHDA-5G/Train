import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
     providedIn : "root"
})
export class HttpService{
  
    constructor(private http: HttpClient) {}
      
    getData(url: string): Observable<any[]>
    {
        return this.http.get<any[]>(url);
    }
    postData(url: string, body: any[])
    {
        const myHeaders = new HttpHeaders().set("Accept", "application/json");
            
        this.http.post(url, body, {headers:myHeaders})
        .subscribe({
            next: (response) => console.log('Response:', response),
            error: (error) => console.error('Error:', error)
          });         
        
    }
    putData (url: string, body: any[])
    {
        const myHeaders = new HttpHeaders().set("Accept", "application/json");
              
        this.http.put(url, body, {headers:myHeaders})
        .subscribe({
            next: (response) => console.log('Response:', response),
            error: (error) => console.error('Error:', error)
          });         
    }
    deleteData(url: string)
    {        
        this.http.delete(url)
        .subscribe({
            next: (response) => console.log('Response:', response),
            error: (error) => console.error('Error:', error)
          });;        
    }
}