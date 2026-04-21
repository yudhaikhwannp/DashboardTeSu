export default function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Ambil password dari body request
  const { password } = req.body;
  
  // Ambil kode rahasia dari Vercel Environment Variables
  const secretCode = process.env.DASHBOARD_SECRET_CODE;

  // Cek apakah password cocok
  if (password === secretCode) {
    // Jika cocok, kembalikan respons sukses (bisa juga JWT Token di sini)
    return res.status(200).json({ 
      success: true, 
      token: 'mandiri-authenticated' 
    });
  } else {
    // Jika salah, tolak akses
    return res.status(401).json({ 
      success: false, 
      message: 'Kode rahasia yang Anda masukkan salah.' 
    });
  }
}
