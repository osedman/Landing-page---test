function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function calculateROI() {
  const teamSize = Number(document.getElementById('team-size').value) || 0;
  const hoursPerWeek = Number(document.getElementById('avg-hours').value) || 0;
  const hourlyRate = Number(document.getElementById('hourly-rate').value) || 0;
  const implementationCost = Number(document.getElementById('implementation-cost').value) || 0;

  const weeklySavings = teamSize * hoursPerWeek * hourlyRate;
  const annualSavings = weeklySavings * 52;
  const roi = implementationCost === 0 ? 0 : ((annualSavings - implementationCost) / implementationCost) * 100;

  document.getElementById('annual-savings').textContent = formatCurrency(Math.max(annualSavings, 0));
  document.getElementById('roi').textContent = `${Math.max(roi, 0).toFixed(0)}%`;
}

document.addEventListener('DOMContentLoaded', () => {
  calculateROI();
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
