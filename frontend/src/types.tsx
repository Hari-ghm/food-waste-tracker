export interface SignupFormData {
  email: string;
  name: string;
  type: "ngo" | "household" | "restaurant" | "";
  phone: string;
  address: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface Donation {
  id: number;
  donated_by: number;
  food_name: string;
  quantity: number;
  food_type: string;
  avg_food_per_person: number;
  waste_reason: string;
  notes: string;
  created_at: string;
}