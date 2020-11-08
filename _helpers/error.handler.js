module.exports = errorHandler;

function errorHandler(err ,res) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  return res.status(500).json({ message: err.message });
}
