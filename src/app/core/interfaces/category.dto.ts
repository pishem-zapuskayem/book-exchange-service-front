export interface CategoryDTO
  {
    "id": string,
    "name": string,
    "parent": string,
    "multiselect": boolean,
    "children": CategoryDTO[]
  }
