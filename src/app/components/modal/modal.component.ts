import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, OnInit, Type } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent!: ViewContainerRef;

  componentRef!: ComponentRef<any>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.componentRequested$.subscribe(({ component, data }) => {
      this.loadComponent(component, data);
    });
  }

  loadComponent(component: Type<any>, data?: any) {
    this.dynamicContent.clear();
    const componentRef = this.dynamicContent.createComponent(component);

    if (data) {
      Object.assign(componentRef.instance, data);
    }
  }

}
