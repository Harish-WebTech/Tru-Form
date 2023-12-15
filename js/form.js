function validateForm() {
  var next_click = document.querySelectorAll(".next_button");
  var main_form = document.querySelectorAll(".main");
  var step_list = document.querySelectorAll(".progress-bar li");
  var num = document.querySelector(".step-number");
  let formnumber = 0;
  next_click.forEach(function (next_click_form) {
    next_click_form.addEventListener("click", function () {
      if (!validateform()) {
        return true;
      }
      formnumber++;
      updateform();
      progress_forward();
      contentchange();
    });
  });
  var back_click = document.querySelectorAll(".back_button");
  back_click.forEach(function (back_click_form) {
    back_click_form.addEventListener("click", function () {
      formnumber--;
      updateform();
      progress_backward();
      contentchange();
    });
  });
  var username = document.querySelector("#user_name");
  var shownname = document.querySelector(".shown_name");
  var submit_click = document.querySelectorAll(".submit_button");
  submit_click.forEach(function (submit_click_form) {
    submit_click_form.addEventListener("click", function () {
      shownname.innerHTML = username.value;
      formnumber++;
      updateform();
    });
  });

  function updateform() {
    main_form.forEach(function (mainform_number) {
      mainform_number.classList.remove("active");
    });
    main_form[formnumber].classList.add("active");
  }

  function progress_forward() {
    // step_list.forEach(list => {
    //     list.classList.remove('active');
    // });
    num.innerHTML = formnumber + 1;
    step_list[formnumber].classList.add("active");
  }

  function progress_backward() {
    var form_num = formnumber + 1;
    step_list[form_num].classList.remove("active");
    num.innerHTML = form_num;
  }
  var step_num_content = document.querySelectorAll(".step-number-content");

  function contentchange() {
    step_num_content.forEach(function (content) {
      content.classList.remove("active");
      content.classList.add("d-none");
    });
    step_num_content[formnumber].classList.remove("d-none");
    step_num_content[formnumber].classList.add("active");
  }

  function validateform() {
    validate = false;
    var validate_inputs = document.querySelectorAll(".main.active input");
    validate_inputs.forEach(function (vaildate_input) {
      vaildate_input.classList.remove("warning");
      if (vaildate_input.hasAttribute("require")) {
        if (vaildate_input.value.length == 0) {
          validate = true;
          vaildate_input.classList.add("warning");
        } else {
          vaildate_input.style.borderColor = "green";
        }
      }
    });
    return validate;
  }
}
validateForm();

function inputRange() {
  const onInput = (parent, e) => {
    const slides = parent.querySelectorAll("input");
    const min = parseFloat(slides[0].min);
    const max = parseFloat(slides[0].max);

    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);

    const percentageMin = (slide1 / (max - min)) * 100;
    const percentageMax = (slide2 / (max - min)) * 100;

    parent.style.setProperty("--range-slider-value-low", percentageMin);
    parent.style.setProperty("--range-slider-value-high", percentageMax);

    if (slide1 > slide2) {
      const tmp = slide2;
      slide2 = slide1;
      slide1 = tmp;

      if (e?.currentTarget === slides[0]) {
        slides[0].insertAdjacentElement("beforebegin", slides[1]);
      } else {
        slides[1].insertAdjacentElement("afterend", slides[0]);
      }
    }

    parent.querySelector(".range-slider__display").setAttribute("data-low", slide1);
    parent.querySelector(".range-slider__display").setAttribute("data-high", slide2);
  };

  addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll(".range-slider").forEach((range) =>
      range.querySelectorAll("input").forEach((input) => {
        if (input.type === "range") {
          input.oninput = (e) => onInput(range, e);
          onInput(range);
        }
      })
    );
  });
}
inputRange();

