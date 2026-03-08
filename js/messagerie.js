async function envoyerMessage(destinataireId, contenu) {
  if (!window.supabaseClient) throw new Error('Supabase non initialisé');
  return window.supabaseClient.from('messages').insert({ destinataire_id: destinataireId, contenu });
}
