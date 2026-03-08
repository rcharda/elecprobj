function formatMontantFcfa(montant) {
  return new Intl.NumberFormat('fr-FR').format(montant || 0) + ' FCFA';
}
