const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  next();
};

const validatePayment = (req, res, next) => {
  const { amount, currency, merchant_id } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (!currency || currency.length !== 3) {
    return res.status(400).json({ message: "Invalid currency" });
  }

  if (!merchant_id) {
    return res.status(400).json({ message: "Merchant ID required" });
  }

  next();
};

module.exports = { validateRegister, validatePayment };
