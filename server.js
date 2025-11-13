let express = require('express');
let app = express();
app.use(express.json());

app.post("/", async (req, res) => {
    let { to, from, amount } = req.body;

    if (!to || !from || !amount) {
        return res.send({
            status: false,
            converted_value: "Send Some Value"
        });
    }

    let data = await fetch(`https://v6.exchangerate-api.com/v6/06dde80ea5df9011ad68fc7c/latest/${from}`);
    let real_data = await data.json();

    let to_convert = real_data.conversion_rates[to];

    if (!to_convert) {
        return res.send({
            status: false,
            converted_value: "Invalid currency code"
        });
    }

    res.send({
        status: true,
        converted_value: amount * to_convert
    });
});

app.listen(8000, () => {
    console.log("http://localhost:8000");
});
