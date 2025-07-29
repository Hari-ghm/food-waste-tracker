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
