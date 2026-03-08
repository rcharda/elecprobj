function initPaiementFedaPay({ montant, description, customer, onComplete }) {
  if (!window.FedaPay) throw new Error('FedaPay SDK indisponible');
  const publicKey = window.__ELECPRO_ENV__?.FEDAPAY_PUBLIC_KEY;
  window.FedaPay.init({
    public_key: publicKey,
    transaction: { amount: montant, description },
    customer,
    onComplete,
  });
}
