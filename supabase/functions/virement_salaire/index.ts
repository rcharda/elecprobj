import { serve } from 'https://deno.land/std/http/server.ts';

serve(async (req) => {
  const { employe_telephone, montant } = await req.json();
  const response = await fetch('https://api.fedapay.com/v1/payouts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('FEDAPAY_SECRET_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: montant,
      currency: { iso: 'XOF' },
      mode: 'mtn',
      customer: { phone_number: employe_telephone },
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify({ reference: data.id }), {
    headers: { 'Content-Type': 'application/json' },
    status: response.ok ? 200 : 400,
  });
});
