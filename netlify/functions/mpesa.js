// FREE M-Pesa STK - Add your Daraja keys in Netlify > Environment variables
exports.handler = async (event) => {
  const { phone, amount, name } = JSON.parse(event.body);
  // TODO: Add your Daraja logic here after you give me keys
  // For now it simulates success so UI works
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `STK Push sent to ${phone} for Ksh ${amount}. Enter M-Pesa PIN. (Simulated - Add Daraja keys to make real)` })
  };
};
