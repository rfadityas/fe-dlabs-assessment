import * as yup from "yup";

//  Membuat schema untuk validasi data user dengan menggunakan library yup
export const userSchema = yup.object({
    name: yup.string().required(), // Nama user (string & required)
    email: yup.string().email().required(), // Email user (format email)
    age: yup.number().positive().integer().required(), // Umur user (angka positif & integer)
    isActive: yup.boolean().required(), // Status user (aktif / tidak aktif)
}).required(); // Data user (required)