const body = document.getElementById("data-body");

async function getData() {
  const response = await fetch("http://192.168.43.77/proguas/data.php");
  const data = await response.json();
  body.innerHTML = "";
  data.map((data) => {
    const record = list(data.sensorvalue);
    updateChart(data.sensorvalue);
    return body.prepend(record);
  });
}

// Chart
const data = {
  labels: [],
  datasets: [
    {
      label: "Data Real Time",
      data: [],
      borderWidth: 1,
      lineTension: 0.5,
    },
  ],
};

const configChart = {
  type: "line",
  data: data,
};

const chart = new Chart(document.getElementById("chart"), configChart);

const updateChart = (dataChart) => {
  let now = new Date();
  now = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  data.labels.push(now);
  // Jika ingin mendapatkan nilai random
  value = Math.floor(Math.random() * 100) + 1;
  data.datasets[0].data.push(value);

  let maxChart = 8;
  if (chart.data.labels.length > maxChart) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update("none");
};

const list = (sensorValue) => {
  const tr = document.createElement("tr");
  const status = document.createElement("p");

  tr.style.padding = "20px";
  tr.style.fontWeight = "bold";
  tr.style.marginTop = "10px";
  tr.style.marginBottom = "10px";
  tr.style.borderTop = "5px solid #0b131e";
  tr.style.borderBottom = "5px solid #0b131e";

  const value = document.createElement("p");

  if (sensorValue >= "500") {
    status.innerHTML = "Kebocoran Gas";
  } else {
    status.innerHTML = "Udara Aman";
  }

  value.innerText = sensorValue;
  value.style.textAlign = "center";

  const td1 = document.createElement("td");
  td1.style.padding = "15px";
  td1.style.borderRadius = "15px";

  const td2 = document.createElement("td");
  td2.style.padding = "15px";
  td2.style.borderRadius = "15px";

  td1.appendChild(value);
  td2.appendChild(status);

  tr.append(td1, td2);
  return tr;
};

const deleteData = () => {
  if (confirm("Apakah anda yakin?")) {
    window.location.href = "hapus.php";
  }
};

setInterval(getData, 2000);
setInterval(updateChart, 2000);
