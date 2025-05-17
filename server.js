const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(express.json());
app.use(cors());

// Insira aqui sua chave do Mercado Pago (de teste ou produção)
mercadopago.configure({
  access_token: 'SEU_ACCESS_TOKEN_AQUI'
});

app.post("/criar-pagamento", async (req, res) => {
  try {
    const pagamento = await mercadopago.preferences.create({
      items: [
        {
          title: "Rifa UMADAR",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 0.01
        }
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: 1
      },
      back_urls: {
        success: "https://seudominio.com/sucesso",
        failure: "https://seudominio.com/erro",
        pending: "https://seudominio.com/pendente"
      },
      auto_return: "approved"
    });

    res.json({ url: pagamento.body.init_point });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
