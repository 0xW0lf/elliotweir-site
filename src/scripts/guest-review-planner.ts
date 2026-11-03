let figures: { total: number; inactive: number } | null = null;
const output = document.getElementById('review-result')!;
const form = document.getElementById('review-form') as HTMLFormElement;
const field = (name: string) => document.getElementById(`review-${name}`) as HTMLInputElement;
const idle = () => { output.textContent = figures ? 'Guest figures updated. Estimate a new plan below.' : 'Calculate your guest figures above, then estimate a plan.'; };
document.addEventListener('guest-figures', event => { figures = (event as CustomEvent).detail; idle(); });
form.addEventListener('input', idle);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!figures) { idle(); return; }
  if (!form.reportValidity()) return;
  const minutes = Number(field('minutes').value);
  const reviewers = Number(field('reviewers').value);
  const hours = Number(field('hours').value);
  if (!Number.isInteger(reviewers) || reviewers < 1 || !Number.isFinite(minutes) || !Number.isFinite(hours) || minutes <= 0 || hours <= 0) { output.textContent = 'Enter valid review time, a whole number of reviewers and weekly hours.'; return; }
  const accounts = field('scope').value === 'all' ? figures.total : figures.inactive;
  const effort = accounts * minutes / 60;
  const capacity = reviewers * hours;
  const weeks = Math.ceil(effort / capacity);
  const format = (n: number) => n.toLocaleString(undefined, {maximumFractionDigits: 2});
  let text = `${accounts.toLocaleString()} accounts to review\n${format(effort)} person-hours of work · ${format(capacity)} person-hours available per week\n${weeks.toLocaleString()} whole ${weeks === 1 ? 'week' : 'weeks'} at that capacity`;
  const value = field('deadline').value;
  if (value) {
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const deadline = Date.parse(`${value}T00:00:00Z`);
    const days = (deadline - today) / 86400000;
    if (!Number.isFinite(days) || days < 0) { output.textContent = 'Choose a target completion date of today or later.'; return; }
    if (!accounts) text += '\nNo accounts in this review scope; no review effort required.';
    else if (days === 0) text += '\nTarget is today. Weekly capacity cannot establish whether a same-day review is achievable.';
    else {
      const required = effort / (days / 7);
      text += `\nTarget: ${value} (${days} days away)\n${format(required)} team hours/week needed · ${format(required / reviewers)} hours per reviewer/week\n${required <= capacity ? 'Within' : 'Above'} your stated capacity, assuming time is spread evenly across the available days.`;
    }
  }
  output.textContent = text;
});
