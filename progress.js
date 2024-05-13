export class Progress {
  constructor(element) {
    this.element = element;
    this.value = 0;
    this.hidden = false;
    this.animated = false;
  }

  setValue(value) {
    this.value = value;

    if (!this.animated) {
      this.updateProgress();
    }
  }

  setHidden(hidden) {
    this.hidden = hidden;
    this.element.style.opacity = hidden ? 0 : 1;
  }

  setAnimated(animate) {
    if (animate && !this.animated) {
      this.animated = true;
      this.element.style.backgroundImage = `conic-gradient(
        #0400ff 90deg,
        lightgrey 30deg 360deg
      )`;
      this.element.style.animation = `spin 2s linear infinite`;
    } else if (!animate && this.animated) {
      this.element.style.backgroundImage = "none";
      this.element.style.animation = "none";
      this.animated = false;
      this.updateProgress();
    }
  }

  updateProgress() {
    const angle = (this.value / 100) * 360;

    this.element.style.background = `conic-gradient(
      #0400ff ${angle}deg,
      lightgrey ${angle}deg 360deg
  )`;
  }
}

export function setupProgress(
  progressElemId,
  progressValueId,
  animateCheckboxId,
  hideCheckboxId
) {
  const progressElem = document.getElementById(progressElemId);
  const progressValue = document.getElementById(progressValueId);
  const animateCheckbox = document.getElementById(animateCheckboxId);
  const hideCheckbox = document.getElementById(hideCheckboxId);

  const progressBlock = new Progress(progressElem);

  progressBlock.setValue(progressValue.value);

  progressValue.addEventListener("input", function () {
    progressBlock.setValue(this.value);
  });

  animateCheckbox.addEventListener("change", function () {
    progressBlock.setAnimated(this.checked);
  });

  hideCheckbox.addEventListener("change", function () {
    progressBlock.setHidden(this.checked);
  });
}
