export type RawDishIngredientType = {
  id: number,
  dish_id: number,
  ingredient_id: number,
  quantity: number,
  unit_id: number,
  user_id: number,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date | null,
}