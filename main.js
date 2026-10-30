const idPanel = document.getElementById('idPanel');
const otpPanel = document.getElementById('otpPanel');
const successPanel = document.getElementById('successPanel');
const stepTitle = document.getElementById('stepTitle');
const stepPill = document.getElementById('stepPill');
const progressBar = document.getElementById('progressBar');
const gafId = document.getElementById('gafId');
const otpCode = document.getElementById('otpCode');
const otpInputs = [...document.querySelectorAll('.otp-input')];
const otpForm = document.getElementById('otpForm');
const otpMessage = document.getElementById('otpMessage');

let currentOtp = '';

function randomDigits(length) {
  const values = new Uint32Array(length);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(values);
    return [...values].map(value => String(value % 10)).join('');
  }
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function randomId(length = 9) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const values = new Uint32Array(length);
  if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(values);
  else values.forEach((_, i) => values[i] = Math.floor(Math.random() * chars.length));
  return 'GAF-' + [...values].map(value => chars[value % chars.length]).join('');
}


function animatePanel(panel) {
  panel.classList.remove('animate__animated', 'animate__zoomIn');

  void panel.offsetWidth;
  // console.log(panel.offsetWidth);

  panel.classList.add('animate__animated', 'animate__zoomIn');
  panel.style.setProperty('--animation-duration', '.5s');
}


function setStep(step) {
  [idPanel, otpPanel, successPanel].forEach(panel => panel.hidden = true);
  if (step === 1) {
    idPanel.hidden = false;
    animatePanel(idPanel);
    stepTitle.textContent = 'Application ID';
    stepPill.innerHTML = 'STEP 01 <span>/ 03</span>';
    progressBar.style.width = '33.33%';
  } else if (step === 2) {
    otpPanel.hidden = false;
    animatePanel(otpPanel);
    stepTitle.textContent = 'OTP Verification';
    stepPill.innerHTML = 'STEP 02 <span>/ 03</span>';
    progressBar.style.width = '66.66%';
    otpInputs[0].focus();
  } else {
    successPanel.hidden = false;
    animatePanel(successPanel);
    stepTitle.textContent = 'Confirmation';
    stepPill.innerHTML = 'STEP 03 <span>/ 03</span>';
    progressBar.style.width = '100%';
    document.getElementById('summaryId').textContent = gafId.value;
  }
}

function createOtp() {
  currentOtp = randomDigits(6);
  otpCode.textContent = currentOtp;
  otpInputs.forEach(input => input.value = '');
  otpMessage.textContent = '';
}

document.getElementById('refreshId').addEventListener('click', () => {
  gafId.value = randomId();
  gafId.animate([{ transform: 'scale(.98)', opacity: .6 }, { transform: 'scale(1)', opacity: 1 }], { duration: 220 });
});

document.getElementById('continueBtn').addEventListener('click', () => {
  createOtp();
  setStep(2);
});

document.getElementById('refreshOtp').addEventListener('click', () => {
  createOtp();
  otpInputs[0].focus();
});

document.getElementById('backToId').addEventListener('click', () => setStep(1));

otpInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(-1);
    if (input.value && index < otpInputs.length - 1) otpInputs[index + 1].focus();
    otpMessage.textContent = '';
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Backspace' && !input.value && index > 0) {
      otpInputs[index - 1].focus();
      otpInputs[index - 1].value = '';
    }
    if (event.key === 'ArrowLeft' && index > 0) otpInputs[index - 1].focus();
    if (event.key === 'ArrowRight' && index < otpInputs.length - 1) otpInputs[index + 1].focus();
  });
  input.addEventListener('paste', event => {
    const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    pasted.split('').forEach((digit, i) => { if (otpInputs[i]) otpInputs[i].value = digit; });
    otpInputs[Math.min(pasted.length, 5)].focus();
  });
});

otpForm.addEventListener('submit', event => {
  event.preventDefault();
  const entered = otpInputs.map(input => input.value).join('');
  if (entered.length !== 6) {
    otpMessage.textContent = 'Enter all six digits to continue.';
    return;
  }
  if (entered !== currentOtp) {
    otpMessage.textContent = 'That code does not match. Check the demo OTP and try again.';
    otpInputs.forEach(input => input.value = '');
    otpInputs[0].focus();
    return;
  }
  setStep(3);
});

document.getElementById('restartBtn').addEventListener('click', () => {
  gafId.value = randomId();
  createOtp();
  setStep(1);
});

gafId.value = randomId();
createOtp();


  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.intro, .app-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                if (element.classList.contains('intro')) {
                    element.style.setProperty('--animate-duration', '8s');
                } else {
                    element.style.setProperty('--animate-duration', '1.2s');
                }

                element.classList.add('animate-on-scroll');

                // Stop observing after the animation starts.
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach((element) => observer.observe(element));
});
  

