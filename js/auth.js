const ROLE_ROUTES = {
  admin: 'adminespaces.html',
  formateur: 'formateurespace.html',
  apprenant: 'apprenantespace.html',
  boutique: 'espaceboutique.html',
};

async function handleLogin(event) {
  event.preventDefault();
  const err = document.getElementById('error');
  err.style.display = 'none';

  if (!window.supabaseClient) {
    err.textContent = 'Configuration Supabase manquante.';
    err.style.display = 'block';
    return;
  }

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const { error: authError } = await window.supabaseClient.auth.signInWithPassword({ email, password });
  if (authError) {
    err.textContent = 'Email ou mot de passe invalide';
    err.style.display = 'block';
    return;
  }

  const { data: profile, error: profileError } = await window.supabaseClient
    .from('utilisateurs')
    .select('role, actif')
    .eq('id', (await window.supabaseClient.auth.getUser()).data.user.id)
    .single();

  if (profileError || !profile?.actif || !ROLE_ROUTES[profile.role]) {
    await window.supabaseClient.auth.signOut();
    err.textContent = 'Compte inactif ou rôle invalide.';
    err.style.display = 'block';
    return;
  }

  window.location.href = ROLE_ROUTES[profile.role];
}
