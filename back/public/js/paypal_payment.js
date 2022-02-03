

async function getPaypalURL() {
  const resp = await fetch('/payment/paypalurl');
  if (resp.status === 201 || resp.status === 304) {
    const data = await resp.json();
    return data.path
  }
  return null;
}

function preparePaypal() {
  console.log('prepare paypal');
  const link = document.querySelector('.paypalPayment');
  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    getPaypalURL().then(url => {
      if (url) {
        document.location.href = url;
      }
    })
  })
}

function main() {
  preparePaypal();
}

main();
