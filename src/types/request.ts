export interface GetPetsQuery {
  adopted?: string;
  species?: string;
}

export interface GetSinglePetParams {
  id: string;
}
