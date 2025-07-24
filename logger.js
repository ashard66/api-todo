const logger = (req, res, next) => {
  // Waktu saat request diterima
  const startTime = new Date();

  // Mencatat informasi request
  console.log(`[${startTime.toISOString()}] ➡️ ${req.method} ${req.originalUrl} ${req.headers['user-agent']}`);

  // Menunggu sampai response selesai dikirim
  res.on('finish', () => {
    const endTime = new Date();
    // Menghitung durasi request
    const duration = endTime - startTime;
    // Mencatat informasi response
    console.log(`[${endTime.toISOString()}] ⬅️ ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

  // Melanjutkan ke middleware atau route handler berikutnya
  next();
};

module.exports = logger;