import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { MapsPage } from '../maps/maps';
import { ListPage } from '../list/list';
import { AddContPage } from '../add-cont/add-cont';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapsPage;
  tab3Root = AddContPage;
  tab4Root = ListPage;

  constructor() {

  }
}
