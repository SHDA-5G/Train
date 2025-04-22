import { Component, OnInit } from "@angular/core";
import { FormsModule }   from "@angular/forms";
import { NgFor,NgIf } from "@angular/common";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { HttpService } from "./services/http.service";
import { Article, Quantity  } from "./services/app.service";
import { AgGridModule } from 'ag-grid-angular';  
import { AllCommunityModule, ModuleRegistry, ColDef} from 'ag-grid-community';

class Art
{
    public id : number;
    public name : string;
}

@Component({
    selector: "train-app",
    standalone: true,
    imports: [FormsModule, AgGridModule, NgFor, NgIf],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers : []          
})
export class AppComponent implements OnInit { 
   
    name: string;
    uniqueNumber : string;
    canAssignQuantity: boolean;

    kolvo: number;
    selectedArticle: string; 
    childId: number;
    blockAddding: boolean;  // if not can assign quantity

    artList: Art[] = [];
    
    constructor(private httpService: HttpService) {      
        ModuleRegistry.registerModules([AllCommunityModule]);
      }
    
    ngOnInit() 
    {       
         let port = 7166;             
         let url = 'https://localhost:' + port + '/Articles';           
         this.httpService.getData(url).subscribe({
          next: (data) => {
            if (!data) {
              console.warn("Data not received");
              return;
            }                    
            this.rowData = data;
            this.artList = this.rowData.map(row => ({
              id: row.articleId,
              name: row.articleName
          }));
                            
          },
          error: (error) => console.error("Error", error),          
         });      

         url = 'https://localhost:' + port + '/Quantities'
         this.httpService.getData(url).subscribe({
          next: (data) => {
            if (!data) {
              console.warn("Data not received");
              return;
            }             
            this.quantities = data;                   
          },
          error: (error) => console.error("Error", error),          
         });      

    }
    rowData: Article[] = [] ;    
    columnDefs: ColDef[] = [{
          field: 'articleId',
          headerName: "articleId" 
        },{
          field: 'articleName',          
          headerName: 'articleName'        
        },{ 
          field: 'uniqueNumber',         
          headerName: 'uniqueNumber'
        },
        {
          field: 'canAssignQuantity',         
          headerName: 'canAssignQuantity'
        }
    ];
    quantities: Quantity [];
    rowDataChild: {
        parentName: string; 
        childName: string;
        kolvo: any; 
      } [] = [];
    columnDefsQuantities: ColDef[] = [{
        field: 'parentName',
        headerName: 'Parent Name'
      },{
        field: 'childName',
        headerName: 'childName'
      },{
        field: 'kolvo',
        headerName: 'Count'      
      }];
    onCellClicked(event: any) { 
       this.childId = event.data.articleId;  
       this.blockAddding = !event.data.canAssignQuantity;       
       
       this.rowDataChild = this.quantities
        .filter(row => row.parentId === this.childId)
        .map(row => {
          let parent = this.artList.find(p => p.id === row.parentId);
          let child = this.artList.find(p => p.id === row.id);    
          return {
            parentName: parent ? parent.name : "Not found",
            childName: child ? child.name : "Not found",
            kolvo: row.kolvo
          };
        });            
    }
    AddArticle()
    {        
      let port = 7166;       
      if (this.name && this.uniqueNumber && this.canAssignQuantity) {                                     
        const urlParams = this.name + '/' + this.uniqueNumber +  '/' + this.canAssignQuantity;
        if (urlParams)
           this.httpService.postData('https://localhost:' + port + '/CreateArticle/' + urlParams , null) 
      }  
      else console.log("Exists the empty params");
    }
    EditCount()
    {
      let port = 7166;  
      
      if (!this.blockAddding && this.kolvo && this.selectedArticle && this.childId) {
        const parentId = this.artList.find( p => p.name.includes(this.selectedArticle)).id;        
        const urlParams = parentId + '/' + this.childId + '/' + this.kolvo; 
        const fullUrl = 'https://localhost:' + port + '/UpdateKolvo/' + urlParams;
        if (fullUrl)
          this.httpService.putData(fullUrl , null)     
      }
    }    
}