// add row on table with validation
function toggleAddTable() {
  var inputtablerow = document.querySelector(".inputtablerow");
  inputtablerow.classList.toggle("show");
}
function addRow() {
  var bandLimits = document.getElementById("bandLimits").value;
  var upperBand = document.getElementById("upperBand").value;
  var lowerBand = document.getElementById("lowerBand").value;
  var ppaBand = document.getElementById("ppaBand").value;
  var upperPenaltyAge = document.getElementById("upperPenaltyAge").value;
  var lowerPenaltyAge = document.getElementById("lowerPenaltyAge").value;

  if (bandLimits == "") {
    document.getElementById("invalidMsg").innerHTML = "Please Fill in safe band limits  ";
    document.getElementById("bandLimits").focus();
    return;
  } else if (upperBand == "") {
    document.getElementById("invalidMsg").innerHTML = "Please Fill in Upper band";
    document.getElementById("upperBand").focus();
    return;
  } else if (lowerBand == "") {
    document.getElementById("invalidMsg").innerHTML = "Please Fill in Lower band";
    document.getElementById("lowerBand").focus();
    return;
  } else if (ppaBand == "") {
    document.getElementById("invalidMsg").innerHTML = "Please Fill in Band PPA Tariff";
    document.getElementById("ppaBand").focus();
    return;
  } else if (upperPenaltyAge == "") {
    document.getElementById("invalidMsg").innerHTML = "Please Fill in Upper Penalty";
    document.getElementById("upperPenaltyAge").focus();
    return;
  } else if (lowerPenaltyAge == "") {
    document.getElementById("invalidMsg").innerHTML = "Please Fill in Lower Band Penalty";
    document.getElementById("lowerPenaltyAge").focus();
    return;
  } else {
    document.getElementById("invalidMsg").innerHTML = "";
    let table = document.getElementById("mylist");
    let newRow = table.insertRow(-1);
    var l = table.rows.length - 1;
    table.rows[l].insertCell(0);
    table.rows[l].cells[0].innerHTML = bandLimits;
    table.rows[l].insertCell(1);
    table.rows[l].cells[1].innerHTML = upperBand;
    table.rows[l].insertCell(2);
    table.rows[l].cells[2].innerHTML = lowerBand;
    table.rows[l].insertCell(3);
    table.rows[l].cells[3].innerHTML = ppaBand;
    table.rows[l].insertCell(4);
    table.rows[l].cells[4].innerHTML = upperPenaltyAge;
    table.rows[l].insertCell(5);
    table.rows[l].cells[5].innerHTML = lowerPenaltyAge;

    table.rows[l].insertCell(6);
    table.rows[l].cells[6].innerHTML = "<button type='button' class='delrowtab' onclick='delRow(this);' id='btnDelete' size='1' height='1'><i class='bx bx-trash'></i></button>";

    document.getElementById("bandLimits").value = "";
    document.getElementById("upperBand").value = "";
    document.getElementById("lowerBand").value = "";
    document.getElementById("ppaBand").value = "";
    document.getElementById("upperPenaltyAge").value = "";
    document.getElementById("lowerPenaltyAge").value = "";
    document.getElementById("bandLimits").focus();
  }
}

function delRow(btn) {
  var row = btn.parentNode.parentNode;

  var confirm = window.confirm("Are you sure?");
  if (confirm) {
    row.parentNode.removeChild(row);
  }
}

// end

// add inputs & select function
function addIspFields() {
  let inputitem = document.querySelectorAll(".inputcustomitem");
  inputitem.forEach((item) => {
    item.innerHTML = `
        <div class="input-text">
          <div class="input-div">
            <input type="text" required>
            <span>ISP-3</span>
          </div>
          <div class="input-div">
            <select class="form-select" required>
              <option disabled selected>-- ISP 3 Type --</option>
              <option>ILL</option>
              <option>Broadband</option>
              <option>Dongle</option>
              <option>V-SAT</option>
            </select>
          </div>
          <div class="input-div">
            <input type="text" required>
            <span>ISP-3 Bandwidth (MBPS)</span>
          </div>
        </div>
      `;
  });
}

// end

// add year & tariff data function
let tariffesc = document.getElementById("tariffesc");
tariffesc.addEventListener("change", () => {
  let values = tariffesc.value;
  if (values == "yes") {
    function tariffyeardata() {
      document.getElementById("modalTrigger").click();
      let table = document.getElementById("yearTable");
      let tbody = document.createElement("tbody");
      for (let i = 1; i <= 25; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${i}</td><td><input type="date" class="form-control inputyear" value="" /></td><td><input type="text" class="form-control inputtariff" value="" /></td>`;
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
    }
    tariffyeardata();
  }
});
function tariffyearBtn() {
  tariffesc.setAttribute("disabled", "");
  document.getElementById("getyearButton").classList.remove("d-none");
  let inputYears = document.querySelectorAll(".inputyear");
  let inputTariffs = document.querySelectorAll(".inputtariff");
  let years = [];
  let tariffs = [];
  inputYears.forEach((inputYr, index) => {
    let year = inputYr.value;
    let tariff = inputTariffs[index].value;
    years.push(year);
    tariffs.push(tariff);
  });
  showtariffbtn(years, tariffs);
}

function showtariffbtn(years, tariffs) {
  let table = document.getElementById("getyearTable");
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  for (let i = 0; i < Math.min(years.length, tariffs.length); i++) {
    let tr = document.createElement("tr");
    // console.log("tr", i, tr);
    tr.innerHTML = `<td>${i + 1}</td><td><input type="text" value="${years[i]}" readonly></td><td><input type="text" value="${tariffs[i]}" readonly></td><td><i class="bi bi-pencil-square edit_tariff"></i></td>`;
    tbody.appendChild(tr);
  }
  function editTariffFun() {
    let editTariff = document.querySelectorAll(".edit_tariff");
    editTariff.forEach((btn, index) => {
      btn.addEventListener("click", (event) => {
        let clickedButton = event.target;
        let inputFields = document.querySelectorAll("#getyearTable input[type='text']");
        inputFields[index * 2].readOnly = false; // Enable editing for year input field
        inputFields[index * 2 + 1].readOnly = false; // Enable editing for tariff input field
      });
    });
  }
  editTariffFun();
}






// end
