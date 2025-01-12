import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faArrowsRotate,
  faFileContract,
  faIdCard,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from '../../../../core/models/breadcrumb.model';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent implements OnInit {
  breadcrumb: Breadcrumb[] = [
    {
      name: 'breadcrumb.settings',
    },
    {
      name: 'breadcrumb.account-settings',
    },
  ];

  faIdCard = faIdCard;
  faArrowsRotate = faArrowsRotate;
  faShieldHalved = faShieldHalved;
  faFileContract = faFileContract;

  currentTab = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const accordionId = params['accordion-id'];
      if (accordionId) {
        this.currentTab = parseInt(accordionId, 10); // Atualiza a aba ativa
      }
    });
  }
}
