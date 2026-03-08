async function getUnreadNotificationsCount(userId) {
  if (!window.supabaseClient || !userId) return 0;
  const { count } = await window.supabaseClient
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('destinataire_id', userId)
    .eq('lu', false);
  return count || 0;
}
