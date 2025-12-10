export interface CareGuideViewModel {
  id: number;
  speciesId: number;
  soilType: string;
  fertilizerType: string;
  wateringFrequency: string;
}

export interface CareGuideCreateViewModel {
  speciesId: number;
  soilType: string;
  fertilizerType: string;
  wateringFrequency: string;
}
