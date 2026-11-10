function methodIllustration(label, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 310" role="img" aria-label="${label}">
    <defs>
      <linearGradient id="panel" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#f3edf8"/></linearGradient>
      <filter id="lift" x="-30%" y="-30%" width="180%" height="190%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#73518e" flood-opacity=".10"/></filter>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#a28ab8"/></marker>
    </defs>
    <g font-family="Arial,sans-serif" font-size="15" fill="#3b4c59">${content}</g>
  </svg>`;
}

const stages = [
  {
    title: 'Discover relevant teachers.',
    text: 'Fixed anchors and rotating probe samples provide common inputs. Distances between mean client representations identify the top-M nearest candidate teachers.',
    equation: 'Shared probes → representations → neighbors',
    visual: methodIllustration('Shared probes produce client representations, from which a neighborhood is selected.', `
      <g filter="url(#lift)">
        <rect x="12" y="55" width="135" height="185" rx="15" fill="url(#panel)" stroke="#d0bfdf"/>
        <rect x="195" y="55" width="155" height="185" rx="15" fill="url(#panel)" stroke="#d0bfdf"/>
        <rect x="398" y="55" width="145" height="185" rx="15" fill="url(#panel)" stroke="#b9a1ce"/>
      </g>
      <text x="79" y="87" text-anchor="middle">Shared probes</text>
      <g fill="#e3a3a0"><rect x="35" y="111" width="30" height="30" rx="6"/><rect x="84" y="111" width="30" height="30" rx="6"/></g>
      <g fill="#c8b3dc"><rect x="35" y="154" width="30" height="30" rx="6"/><rect x="84" y="154" width="30" height="30" rx="6"/></g>
      <text x="79" y="215" text-anchor="middle" font-size="13" fill="#7c688f">Anchors + rotation</text>
      <text x="273" y="87" text-anchor="middle">Representations</text>
      <g fill="#e5dced"><rect x="218" y="111" width="109" height="17" rx="5"/><rect x="218" y="150" width="109" height="17" rx="5"/><rect x="218" y="189" width="109" height="17" rx="5"/></g>
      <g fill="#9b7bb7"><rect x="218" y="111" width="62" height="17" rx="5"/><rect x="218" y="150" width="90" height="17" rx="5"/><rect x="218" y="189" width="70" height="17" rx="5"/></g>
      <text x="470" y="87" text-anchor="middle">Neighborhood</text>
      <rect x="418" y="108" width="105" height="39" rx="8" fill="#e5d8ef"/><text x="470" y="133" text-anchor="middle">Teacher A</text>
      <rect x="418" y="161" width="105" height="39" rx="8" fill="#e5d8ef"/><text x="470" y="186" text-anchor="middle">Teacher B</text>
      <g stroke="#a28ab8" stroke-width="2" marker-end="url(#arrow)"><path d="M150 147H184"/><path d="M354 147H388"/></g>
    `)
  },
  {
    title: 'Learn each teacher’s contribution.',
    text: 'A regularized PU-Brier objective on the target client’s held-out scoring data learns weights on the probability simplex. The personalized proxy combines the teachers’ predicted probabilities.',
    equation: 'PP(x) = Σ ωⱼ pⱼ(x),     Σ ωⱼ = 1',
    visual: methodIllustration('Target-client PU scoring data determine weights used to combine teacher probabilities into a personalized proxy.', `
      <rect x="153" y="17" width="255" height="55" rx="12" fill="url(#panel)" stroke="#cdb9dd"/>
      <text x="280" y="51" text-anchor="middle">Target-client PU scoring data</text>
      <path d="M280 73V110" stroke="#a28ab8" stroke-width="2" marker-end="url(#arrow)"/>
      <g filter="url(#lift)">
        <rect x="15" y="123" width="135" height="145" rx="15" fill="url(#panel)" stroke="#d0bfdf"/>
        <rect x="203" y="123" width="155" height="145" rx="15" fill="url(#panel)" stroke="#b9a1ce"/>
        <rect x="410" y="123" width="135" height="145" rx="15" fill="url(#panel)" stroke="#d0bfdf"/>
      </g>
      <text x="82" y="153" text-anchor="middle">Predictions</text>
      <g fill="#b79acd"><rect x="36" y="174" width="88" height="12" rx="4"/><rect x="36" y="202" width="49" height="12" rx="4"/><rect x="36" y="230" width="70" height="12" rx="4"/></g>
      <text x="280" y="153" text-anchor="middle">Learned weights</text>
      <g fill="#9b7bb7"><rect x="229" y="204" width="23" height="35" rx="4"/><rect x="269" y="175" width="23" height="64" rx="4"/><rect x="309" y="219" width="23" height="20" rx="4"/></g>
      <text x="477" y="159" text-anchor="middle">Personalized</text><text x="477" y="180" text-anchor="middle">proxy</text>
      <text x="477" y="236" text-anchor="middle" font-size="34" fill="#795598" font-family="Georgia,serif">Σ ωⱼ pⱼ</text>
      <g stroke="#a28ab8" stroke-width="2" marker-end="url(#arrow)"><path d="M153 199H192"/><path d="M361 199H399"/></g>
    `)
  },
  {
    title: 'Train with cached soft targets.',
    text: 'The proxy generates soft targets and certainty weights. Local updates combine nnPU learning with auxiliary distillation, reusing the cache between periodic refreshes.',
    equation: 'Local objective = PU learning + weighted distillation',
    visual: methodIllustration('Cached soft targets support auxiliary distillation alongside local PU learning, followed by a model update.', `
      <g filter="url(#lift)">
        <rect x="17" y="35" width="191" height="116" rx="15" fill="url(#panel)" stroke="#c7b1d9"/>
        <rect x="17" y="185" width="191" height="83" rx="15" fill="url(#panel)" stroke="#d0bfdf"/>
        <rect x="372" y="101" width="170" height="116" rx="15" fill="url(#panel)" stroke="#b9a1ce"/>
      </g>
      <text x="112" y="65" text-anchor="middle">Cached soft targets</text>
      <g fill="#e6dcee"><rect x="45" y="84" width="133" height="12" rx="4"/><rect x="45" y="110" width="133" height="12" rx="4"/></g>
      <g fill="#9b7bb7"><rect x="45" y="84" width="96" height="12" rx="4"/><rect x="45" y="110" width="55" height="12" rx="4"/></g>
      <text x="112" y="220" text-anchor="middle">Local P / U data</text>
      <g fill="#e3a3a0"><circle cx="69" cy="243" r="5"/><circle cx="89" cy="243" r="5"/></g>
      <g fill="#b4c1ca"><circle cx="109" cy="243" r="5"/><circle cx="129" cy="243" r="5"/><circle cx="149" cy="243" r="5"/></g>
      <g fill="none" stroke="#a28ab8" stroke-width="2" marker-end="url(#arrow)"><path d="M211 94H252Q290 94 290 135"/><path d="M211 227H252Q290 227 290 183"/><path d="M316 159H359"/></g>
      <circle cx="290" cy="159" r="24" fill="#e7d9f0" stroke="#b399ca"/><text x="290" y="168" text-anchor="middle" font-size="28">+</text>
      <text x="457" y="136" text-anchor="middle">Updated local model</text>
      <g fill="none" stroke="#b5a3c6" stroke-width="1.5"><path d="M412 168L451 157L495 174L451 192L412 168L451 192L451 157L495 174"/></g>
      <g fill="#9b7bb7"><circle cx="412" cy="168" r="6"/><circle cx="451" cy="157" r="6"/><circle cx="451" cy="192" r="6"/><circle cx="495" cy="174" r="6"/></g>
    `)
  }
];

function setStage(index) {
  const stage = stages[index];
  document.querySelector('#step-title').textContent = stage.title;
  document.querySelector('#step-text').textContent = stage.text;
  document.querySelector('#equation').textContent = stage.equation;
  document.querySelector('#stage-visual').innerHTML = stage.visual;
  document.querySelectorAll('[data-step]').forEach(button => {
    button.setAttribute('aria-pressed', Number(button.dataset.step) === index);
  });
}

document.querySelectorAll('[data-step]').forEach(button => {
  button.addEventListener('click', () => setStage(Number(button.dataset.step)));
});
document.querySelectorAll('[data-jump]').forEach(link => {
  link.addEventListener('click', () => setStage(Number(link.dataset.jump)));
});
setStage(0);

let selectedDataset = 0;
const datasetNames = ['CIFAR-10', 'Imagenette', 'Letter', 'USPS'];
const tabs = document.querySelector('#datasets');
const heterogeneity = document.querySelector('#eta');

datasetNames.forEach((name, index) => {
  const button = document.createElement('button');
  button.textContent = name;
  button.addEventListener('click', () => {
    selectedDataset = index;
    renderResults();
  });
  tabs.append(button);
});

function rankedMeans(rows, column) {
  return [...new Set(rows.map(row => row.values[column].mean))].sort((a, b) => b - a);
}

function comparisonCard(row, label, settingIndex, isProposed) {
  const value = row.values[settingIndex];
  const cardClass = isProposed ? 'comparison-card proposed-card' : 'comparison-card';
  return `<article class="${cardClass}">
    <h4>${label}</h4>
    <strong>${value.mean.toFixed(2)}<span>%</span></strong>
    <p class="card-uncertainty">± ${value.std}</p>
    <p class="card-method">${row.name}</p>
  </article>`;
}

function renderResults() {
  [...tabs.children].forEach((button, index) => {
    button.setAttribute('aria-pressed', index === selectedDataset);
  });

  const settingIndex = selectedDataset * 3 + heterogeneity.selectedIndex;
  const proposed = RESULTS.find(row => row.name === 'FedNP²');
  const value = proposed.values[settingIndex];
  const baselines = RESULTS.filter(row => row.name !== 'FedNP²');
  const leaders = baselines.sort((a, b) => {
    return b.values[settingIndex].mean - a.values[settingIndex].mean;
  }).slice(0, 2);
  const strongest = leaders[0];
  const gap = value.mean - strongest.values[settingIndex].mean;

  document.querySelector('#dataset-title').textContent = datasetNames[selectedDataset];
  document.querySelector('#result-gap').innerHTML =
    '<strong>+' + gap.toFixed(2) + '</strong><span>percentage points</span><p>above <b>' +
    strongest.name + '</b> at η = ' + heterogeneity.value + '.</p>';

  document.querySelector('#comparison-cards').innerHTML =
    comparisonCard(proposed, 'Our method', settingIndex, true) +
    comparisonCard(leaders[0], 'Second-best', settingIndex, false) +
    comparisonCard(leaders[1], 'Third-best', settingIndex, false);

  const firstColumn = selectedDataset * 3;
  const rankings = [0, 1, 2].map(offset => rankedMeans(RESULTS, firstColumn + offset));
  document.querySelector('#rows').innerHTML = RESULTS.map(row => {
    const rowClass = row === proposed ? 'own-row' : '';
    const cells = row.values.slice(firstColumn, firstColumn + 3).map((item, offset) => {
      const rank = rankings[offset].indexOf(item.mean);
      let valueClass = '';
      let rankLabel = '';
      if (rank === 0) {
        valueClass = 'best-value';
        rankLabel = 'Best mean';
      } else if (rank === 1) {
        valueClass = 'second-value';
        rankLabel = 'Second-best mean';
      }
      const selected = offset === heterogeneity.selectedIndex ? ' selected-column' : '';
      return `<td class="${valueClass}${selected}" title="${rankLabel}">${item.mean.toFixed(2)} <span class="uncertainty">± ${item.std}</span></td>`;
    }).join('');
    return '<tr class="' + rowClass + '"><th scope="row">' + row.name + '</th>' + cells + '</tr>';
  }).join('');
  document.querySelectorAll('.main-table thead th').forEach((header, index) => {
    header.classList.toggle('selected-column', index === heterogeneity.selectedIndex + 1);
  });
}

heterogeneity.addEventListener('change', renderResults);
renderResults();

const viewer = document.querySelector('#viewer');
const fullImage = document.querySelector('#full-image');
const imageScroll = document.querySelector('.image-scroll');
const sizeButton = document.querySelector('#figure-size');

document.querySelectorAll('.zoom').forEach(button => {
  button.addEventListener('click', () => {
    fullImage.src = button.dataset.image;
    fullImage.alt = button.querySelector('img').alt;
    imageScroll.classList.remove('original');
    sizeButton.textContent = 'Original size';
    sizeButton.setAttribute('aria-pressed', 'false');
    viewer.showModal();
    imageScroll.scrollTo(0, 0);
  });
});

sizeButton.addEventListener('click', () => {
  const originalSize = imageScroll.classList.toggle('original');
  sizeButton.textContent = originalSize ? 'Fit to window' : 'Original size';
  sizeButton.setAttribute('aria-pressed', originalSize);
});

document.querySelector('#close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const bounds = viewer.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (event.target === viewer && outside) {
    viewer.close();
  }
});

// Keep the navigation aligned with the section currently being read.
const sectionLinks = [...document.querySelectorAll('.nav-links a')];
let navigationFramePending = false;

function updateNavigation() {
  navigationFramePending = false;
  let current = null;
  for (const link of sectionLinks) {
    if (document.querySelector(link.hash).getBoundingClientRect().top <= 180) {
      current = link;
    }
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
    current = sectionLinks.at(-1);
  }
  for (const link of sectionLinks) {
    link.classList.toggle('active', link === current);
    link.removeAttribute('aria-current');
    if (link === current) link.setAttribute('aria-current', 'location');
  }
}

window.addEventListener('scroll', () => {
  if (!navigationFramePending) {
    navigationFramePending = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

const trainingCaption = document.querySelector('#refresh-caption').textContent;
document.querySelectorAll('[data-refresh]').forEach(button => {
  button.addEventListener('click', () => {
    const interval = button.dataset.refresh === 'interval';
    document.querySelector('#refresh-figure').classList.toggle('show-interval', interval);
    document.querySelector('#refresh-figure img').alt = interval
      ? 'Accuracy at different refresh intervals for CIFAR10 and Imagenette.'
      : 'Full and Static training curves for CIFAR10 and Imagenette.';
    document.querySelector('#refresh-caption').textContent = interval
      ? 'Figure 4c–d · Final accuracy at refresh intervals of 1, 5, 10, and 15 rounds, alongside the Static variant.'
      : trainingCaption;
    document.querySelectorAll('[data-refresh]').forEach(item => {
      item.setAttribute('aria-pressed', item === button);
    });
  });
});

const qualitativeButtons = document.querySelectorAll('[data-qualitative]');
const qualitativeFigure = document.querySelector('#qualitative-figure');
const qualitativeImage = qualitativeFigure.querySelector('img');
const qualitativeCaption = document.querySelector('#qualitative-caption');

qualitativeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const dataset = button.textContent;
    qualitativeFigure.dataset.image = 'assets/qualitative_' + button.dataset.qualitative + '.svg';
    qualitativeFigure.setAttribute('aria-label', 'Enlarge selected ' + dataset + ' test cases');
    qualitativeImage.src = qualitativeFigure.dataset.image;
    qualitativeImage.alt = 'Six selected ' + dataset + ' test cases from the FedNearPU study.';
    qualitativeCaption.textContent = dataset + ' · η = ' + button.dataset.eta + ' · seed 0 · threshold 0.5.';
    if (button.dataset.qualitative === 'letter') {
      qualitativeCaption.textContent += ' Each tile shows 16 features on a shared 0–15 scale.';
    }
    qualitativeButtons.forEach(item => item.setAttribute('aria-pressed', item === button));
  });
});
