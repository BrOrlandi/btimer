import VMasker from 'vanilla-masker';

VMasker(timerInput).maskPattern('99:99');

function dynamicMask(e) {
  const masks = ['99:99', '9:99'];
  const input = e.target;
  const value = input.value.replace(/\D/g, '');
  const maskIndex = value.trim().length === 3 ? 1 : 0;
  VMasker(input).unMask();
  VMasker(input).maskPattern(masks[maskIndex]);

  input.value = VMasker.toPattern(value, masks[maskIndex]);
}

timerInput.addEventListener('input', dynamicMask, false);
