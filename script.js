const form = document.querySelector("#reservation-form");

if(form){
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const time = document.getElementById("time").value;
        const numberOfTimes = Number(document.getElementById("number-of-times").value);
        const date = document.getElementById("date").value; 

        const response = await fetch(
            "http://localhost:8787/api/reservations",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reservationDate: date,
                    reservationTime: time,
                    numberOfTimes: numberOfTimes,
                }),
            }
        )
        if(!response.ok){
            console.error("予約登録に失敗しました．");
            return;
        }

        const params = new URLSearchParams({
        date,
        time,
        "number-of-times": String(numberOfTimes),
        });

        window.location.href = `reserve.html?${params.toString()}`;
    })
}

const reservedDate = document.querySelector("#reserved-date");

if(reservedDate){
    const params = new URLSearchParams(location.search);

    const date = params.get("date");
    const time = params.get("time");
    const numberOfTimes = params.get("number-of-times");

    document.querySelector("#reserved-date").textContent = date;
    document.querySelector("#reserved-time").textContent = time;
    document.querySelector("#visit-count").textContent = numberOfTimes;
}
