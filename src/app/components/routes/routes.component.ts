import { Component, EnvironmentProviders } from '@angular/core';
import {
  CalculateResult,
  RouteItem,
  RouteService,
} from '../../services/route.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
  providers: [RouteService],
})
export class RoutesComponent {
  items: RouteItem[] = [];
  calculatedItem?: CalculateResult;
  origins: string[] = [];
  destinations: string[] = [];

  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;

  newRoute: RouteItem = { id: 0, origin: '', destination: '', value: 0 };

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.routeService.getItems().subscribe(
      (items: RouteItem[]) => {
        this.items = items;
        console.log(items);

        this.origins = items
          .map((item) => item.origin)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => a.localeCompare(b));

        this.destinations = items
          .map((item) => item.destination)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort((a, b) => a.localeCompare(b));
      },
      (error: any) => console.error('Erro ao obter itens:', error)
    );
  }

  deleteItem(id: number): void {
    this.routeService.deleteItem(id).subscribe(
      () => {
        console.log('Item deletado com ID:', id);
        this.getItems();
      },
      (error) => console.error('Erro ao deletar item:', error)
    );
  }

  calculateRoute(origin: string | null, destination: string | null): void {
    if (origin == null || destination == null) {
      return;
    }

    this.routeService.calculate(origin, destination).subscribe(
      (calculatedItem) => {
        this.calculatedItem = calculatedItem;
      },
      (error) => console.error('Erro ao calcular rota:', error)
    );
  }

  // Atualiza a origem selecionada
  onOriginChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOrigin = selectElement.value;
  }

  // Atualiza o destino selecionado
  onDestinationChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDestination = selectElement.value;
  }

  createItem(item: RouteItem): void {
    this.routeService.createItem(item).subscribe(
      (createdItem) => {
        console.log('Item criado:', createdItem);
        this.getItems();
      },
      (error) => console.error('Erro ao criar item:', error)
    );
  }

  addNewItem(): void {
    if (
      this.newRoute.origin &&
      this.newRoute.destination &&
      this.newRoute.value
    ) {
      this.createItem(this.newRoute);

      this.newRoute = { id: 0, origin: '', destination: '', value: 0 };
    } else {
      console.warn('Por favor, preencha todos os campos.');
    }
  }
}
