
function prepareMercadoForm(amount, token) {
  const mp = new MercadoPago(token);
  const cardForm = mp.cardForm({
    amount,
    autoMount: true,
    form: {
      id: "form-checkout",
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular de la tarjeta",
      },
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "E-mail",
      },
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número de la tarjeta",
      },
      cardExpirationDate: {
        id: "form-checkout__cardExpirationDate",
        placeholder: "Data de vencimiento (MM/YYYY)",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de seguridad",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Cuotas",
      },
      identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Número de documento",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emisor",
      },
    },
    callbacks: {
      onFormMounted: error => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        console.log("Form mounted");
      },

      onSubmit: event => {
        event.preventDefault();

        const {
          paymentMethodId: payment_method_id,
          issuerId: issuer_id,
          cardholderEmail: email,
          amount,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();

        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Celular",
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          }),
        })
          .then(response => response.json())
          .then(json => {
            alert(JSON.stringify(json));
            goHome();
          })
          .catch(error => {
            alert(error.message);
            goHome();
          })
          ;
      },
      onFetching: (resource) => {
        console.log("Fetching resource: ", resource);

        // Animate progress bar
        const progressBar = document.querySelector(".progress-bar");
        progressBar.removeAttribute("value");

        return () => {
          progressBar.setAttribute("value", "0");
        };
      }
    },
  });
}

async function getPublicToken() {
  const resp = await fetch('/payment/token');
  const data = await resp.json();
  return data.token
}

function getFromQuery(param) {
  const stringValue = location.search
    .replace('?', '')
    .split('&')
    .find(cadena => cadena.includes(param))
    ?.split('=')[1];
  // if (stringValue !== undefined
  //     && stringValue !== null
  //     && stringValue.length > 0)
  if (stringValue?.length > 0) {
    return stringValue;
  } else {
    return null
  }
}

function goHome() {
  location.href = '/';
}

function prepareMercadoPago() {
  const amount = getFromQuery('amount');
  // const username = getFromQuery('username');
  if (!amount) {
    alert('Valor invalido.');
    goHome();
  }
  getPublicToken()
    .then(token => {
      prepareMercadoForm(amount, token);
    })
    .catch(error => console.log(error))
}

function main() {
  prepareMercadoPago();
}

main();
