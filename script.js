const $ = document;
const weightRange = $.querySelector("#weight");
const heightRange = $.querySelector("#height");
const result = $.querySelector(".result");
const category = $.querySelector("#category")
let weightValue = 20;
let heightValue = 100;

function normNum(bmi, min, max, range) {
  return Math.floor((range / (max - min)) * (bmi - min));
}

function setColor(bmi) {
  let rgb = [];
  let normalizeNum;
  if ((bmi >= 3) & (bmi <= 18)) {
    normalizeNum = normNum(bmi, 3, 18, 255);
    rgb[0] = 0;
    rgb[1] = 0;
    rgb[2] = 255;
    rgb[1] += normalizeNum;
    category.innerHTML = "Underweight"
  } else if ((bmi >= 19) & (bmi <= 24)) {
    normalizeNum = normNum(bmi, 19, 24, 255);
    rgb[0] = 0;
    rgb[1] = 255;
    rgb[2] = 255;
    rgb[2] -= normalizeNum;
    category.innerHTML = "Healthy"
  } else if ((bmi >= 25) & (bmi <= 30)) {
    normalizeNum = normNum(bmi, 25, 30, 200);
    rgb[0] = 0;
    rgb[1] = 255;
    rgb[2] = 0;
    rgb[0] += normalizeNum;
    category.innerHTML = "Overweight"
  }else if ((bmi >= 30) & (bmi <= 38)) {
    normalizeNum = normNum(bmi, 30, 38, 100);
    rgb[0] = 255;
    rgb[1] = 255;
    rgb[2] = 0;
    rgb[1] -= normalizeNum;
    category.innerHTML = "Obese"
  }else if ((bmi >= 39) & (bmi <= 69)) {
    normalizeNum = normNum(bmi, 38, 69, 150);
    rgb[0] = 255;
    rgb[1] = 150;
    rgb[2] = 0;
    rgb[1] -= normalizeNum;
    category.innerHTML = "Severely Obese"
  }else if ((bmi >= 70) & (bmi <= 200)) {
    normalizeNum = normNum(bmi, 70, 200, 255);
    rgb[0] = 255;
    rgb[1] = 0;
    rgb[2] = 0;
    rgb[0] -= normalizeNum;
    category.innerHTML = "Danger"
  }
  return rgb;
}

function calBmi(weight, height) {
  height /= 100;
  return Math.floor(weight / (height * height));
}

function calculate(e) {
  let span = $.createElement("span");
  let id = e.target.nextElementSibling.getAttribute("id");
  span.setAttribute("id", id);
  if (id == "weight-val") {
    weightValue = +e.target.value;
    span.innerHTML = e.target.value + " kg";
  } else {
    heightValue = +e.target.value;
    span.innerHTML = e.target.value + " cm";
  }
  e.target.parentElement.append(span);

  e.target.nextElementSibling.remove();

  let pResult = $.createElement("p");
  pResult.setAttribute("id", "result");
  pResult.innerHTML = calBmi(weightValue, heightValue);

  let colors = setColor(calBmi(weightValue, heightValue));
  let color = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
  pResult.style.color = color;
  category.style.color = color;


  result.lastElementChild.remove();
  result.append(pResult);
}
