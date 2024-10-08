import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    menuList: any=[];
    value: any=1;
    constructor(public router: Router) {}
    toggleValue = true;
    toggleValueDashboard=true;

    // ngOnInit() {
    //     this.showMenu = '';
    //     this.menuList=JSON.parse(localStorage.getItem('menu'))
    //     this.menuList.sort((a, b) => {
    //         if (a.header === 'Main') return -1; 
    //         if (b.header === 'Main') return 1;
    //         return a.header.localeCompare(b.header);
    //     });
    //     console.log(this.menuList,'menu List')
    // }

    ngOnInit() {
        this.showMenu = '';
        this.menuList = JSON.parse(localStorage.getItem('menu'));
    
        // Sort headers, ensuring "Main" comes first
        this.menuList.sort((a, b) => {
            if (a.header === 'Main') return -1;
            if (b.header === 'Main') return 1;
            return a.header.localeCompare(b.header);
        });
    
        // Sort the menuList inside each header object
        this.menuList.forEach(header => {
            if (header.menuList && Array.isArray(header.menuList)) {
                header.menuList.sort((a, b) => a.lable.localeCompare(b.lable));
            }
        });
    
        console.log(this.menuList, 'menu List');
    }
    

    getIndex(i){
        console.log(i)
        this.value= i;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
