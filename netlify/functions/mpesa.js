exports.handler = async (event) => {
  try {
    const { phone, amount } = JSON.parse(event.body);
    if(!phone) return { statusCode: 400, body: "Phone required" };
    
    let phone254 = phone.toString().replace(/\s/g,"");
    if(phone254.startsWith("0")) phone254 = "254" + phone254.slice(1);
    if(phone254.startsWith("+")) phone254 = phone254.slice(1);
    
    const res = await fetch("https://payment.intasend.com/api/v1/payment/mpesa-stk-push/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.INTASEND_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone_number: phone254,
        email: "orders@ankotom.co.ke",
        amount: parseInt(amount) || 10,
        narrative: "ANKOTOM Order",
        api_ref: "ANKOTOM-" + Date.now()
      })
    });
    
    const data = await res.json();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data, message: "STK sent to " + phone254 })
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
