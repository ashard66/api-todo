const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error untuk debugging

  // Atur status default jika tidak ada status yang spesifik
  const statusCode = err.status || 500;
  
  // Kirim response error yang konsisten
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: err.message || 'Terjadi kesalahan di server'
  });
};

module.exports = errorHandler;