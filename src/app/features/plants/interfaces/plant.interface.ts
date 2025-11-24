export interface Plant {
  id: number;
  name: string;
  plantingDate: string; // DateOnly from API
  locationId: number;
  speciesId: number;
}

export interface PlantViewModel {
  id: number;
  name: string;
  plantingDate: string; // DateOnly from API
  locationId: number;
  speciesId: number;
}

export interface PlantCreateViewModel {
  name: string;
  plantingDate: string; // DateOnly format: YYYY-MM-DD
  locationId: number;
  speciesId: number;
}
